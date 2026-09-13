<script lang="ts">
	import { cn } from '#lib/utils/cn.js';

	type Tone = 'accent' | 'success' | 'warning' | 'danger';

	interface Props {
		value: number;
		max?: number;
		label: string;
		size?: number;
		thickness?: number;
		tone?: Tone;
		/** Text in the middle; defaults to a percentage. */
		valueText?: string;
		class?: string;
	}

	let {
		value,
		max = 100,
		label,
		size = 88,
		thickness = 8,
		tone = 'accent',
		valueText,
		class: klass
	}: Props = $props();

	const pct = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 });
	const tones: Record<Tone, string> = {
		accent: 'var(--c-accent)',
		success: 'var(--c-success)',
		warning: 'var(--c-warn)',
		danger: 'var(--c-danger)'
	};

	let ratio = $derived(max > 0 ? Math.min(1, Math.max(0, value / max)) : 0);
	let radius = $derived(size / 2 - thickness / 2);
	let circumference = $derived(2 * Math.PI * radius);
	let text = $derived(valueText ?? pct.format(ratio));
</script>

<div
	class={cn('relative inline-flex shrink-0 items-center justify-center', klass)}
	style:width="{size}px"
	style:height="{size}px"
	role="progressbar"
	aria-label={label}
	aria-valuenow={value}
	aria-valuemin={0}
	aria-valuemax={max}
	aria-valuetext={text}
>
	<svg viewBox="0 0 {size} {size}" class="size-full -rotate-90" aria-hidden="true">
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			fill="none"
			stroke="var(--c-skeleton)"
			stroke-width={thickness}
		/>
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			fill="none"
			stroke={tones[tone]}
			stroke-width={thickness}
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset={circumference * (1 - ratio)}
			class="transition-[stroke-dashoffset] duration-500"
		/>
	</svg>
	<span class="absolute font-mono text-sm font-semibold text-fg tabular-nums">{text}</span>
</div>
