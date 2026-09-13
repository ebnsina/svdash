<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Sidebar from './Sidebar.svelte';
	import { navGroups } from './mock.js';
	import Avatar from '#lib/components/data-display/Avatar.svelte';

	const { Story } = defineMeta({
		title: 'Layout/Sidebar',
		component: Sidebar,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		args: { groups: navGroups, active: 'overview', class: '' }
	});
</script>

<Story name="Default" />
<Story name="Collapsed" args={{ collapsed: true }} />
<Story name="Deep in the tree" args={{ active: 'api-keys' }} />

<Story name="With a footer">
	{#snippet template()}
		<Sidebar groups={navGroups} active="billing">
			{#snippet footer({ collapsed })}
				<div class="flex items-center gap-2.5 rounded-md p-1.5 {collapsed ? '' : 'w-full'}">
					<Avatar name="Amina Rahman" size="sm" />
					{#if !collapsed}
						<span class="flex min-w-0 flex-col leading-tight">
							<span class="truncate text-xs font-medium text-fg">Amina Rahman</span>
							<span class="truncate text-2xs text-muted">Owner</span>
						</span>
					{/if}
				</div>
			{/snippet}
		</Sidebar>
	{/snippet}
</Story>
