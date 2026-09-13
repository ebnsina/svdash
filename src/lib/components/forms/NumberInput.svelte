<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import FormField from './FormField.svelte';
	import { controlBase, controlTone, controlSizes, type ControlSize } from './field.js';

	interface Props {
		value?: number;
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		min?: number;
		max?: number;
		step?: number;
		size?: ControlSize;
		required?: boolean;
		disabled?: boolean;
		unit?: string;
		name?: string;
		id?: string;
		class?: string;
	}

	let {
		value = $bindable(0),
		label,
		hideLabel = false,
		helper,
		error,
		min,
		max,
		step = 1,
		size = 'md',
		required = false,
		disabled = false,
		unit,
		name,
		id = uid('number'),
		class: klass
	}: Props = $props();

	function bump(direction: 1 | -1) {
		const next = Number((value + direction * step).toFixed(10));
		if (min !== undefined && next < min) return;
		if (max !== undefined && next > max) return;
		value = next;
	}

	let atMin = $derived(min !== undefined && value <= min);
	let atMax = $derived(max !== undefined && value >= max);
</script>

<FormField {label} {hideLabel} {helper} {error} {required} {id} class={klass}>
	{#snippet children({ id, describedBy, invalid })}
		<div class="relative">
			<input
				{id}
				{name}
				type="number"
				inputmode="decimal"
				{min}
				{max}
				{step}
				{required}
				{disabled}
				bind:value
				aria-describedby={describedBy}
				aria-invalid={invalid || undefined}
				class={cn(
					controlBase,
					controlTone(invalid),
					controlSizes[size],
					'[appearance:textfield] pr-10 font-mono tabular-nums [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
					unit && 'pr-16'
				)}
			/>
			{#if unit}
				<span
					class="pointer-events-none absolute top-1/2 right-9 -translate-y-1/2 text-xs text-faint"
				>
					{unit}
				</span>
			{/if}
			<div class="absolute top-px right-px bottom-px flex w-8 flex-col border-l border-border/60">
				<button
					type="button"
					tabindex="-1"
					aria-label="Increase {label}"
					disabled={disabled || atMax}
					onclick={() => bump(1)}
					class="flex flex-1 items-center justify-center rounded-tr-md text-muted hover:bg-subtle hover:text-fg focus-visible:ring-focus disabled:opacity-40"
				>
					<Icon name="chevron-up" class="size-3.5" />
				</button>
				<button
					type="button"
					tabindex="-1"
					aria-label="Decrease {label}"
					disabled={disabled || atMin}
					onclick={() => bump(-1)}
					class="flex flex-1 items-center justify-center rounded-br-md border-t border-border/60 text-muted hover:bg-subtle hover:text-fg focus-visible:ring-focus disabled:opacity-40"
				>
					<Icon name="chevron-down" class="size-3.5" />
				</button>
			</div>
		</div>
	{/snippet}
</FormField>
