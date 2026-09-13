<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import IconButton from './IconButton.svelte';
	import { iconNames } from '#lib/icons/registry.js';

	const { Story } = defineMeta({
		title: 'Buttons/IconButton',
		component: IconButton,
		tags: ['autodocs'],
		argTypes: {
			icon: { control: 'select', options: iconNames },
			variant: {
				control: 'select',
				options: ['primary', 'secondary', 'outline', 'ghost', 'destructive']
			},
			size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }
		},
		args: { icon: 'settings', label: 'Open settings', variant: 'ghost', size: 'md' }
	});
</script>

<Story name="Default" />

<Story name="All variants">
	{#snippet template()}
		<div class="flex items-center gap-3">
			<IconButton icon="plus" label="Add item" variant="primary" />
			<IconButton icon="edit" label="Edit item" variant="secondary" />
			<IconButton icon="copy" label="Copy link" variant="outline" />
			<IconButton icon="more-horizontal" label="More actions" variant="ghost" />
			<IconButton icon="trash" label="Delete item" variant="destructive" />
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="flex items-center gap-3">
			<IconButton icon="bell" label="Notifications" size="sm" variant="outline" />
			<IconButton icon="bell" label="Notifications" size="md" variant="outline" />
			<IconButton icon="bell" label="Notifications" size="lg" variant="outline" />
		</div>
	{/snippet}
</Story>

<Story name="Toggle (aria-pressed)">
	{#snippet template()}
		<div class="flex items-center gap-3">
			<IconButton icon="star" label="Add to favourites" pressed={false} variant="outline" />
			<IconButton icon="star" label="Remove from favourites" pressed={true} variant="outline" />
		</div>
	{/snippet}
</Story>

<Story name="Loading" args={{ loading: true }} />

<Story name="Disabled" args={{ disabled: true }} />
