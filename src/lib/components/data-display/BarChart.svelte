<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import ChartLegend from './ChartLegend.svelte';
	import ChartTable from './ChartTable.svelte';
	import { chartColor, niceMax, type Series } from './chart.js';

	interface Props {
		series: Series[];
		labels: string[];
		title: string;
		height?: number;
		stacked?: boolean;
		horizontal?: boolean;
		showLegend?: boolean;
		valueFormat?: Intl.NumberFormatOptions;
		class?: string;
	}

	let {
		series,
		labels,
		title,
		height = 240,
		stacked = false,
		horizontal = false,
		showLegend = true,
		valueFormat = { notation: 'compact' },
		class: klass
	}: Props = $props();

	const id = uid('barchart');
	const W = 640;
	const PAD = { top: 12, right: 12, bottom: 26, left: 44 };

	let fmt = $derived(new Intl.NumberFormat('en-US', valueFormat));
	let totals = $derived(
		labels.map((_, i) => series.reduce((sum, s) => sum + (s.values[i] ?? 0), 0))
	);
	let max = $derived(
		niceMax(stacked ? Math.max(1, ...totals) : Math.max(1, ...series.flatMap((s) => s.values)))
	);
	let plotW = $derived(W - PAD.left - PAD.right);
	let plotH = $derived(height - PAD.top - PAD.bottom);
	let ticks = $derived([0, 0.25, 0.5, 0.75, 1].map((t) => t * max));

	let groupW = $derived(plotW / Math.max(1, labels.length));
	let barW = $derived(
		stacked ? Math.min(40, groupW * 0.6) : Math.min(28, (groupW * 0.7) / Math.max(1, series.length))
	);

	const y = (v: number) => PAD.top + plotH - (v / max) * plotH;
</script>

<figure class={cn('flex flex-col gap-3', klass)}>
	<figcaption class="sr-only">{title}</figcaption>

	<svg viewBox="0 0 {W} {height}" class="w-full" role="img" aria-labelledby="{id}-title">
		<title id="{id}-title">{title}</title>

		{#each ticks as tick (tick)}
			<line x1={PAD.left} x2={W - PAD.right} y1={y(tick)} y2={y(tick)} stroke="var(--c-border)" />
			<text x={PAD.left - 8} y={y(tick) + 4} text-anchor="end" class="fill-faint text-[11px]">
				{fmt.format(tick)}
			</text>
		{/each}

		{#each labels as label, i (label)}
			{@const center = PAD.left + groupW * i + groupW / 2}
			<text x={center} y={height - 6} text-anchor="middle" class="fill-faint text-[11px]"
				>{label}</text
			>

			{#if stacked}
				{#each series as s, si (s.name)}
					{@const below = series.slice(0, si).reduce((sum, o) => sum + (o.values[i] ?? 0), 0)}
					{@const value = s.values[i] ?? 0}
					<rect
						x={center - barW / 2}
						y={y(below + value)}
						width={barW}
						height={Math.max(0, y(below) - y(below + value))}
						fill={s.color ?? chartColor(si)}
						rx="2"
					/>
				{/each}
			{:else}
				{#each series as s, si (s.name)}
					{@const value = s.values[i] ?? 0}
					{@const offset = (si - (series.length - 1) / 2) * (barW + 4)}
					<rect
						x={center + offset - barW / 2}
						y={y(value)}
						width={barW}
						height={Math.max(0, plotH + PAD.top - y(value))}
						fill={s.color ?? chartColor(si)}
						rx="2"
					/>
				{/each}
			{/if}
		{/each}
	</svg>

	{#if showLegend && series.length > 1}
		<ChartLegend {series} />
	{/if}
	<ChartTable caption={title} {labels} {series} />
</figure>
