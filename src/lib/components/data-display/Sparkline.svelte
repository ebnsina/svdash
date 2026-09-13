<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { smoothPath } from './chart.js';

	interface Props {
		values: number[];
		/** Any CSS colour; defaults to the accent token. */
		color?: string;
		filled?: boolean;
		width?: number;
		height?: number;
		class?: string;
	}

	let {
		values,
		color = 'var(--c-accent)',
		filled = true,
		width = 120,
		height = 32,
		class: klass
	}: Props = $props();

	let points = $derived.by(() => {
		if (values.length === 0) return [] as [number, number][];
		const min = Math.min(...values);
		const max = Math.max(...values);
		const span = max - min || 1;
		const step = values.length > 1 ? width / (values.length - 1) : 0;
		return values.map(
			(v, i) => [i * step, height - 2 - ((v - min) / span) * (height - 4)] as [number, number]
		);
	});

	let line = $derived(smoothPath(points));
	let area = $derived(points.length ? `${line} L${width},${height} L0,${height} Z` : '');
</script>

<!-- Decorative: the number it accompanies carries the meaning. -->
<svg
	viewBox="0 0 {width} {height}"
	preserveAspectRatio="none"
	aria-hidden="true"
	focusable="false"
	class={cn('h-8 w-full', klass)}
>
	{#if filled}
		<path d={area} fill={color} opacity="0.12" />
	{/if}
	<path
		d={line}
		fill="none"
		stroke={color}
		stroke-width="1.75"
		stroke-linecap="round"
		vector-effect="non-scaling-stroke"
	/>
</svg>
