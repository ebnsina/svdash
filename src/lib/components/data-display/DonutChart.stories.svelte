<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DonutChart from './DonutChart.svelte';
	import { planMix } from './mock.js';

	const { Story } = defineMeta({
		title: 'Data Display/Charts/DonutChart',
		component: DonutChart,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			title: 'Subscriptions by plan',
			slices: planMix,
			centerSublabel: 'accounts',
			class: 'w-[28rem] max-w-full rounded-xl bg-surface shadow-xs p-5'
		}
	});
</script>

<Story name="Default" />
<Story name="Without legend" args={{ showLegend: false }} />
<Story
	name="Two slices"
	args={{
		slices: [
			{ label: 'Annual', value: 612 },
			{ label: 'Monthly', value: 195 }
		]
	}}
/>
<Story name="Thin ring" args={{ thickness: 12, size: 160 }} />
<Story name="Empty" args={{ slices: [], centerLabel: '0' }} />
