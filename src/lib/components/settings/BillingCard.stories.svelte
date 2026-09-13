<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BillingCard from './BillingCard.svelte';
	import { usage } from './mock.js';

	const { Story } = defineMeta({
		title: 'Settings/BillingCard',
		component: BillingCard,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: {
			status: { control: 'select', options: ['active', 'trialing', 'past_due', 'canceled'] }
		},
		args: {
			plan: 'Growth',
			price: 79,
			interval: 'month',
			renewsAt: '2026-10-01',
			usage,
			class: 'w-[42rem] max-w-full'
		}
	});
</script>

<Story name="Default" />
<Story
	name="Trial"
	args={{ plan: 'Growth trial', price: 0, status: 'trialing', renewsAt: '2026-09-27' }}
/>
<Story name="Payment overdue" args={{ status: 'past_due' }} />
<Story name="Cancelled" args={{ status: 'canceled', renewsAt: '2026-09-30' }} />
<Story name="Yearly, no usage" args={{ plan: 'Scale', price: 790, interval: 'year', usage: [] }} />
<Story
	name="Over quota"
	args={{ usage: [{ label: 'API requests', used: 998_000, limit: 1_000_000 }] }}
/>
