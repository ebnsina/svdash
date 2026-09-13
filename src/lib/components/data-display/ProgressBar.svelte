<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';

	type Tone = 'accent' | 'success' | 'warning' | 'danger';

	interface Props {
		value: number;
		max?: number;
		label: string;
		hideLabel?: boolean;
		/** Text shown on the right; defaults to a percentage. */
		valueText?: string;
		tone?: Tone;
		size?: 'sm' | 'md';
		/** Renders the striped indeterminate state. */
		indeterminate?: boolean;
		class?: string;
	}

	let {
		value,
		max = 100,
		label,
		hideLabel = false,
		valueText,
		tone = 'accent',
		size = 'md',
		indeterminate = false,
		class: klass
	}: Props = $props();

	const id = uid('progress');
	const pct = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 });
	const tones: Record<Tone, string> = {
		accent: 'bg-accent',
		success: 'bg-success',
		warning: 'bg-warn',
		danger: 'bg-danger'
	};

	let ratio = $derived(max > 0 ? Math.min(1, Math.max(0, value / max)) : 0);
	let text = $derived(valueText ?? pct.format(ratio));
</script>

<div class={cn('flex flex-col gap-1.5', klass)}>
	{#if !hideLabel}
		<div class="flex items-baseline justify-between gap-3">
			<span id="{id}-label" class="text-sm font-medium text-fg">{label}</span>
			<span class="font-mono text-xs text-muted tabular-nums">{text}</span>
		</div>
	{/if}
	<div
		role="progressbar"
		aria-label={hideLabel ? label : undefined}
		aria-labelledby={hideLabel ? undefined : `${id}-label`}
		aria-valuenow={indeterminate ? undefined : value}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuetext={indeterminate ? undefined : text}
		class={cn('w-full overflow-hidden rounded-full bg-subtle', size === 'sm' ? 'h-1.5' : 'h-2.5')}
	>
		<div
			class={cn(
				'h-full rounded-full transition-[width] duration-500',
				tones[tone],
				indeterminate && 'w-1/3 animate-pulse'
			)}
			style:width={indeterminate ? undefined : `${ratio * 100}%`}
		></div>
	</div>
</div>
