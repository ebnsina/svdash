<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { arcPath, chartColor } from './chart.js';

	export interface Slice {
		label: string;
		value: number;
		color?: string;
	}

	interface Props {
		slices: Slice[];
		title: string;
		/** Big number in the middle; falls back to the total. */
		centerLabel?: string;
		centerSublabel?: string;
		size?: number;
		thickness?: number;
		showLegend?: boolean;
		class?: string;
	}

	let {
		slices,
		title,
		centerLabel,
		centerSublabel,
		size = 180,
		thickness = 26,
		showLegend = true,
		class: klass
	}: Props = $props();

	const id = uid('donut');
	const fmt = new Intl.NumberFormat('en-US', { notation: 'compact' });
	const pct = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 });

	let total = $derived(slices.reduce((sum, s) => sum + s.value, 0));
	let arcs = $derived.by(() => {
		let angle = 0;
		return slices.map((slice, i) => {
			const sweep = total > 0 ? (slice.value / total) * Math.PI * 2 : 0;
			// Leave a hairline gap so adjacent slices stay distinguishable.
			const d = arcPath(
				size / 2,
				size / 2,
				size / 2,
				size / 2 - thickness,
				angle,
				angle + sweep - 0.012
			);
			angle += sweep;
			return { ...slice, d, color: slice.color ?? chartColor(i) };
		});
	});
</script>

<figure class={cn('flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6', klass)}>
	<figcaption class="sr-only">{title}</figcaption>

	<div class="relative shrink-0" style:width="{size}px" style:height="{size}px">
		<svg viewBox="0 0 {size} {size}" class="size-full" role="img" aria-labelledby="{id}-title">
			<title id="{id}-title">{title}</title>
			{#if total === 0}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={size / 2 - thickness / 2}
					fill="none"
					stroke="var(--c-skeleton)"
					stroke-width={thickness}
				/>
			{:else}
				{#each arcs as arc (arc.label)}
					<path d={arc.d} fill={arc.color} />
				{/each}
			{/if}
		</svg>
		<div class="absolute inset-0 flex flex-col items-center justify-center">
			<span class="font-mono text-xl font-semibold text-fg tabular-nums">
				{centerLabel ?? fmt.format(total)}
			</span>
			{#if centerSublabel}
				<span class="text-xs text-muted">{centerSublabel}</span>
			{/if}
		</div>
	</div>

	{#if showLegend}
		<ul class="flex w-full flex-col gap-2">
			{#each arcs as arc (arc.label)}
				<li class="flex items-center gap-2 text-sm">
					<span
						aria-hidden="true"
						class="size-2.5 shrink-0 rounded-xs"
						style:background-color={arc.color}
					></span>
					<span class="flex-1 truncate text-muted">{arc.label}</span>
					<span class="font-mono text-xs text-fg tabular-nums">
						{fmt.format(arc.value)}
						<span class="ml-1 text-faint">{total > 0 ? pct.format(arc.value / total) : '—'}</span>
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</figure>
