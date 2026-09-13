<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';

	interface Props {
		checked?: boolean;
		/** Renders the mixed state; native `indeterminate` is set on the input too. */
		indeterminate?: boolean;
		label: string;
		hideLabel?: boolean;
		description?: string;
		error?: string;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		value?: string;
		id?: string;
		class?: string;
		onchange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(false),
		indeterminate = false,
		label,
		hideLabel = false,
		description,
		error,
		disabled = false,
		required = false,
		name,
		value,
		id = uid('checkbox'),
		class: klass,
		onchange
	}: Props = $props();

	let describedBy = $derived(
		[error && `${id}-error`, description && `${id}-description`].filter(Boolean).join(' ') ||
			undefined
	);
</script>

<div class={cn('flex flex-col gap-1', klass)}>
	<div class="flex items-start gap-2.5">
		<span class="relative flex size-4.5 shrink-0 items-center justify-center">
			<input
				{id}
				{name}
				{value}
				{disabled}
				{required}
				{indeterminate}
				type="checkbox"
				bind:checked
				onchange={() => onchange?.(checked)}
				aria-describedby={describedBy}
				aria-invalid={error ? true : undefined}
				class={cn(
					'peer size-4.5 appearance-none rounded-xs border bg-surface transition-colors focus-visible:ring-focus disabled:cursor-not-allowed disabled:bg-subtle',
					error ? 'border-danger' : 'border-field',
					'checked:border-accent checked:bg-accent indeterminate:border-accent indeterminate:bg-accent'
				)}
			/>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				class="pointer-events-none absolute size-3.5 text-accent-fg opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0"
			>
				<path d="m5 12.5 4.5 4.5L19 7" />
			</svg>
			<span
				aria-hidden="true"
				class="pointer-events-none absolute h-0.5 w-2.5 rounded-full bg-accent-fg opacity-0 peer-indeterminate:opacity-100"
			></span>
		</span>

		<span class="flex flex-col gap-0.5">
			<label
				for={id}
				class={cn(
					'text-sm leading-tight font-medium text-fg select-none',
					hideLabel && 'sr-only',
					disabled && 'text-faint'
				)}
			>
				{label}
			</label>
			{#if description}
				<span id="{id}-description" class="text-xs text-muted">{description}</span>
			{/if}
		</span>
	</div>
	{#if error}
		<p id="{id}-error" class="pl-7 text-xs text-danger">{error}</p>
	{/if}
</div>
