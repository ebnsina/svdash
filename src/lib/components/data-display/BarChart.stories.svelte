<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BarChart from './BarChart.svelte';
	import { months, revenueSeries, weekdays, trafficSeries } from './mock.js';

	const { Story } = defineMeta({
		title: 'Data Display/Charts/BarChart',
		component: BarChart,
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

<Story name="Grouped" />
<Story name="Stacked" args={{ stacked: true }} />
<Story
	name="Single series"
	args={{ title: 'Visitors this week', labels: weekdays, series: trafficSeries }}
/>
<Story name="Empty" args={{ labels: [], series: [{ name: 'Revenue', values: [] }] }} />
