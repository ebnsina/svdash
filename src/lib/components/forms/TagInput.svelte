<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';

	interface Props {
		tags?: string[];
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		placeholder?: string;
		max?: number;
		disabled?: boolean;
		id?: string;
		class?: string;
	}

	let {
		tags = $bindable<string[]>([]),
		label,
		hideLabel = false,
		helper = 'Press Enter or comma to add a tag.',
		error,
		placeholder = 'Add a tag',
		max,
		disabled = false,
		id = uid('taginput'),
		class: klass
	}: Props = $props();

	let draft = $state('');
	let announcement = $state('');
	let inputEl = $state<HTMLInputElement | null>(null);

	let atMax = $derived(max !== undefined && tags.length >= max);
	let describedBy = $derived(
		[error && `${id}-error`, helper && `${id}-helper`].filter(Boolean).join(' ') || undefined
	);

	function add() {
		const next = draft.trim().replace(/,$/, '');
		if (!next || atMax || tags.includes(next)) {
			draft = '';
			return;
		}
		tags = [...tags, next];
		announcement = `${next} added`;
		draft = '';
	}

	function remove(tag: string) {
		tags = tags.filter((t) => t !== tag);
		announcement = `${tag} removed`;
		inputEl?.focus();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			add();
		} else if (e.key === 'Backspace' && draft === '' && tags.length > 0) {
			remove(tags[tags.length - 1]);
		}
	}
</script>

<div class={cn('flex flex-col gap-1.5', klass)}>
	<label for={id} class={cn('text-sm font-medium text-fg', hideLabel && 'sr-only')}>{label}</label>

	<div
		class={cn(
			'flex min-h-9.5 flex-wrap items-center gap-1.5 rounded-md border bg-surface p-1.5 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent',
			error ? 'border-danger' : 'border-field hover:border-fg/40',
			disabled && 'cursor-not-allowed bg-subtle'
		)}
	>
		<ul class="contents">
			{#each tags as tag (tag)}
				<li
					class="inline-flex items-center gap-1 rounded-full bg-accent-soft py-0.5 pr-1 pl-2.5 text-xs font-medium text-accent"
				>
					{tag}
					<button
						type="button"
						{disabled}
						onclick={() => remove(tag)}
						aria-label="Remove tag {tag}"
						class="rounded-full p-0.5 hover:text-fg focus-visible:ring-focus"
					>
						<Icon name="x" class="size-3" />
					</button>
				</li>
			{/each}
		</ul>
		<input
			bind:this={inputEl}
			{id}
			type="text"
			disabled={disabled || atMax}
			placeholder={atMax ? `Limit of ${max} reached` : placeholder}
			bind:value={draft}
			onkeydown={onKeydown}
			onblur={add}
			aria-describedby={describedBy}
			aria-invalid={error ? true : undefined}
			class="min-w-28 flex-1 bg-transparent px-1.5 text-sm text-fg outline-none placeholder:text-faint disabled:cursor-not-allowed"
		/>
	</div>

	{#if error}
		<p id="{id}-error" class="text-xs text-danger">{error}</p>
	{/if}
	{#if helper}
		<p id="{id}-helper" class="text-xs text-muted">
			{helper}{#if max}&nbsp;{tags.length} of {max} used.{/if}
		</p>
	{/if}
	<span class="sr-only" role="status" aria-live="polite">{announcement}</span>
</div>
