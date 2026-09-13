<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DropdownMenu from './DropdownMenu.svelte';
	import IconButton from '#lib/components/buttons/IconButton.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	const items = [
		{ label: 'Edit invoice', icon: 'edit' as const, shortcut: '⌘E' },
		{ label: 'Duplicate', icon: 'copy' as const, shortcut: '⌘D' },
		{ label: 'Download PDF', icon: 'download' as const },
		{ label: 'Archive', icon: 'folder' as const, separatorBefore: true, disabled: true },
		{ label: 'Delete invoice', icon: 'trash' as const, destructive: true, separatorBefore: true }
	];

	const { Story } = defineMeta({
		title: 'Feedback/DropdownMenu',
		component: DropdownMenu,
		tags: ['autodocs'],
		argTypes: { align: { control: 'inline-radio', options: ['start', 'end'] } },
		args: { label: 'Invoice actions', items, align: 'end' }
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="flex justify-center p-8">
			<DropdownMenu label="Invoice actions" {items}>
				{#snippet trigger({ props })}
					<IconButton icon="more-horizontal" label="Invoice actions" variant="outline" {...props} />
				{/snippet}
			</DropdownMenu>
		</div>
	{/snippet}
</Story>

<Story name="Button trigger">
	{#snippet template()}
		<div class="flex justify-center p-8">
			<DropdownMenu
				label="Create"
				align="start"
				items={[
					{ label: 'New invoice', icon: 'file' },
					{ label: 'New customer', icon: 'user' },
					{ label: 'New API key', icon: 'key' }
				]}
			>
				{#snippet trigger({ props })}
					<Button iconLeft="plus" iconRight="chevron-down" {...props}>Create</Button>
				{/snippet}
			</DropdownMenu>
		</div>
	{/snippet}
</Story>

<Story name="With disabled items">
	{#snippet template()}
		<div class="flex justify-center p-8">
			<DropdownMenu
				label="Row actions"
				items={[
					{ label: 'View details', icon: 'eye' },
					{ label: 'Refund (unavailable)', icon: 'refresh', disabled: true },
					{ label: 'Delete', icon: 'trash', destructive: true, separatorBefore: true }
				]}
			>
				{#snippet trigger({ props })}
					<IconButton icon="more-vertical" label="Row actions" variant="ghost" {...props} />
				{/snippet}
			</DropdownMenu>
		</div>
	{/snippet}
</Story>
