<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tabs from './Tabs.svelte';
	import type { Tab } from './Tabs.svelte';

	const manyTabs = Array.from({ length: 12 }, (_, i) => ({
		id: `t${i}`,
		label: `Section ${i + 1}`
	}));

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: 'layout-grid' as const },
		{ id: 'invoices', label: 'Invoices', icon: 'file' as const, badge: 14 },
		{ id: 'team', label: 'Team', icon: 'users' as const },
		{ id: 'audit', label: 'Audit log', icon: 'clock' as const, disabled: true }
	];

	const { Story } = defineMeta({
		title: 'Navigation/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: {
			variant: { control: 'inline-radio', options: ['underline', 'pill', 'segmented'] },
			size: { control: 'inline-radio', options: ['sm', 'md'] }
		},
		args: { tabs, label: 'Workspace sections', class: 'w-[42rem] max-w-full' }
	});
</script>

{#snippet body({ tab }: { tab: Tab })}
	<div class="rounded-xl bg-surface p-5 shadow-xs">
		<p class="text-sm text-muted">
			Panel content for <span class="font-medium text-fg">{tab.label}</span>. Arrow keys move
			between tabs and activate them; only the selected tab is in the tab order.
		</p>
	</div>
{/snippet}

<Story name="Underline">
	{#snippet template(args)}
		<Tabs {...args} panel={body} />
	{/snippet}
</Story>

<Story name="Pill" args={{ variant: 'pill' }}>
	{#snippet template(args)}
		<Tabs {...args} panel={body} />
	{/snippet}
</Story>

<Story name="Segmented" args={{ variant: 'segmented', fullWidth: true }}>
	{#snippet template(args)}
		<Tabs {...args} panel={body} />
	{/snippet}
</Story>

<Story name="Small" args={{ size: 'sm' }}>
	{#snippet template(args)}
		<Tabs {...args} panel={body} />
	{/snippet}
</Story>

<Story name="Without panels" args={{ variant: 'underline' }} />

<Story name="Many tabs (scrolls)" args={{ tabs: manyTabs }}>
	{#snippet template(args)}
		<Tabs {...args} panel={body} />
	{/snippet}
</Story>
