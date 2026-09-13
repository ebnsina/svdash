<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatCard from './StatCard.svelte';

	const trendUp = [12, 15, 14, 19, 18, 24, 27, 31];
	const trendDown = [31, 28, 29, 24, 22, 19, 17, 14];

	const { Story } = defineMeta({
		title: 'Data Display/StatCard',
		component: StatCard,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: { trendPolarity: { control: 'inline-radio', options: ['up-good', 'down-good'] } },
		args: {
			label: 'Monthly recurring revenue',
			value: '$25,100',
			trend: 0.128,
			sparkline: trendUp,
			icon: 'bar-chart',
			class: 'w-72 max-w-full'
		}
	});
</script>

<Story name="Default" />
<Story
	name="Negative trend"
	args={{ label: 'Active subscriptions', value: '807', trend: -0.042, sparkline: trendDown }}
/>
<Story
	name="Lower is better"
	args={{
		label: 'Infrastructure spend',
		value: '$3,410',
		trend: -0.093,
		trendPolarity: 'down-good',
		sparkline: trendDown,
		icon: 'credit-card'
	}}
/>
<Story name="Without sparkline" args={{ sparkline: undefined }} />
<Story name="Loading" args={{ loading: true }} />
<Story name="Error" args={{ error: 'Metrics are temporarily unavailable.' }} />

<Story name="Grid" parameters={{ layout: 'fullscreen' }}>
	{#snippet template()}
		<div class="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4 bg-canvas p-6">
			<StatCard
				label="Monthly recurring revenue"
				value="$25,100"
				trend={0.128}
				sparkline={trendUp}
				icon="bar-chart"
			/>
			<StatCard
				label="Active subscriptions"
				value="807"
				trend={-0.042}
				sparkline={trendDown}
				icon="users"
			/>
			<StatCard
				label="Churn rate"
				value="2.1%"
				trend={-0.006}
				trendPolarity="down-good"
				sparkline={trendDown}
				icon="arrow-down"
			/>
			<StatCard
				label="Open invoices"
				value="14"
				trend={0.2}
				trendPolarity="down-good"
				sparkline={trendUp}
				icon="file"
			/>
		</div>
	{/snippet}
</Story>
