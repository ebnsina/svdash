<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MobileNav from './MobileNav.svelte';
	import { navGroups } from './mock.js';
	import Button from '#lib/components/buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Layout/MobileNav',
		component: MobileNav,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile' } },
		args: { groups: navGroups, active: 'invoices' }
	});
</script>

<script lang="ts">
	let open = $state(false);
</script>

<Story name="Closed">
	{#snippet template()}
		<div class="p-6">
			<Button iconLeft="menu" onclick={() => (open = true)}>Open navigation</Button>
		</div>
		<MobileNav bind:open groups={navGroups} active="invoices" />
	{/snippet}
</Story>

<Story name="Open">
	{#snippet template()}
		<div class="h-dvh bg-canvas p-6 text-sm text-muted">Page content behind the drawer.</div>
		<MobileNav open groups={navGroups} active="invoices" />
	{/snippet}
</Story>
