<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LineChart from './LineChart.svelte';
	import { months, revenueSeries, trafficSeries, weekdays } from './mock.js';

	const { Story } = defineMeta({
		title: 'Data Display/Charts/LineChart',
		component: LineChart,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			title: 'Revenue by month',
			labels: months,
			series: revenueSeries,
			class: 'w-[42rem] max-w-full rounded-xl bg-surface shadow-xs p-5'
		}
	});
</script>

<Story name="Default" />
<Story
	name="Single series"
	args={{ title: 'Visitors this week', labels: weekdays, series: trafficSeries, showLegend: false }}
/>
<Story name="Lines only" args={{ area: false }} />
<Story
	name="Currency values"
	args={{ valueFormat: { style: 'currency', currency: 'USD', notation: 'compact' } }}
/>
<Story name="Empty" args={{ labels: [], series: [{ name: 'Revenue', values: [] }] }} />
