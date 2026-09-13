<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Topbar from './Topbar.svelte';
	import { user, notifications } from './mock.js';
	import Button from '#lib/components/buttons/Button.svelte';

	const read = notifications.map((n) => ({ ...n, unread: false }));

	const { Story } = defineMeta({
		title: 'Layout/Topbar',
		component: Topbar,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		args: { user, notifications, searchLabel: 'Search' }
	});
</script>

<Story name="Default" />
<Story
	name="With breadcrumbs"
	args={{
		onsidebartoggle: () => {},
		breadcrumbs: [
			{ label: 'Dashboard', href: '#' },
			{ label: 'Billing', href: '#' },
			{ label: 'Invoices' }
		]
	}}
/>
<Story name="With sidebar toggle" args={{ onsidebartoggle: () => {} }} />
<Story name="Sidebar collapsed" args={{ onsidebartoggle: () => {}, sidebarCollapsed: true }} />
<Story name="No unread notifications" args={{ notifications: read }} />
<Story name="Empty notifications" args={{ notifications: [] }} />
<Story name="Dark theme toggle" args={{ theme: 'dark' }} />

<Story name="With a primary action">
	{#snippet template()}
		<Topbar {user} {notifications}>
			{#snippet actions()}
				<Button size="sm" iconLeft="plus" class="hidden sm:inline-flex">New invoice</Button>
			{/snippet}
		</Topbar>
	{/snippet}
</Story>
