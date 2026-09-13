<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';

	export interface UploadedFile {
		name: string;
		size: number;
		status?: 'pending' | 'uploading' | 'done' | 'error';
		progress?: number;
		error?: string;
	}

	interface Props {
		files?: UploadedFile[];
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		accept?: string;
		multiple?: boolean;
		maxSizeMb?: number;
		disabled?: boolean;
		id?: string;
		class?: string;
	}

	let {
		files = $bindable<UploadedFile[]>([]),
		label,
		hideLabel = false,
		helper = 'PNG, JPG or PDF up to 10 MB.',
		error,
		accept,
		multiple = true,
		maxSizeMb = 10,
		disabled = false,
		id = uid('upload'),
		class: klass
	}: Props = $props();

	let dragging = $state(false);
	let announcement = $state('');
	let inputEl = $state<HTMLInputElement | null>(null);

	const sizeFmt = new Intl.NumberFormat('en-US', {
		style: 'unit',
		unit: 'megabyte',
		maximumFractionDigits: 1
	});
	const readableSize = (bytes: number) => sizeFmt.format(bytes / 1_000_000);

	function accepted(list: FileList | null) {
		if (!list) return;
		const next: UploadedFile[] = [...list].map((f) => ({
			name: f.name,
			size: f.size,
			status: f.size > maxSizeMb * 1_000_000 ? 'error' : 'done',
			progress: 100,
			error: f.size > maxSizeMb * 1_000_000 ? `Over the ${maxSizeMb} MB limit` : undefined
		}));
		files = multiple ? [...files, ...next] : next.slice(0, 1);
		announcement = `${next.length} file${next.length === 1 ? '' : 's'} added`;
	}

	function remove(name: string) {
		files = files.filter((f) => f.name !== name);
		announcement = `${name} removed`;
	}
</script>

<div class={cn('flex flex-col gap-2', klass)}>
	<span class={cn('text-sm font-medium text-fg', hideLabel && 'sr-only')}>{label}</span>

	<!-- The label is the drop zone; the input stays in the tab order and keeps native keyboard activation. -->
	<label
		for={id}
		ondragover={(e) => {
			e.preventDefault();
			if (!disabled) dragging = true;
		}}
		ondragleave={() => (dragging = false)}
		ondrop={(e) => {
			e.preventDefault();
			dragging = false;
			if (!disabled) accepted(e.dataTransfer?.files ?? null);
		}}
		class={cn(
			'flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-8 text-center transition-colors has-[:focus-visible]:ring-focus',
			dragging
				? 'border-accent bg-accent-soft'
				: 'border-border hover:border-field hover:bg-subtle',
			error && 'border-danger',
			disabled && 'cursor-not-allowed opacity-60'
		)}
	>
		<span class="flex size-10 items-center justify-center rounded-full bg-subtle text-muted">
			<Icon name="upload" class="size-5" />
		</span>
		<span class="text-sm font-medium text-fg">
			Drop files here or <span class="text-accent underline underline-offset-2">browse</span>
		</span>
		<span class="text-xs text-muted">{helper}</span>
		<input
			bind:this={inputEl}
			{id}
			type="file"
			{accept}
			{multiple}
			{disabled}
			onchange={(e) => accepted((e.currentTarget as HTMLInputElement).files)}
			aria-describedby="{id}-helper"
			class="sr-only"
		/>
	</label>
	<span id="{id}-helper" class="sr-only">{helper}</span>

	{#if files.length > 0}
		<ul class="flex flex-col gap-1.5">
			{#each files as file (file.name)}
				<li class="flex items-center gap-3 rounded-xl bg-subtle px-3 py-2">
					<Icon name="file" class="size-4 shrink-0 text-faint" />
					<span class="min-w-0 flex-1">
						<span class="block truncate text-sm text-fg">{file.name}</span>
						<span class="block text-xs {file.status === 'error' ? 'text-danger' : 'text-muted'}">
							{file.error ?? readableSize(file.size)}
						</span>
						{#if file.status === 'uploading'}
							<span
								class="mt-1 block h-1 overflow-hidden rounded-full bg-subtle"
								role="progressbar"
								aria-label="Uploading {file.name}"
								aria-valuenow={file.progress ?? 0}
								aria-valuemin={0}
								aria-valuemax={100}
							>
								<span
									class="block h-full rounded-full bg-accent"
									style="width: {file.progress ?? 0}%"
								></span>
							</span>
						{/if}
					</span>
					{#if file.status === 'done'}
						<Icon name="check-circle" class="size-4 shrink-0 text-success" label="Uploaded" />
					{:else if file.status === 'error'}
						<Icon name="alert-circle" class="size-4 shrink-0 text-danger" label="Failed" />
					{/if}
					<button
						type="button"
						onclick={() => remove(file.name)}
						aria-label="Remove {file.name}"
						class="rounded-md p-1 text-muted hover:bg-subtle hover:text-fg focus-visible:ring-focus"
					>
						<Icon name="x" class="size-4" />
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	{#if error}
		<p class="text-xs text-danger">{error}</p>
	{/if}
	<span class="sr-only" role="status" aria-live="polite">{announcement}</span>
</div>
