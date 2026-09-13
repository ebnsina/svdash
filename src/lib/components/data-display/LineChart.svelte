<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import ChartLegend from './ChartLegend.svelte';
	import ChartTable from './ChartTable.svelte';
	import { chartColor, niceMax, smoothPath, type Series } from './chart.js';

	interface Props {
		series: Series[];
		labels: string[];
		title: string;
		height?: number;
		area?: boolean;
		showLegend?: boolean;
		valueFormat?: Intl.NumberFormatOptions;
		class?: string;
	}

	let {
		series,
		labels,
		title,
		height = 240,
		area = true,
		showLegend = true,
		valueFormat = { notation: 'compact' },
		class: klass
	}: Props = $props();

	const id = uid('linechart');
	const W = 640;
	const PAD = { top: 12, right: 12, bottom: 26, left: 44 };

	let fmt = $derived(new Intl.NumberFormat('en-US', valueFormat));
	let max = $derived(niceMax(Math.max(1, ...series.flatMap((s) => s.values))));
	let plotW = $derived(W - PAD.left - PAD.right);
	let plotH = $derived(height - PAD.top - PAD.bottom);
	let stepX = $derived(labels.length > 1 ? plotW / (labels.length - 1) : 0);
	let ticks = $derived([0, 0.25, 0.5, 0.75, 1].map((t) => t * max));

	let hovered = $state(-1);

	const x = (i: number) => PAD.left + i * stepX;
	const y = (v: number) => PAD.top + plotH - (v / max) * plotH;

	let paths = $derived(
		series.map((s, si) => {
			const pts = s.values.map((v, i) => [x(i), y(v)] as [number, number]);
			const line = smoothPath(pts);
			return {
				line,
				fill: pts.length
					? `${line} L${x(pts.length - 1)},${PAD.top + plotH} L${PAD.left},${PAD.top + plotH} Z`
					: '',
				color: s.color ?? chartColor(si),
				pts
			};
		})
	);
</script>

<figure class={cn('flex flex-col gap-3', klass)}>
	<figcaption class="sr-only">{title}</figcaption>

	<svg
		viewBox="0 0 {W} {height}"
		class="w-full"
		role="img"
		aria-labelledby="{id}-title"
		onpointerleave={() => (hovered = -1)}
	>
		<title id="{id}-title">{title}</title>

		{#each ticks as tick (tick)}
			<line
				x1={PAD.left}
				x2={W - PAD.right}
				y1={y(tick)}
				y2={y(tick)}
				stroke="var(--c-border)"
				stroke-width="1"
			/>
			<text x={PAD.left - 8} y={y(tick) + 4} text-anchor="end" class="fill-faint text-[11px]">
				{fmt.format(tick)}
			</text>
		{/each}

		{#each labels as label, i (label)}
			{#if labels.length <= 8 || i % Math.ceil(labels.length / 8) === 0}
				<text x={x(i)} y={height - 6} text-anchor="middle" class="fill-faint text-[11px]"
					>{label}</text
				>
			{/if}
		{/each}

		{#if area}
			{#each paths as p (p.color)}
				<path d={p.fill} fill={p.color} opacity="0.1" />
			{/each}
		{/if}

		{#each paths as p (p.color)}
			<path
				d={p.line}
				fill="none"
				stroke={p.color}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		{/each}

		{#if hovered >= 0}
			<line
				x1={x(hovered)}
				x2={x(hovered)}
				y1={PAD.top}
				y2={PAD.top + plotH}
				stroke="var(--c-border-strong)"
				stroke-dasharray="3 3"
			/>
			{#each paths as p (p.color)}
				<circle
					cx={x(hovered)}
					cy={p.pts[hovered]?.[1] ?? 0}
					r="4"
					fill="var(--c-surface)"
					stroke={p.color}
					stroke-width="2"
				/>
			{/each}
		{/if}

		<!-- Invisible hit areas, one per period. -->
		{#each labels as label, i (label)}
			<rect
				x={x(i) - stepX / 2}
				y={PAD.top}
				width={stepX || plotW}
				height={plotH}
				fill="transparent"
				role="presentation"
				onpointerenter={() => (hovered = i)}
			/>
		{/each}
	</svg>

	<!-- The row is always in flow so hovering never reflows the page; only its
	     contents change. -->
	<p
		class="flex flex-wrap gap-x-4 text-xs text-muted"
		class:invisible={hovered < 0}
		aria-hidden={hovered < 0}
	>
		<span class="font-medium text-fg">{hovered >= 0 ? labels[hovered] : labels[0]}</span>
		{#each series as s (s.name)}
			<span>
				{s.name}:
				<span class="font-mono text-fg tabular-nums">
					{fmt.format(s.values[hovered >= 0 ? hovered : 0] ?? 0)}
				</span>
			</span>
		{/each}
	</p>

	{#if showLegend}
		<ChartLegend {series} />
	{/if}
	<ChartTable caption={title} {labels} {series} />
</figure>
