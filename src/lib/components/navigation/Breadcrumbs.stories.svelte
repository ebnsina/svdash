<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './Breadcrumbs.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Breadcrumbs',
		component: Breadcrumbs,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			items: [
				{ label: 'Dashboard', href: '#' },
				{ label: 'Billing', href: '#' },
				{ label: 'Invoices', href: '#' },
				{ label: 'INV-1049' }
			]
		}
	});
</script>

<Story name="Default" />
<Story name="Two levels" args={{ items: [{ label: 'Settings', href: '#' }, { label: 'Team' }] }} />
<Story
	name="Collapsed"
	args={{
		maxItems: 4,
		items: [
			{ label: 'Dashboard', href: '#' },
			{ label: 'Workspaces', href: '#' },
			{ label: 'Acme Inc.', href: '#' },
			{ label: 'Billing', href: '#' },
			{ label: 'Invoices', href: '#' },
			{ label: 'INV-1049' }
		]
	}}
/>
<Story name="Single item" args={{ items: [{ label: 'Dashboard' }] }} />
