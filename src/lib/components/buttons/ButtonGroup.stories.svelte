<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ButtonGroup from './ButtonGroup.svelte';
	import Button from './Button.svelte';
	import IconButton from './IconButton.svelte';

	const { Story } = defineMeta({
		title: 'Buttons/ButtonGroup',
		component: ButtonGroup,
		tags: ['autodocs'],
		args: { label: 'View options' }
	});
</script>

<Story name="Default">
	{#snippet template()}
		<ButtonGroup label="Time range">
			<Button variant="outline">Day</Button>
			<Button variant="outline">Week</Button>
			<Button variant="outline">Month</Button>
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Icon only">
	{#snippet template()}
		<ButtonGroup label="Text alignment">
			<IconButton icon="layout-grid" label="Grid view" variant="outline" />
			<IconButton icon="columns" label="Column view" variant="outline" />
			<IconButton icon="menu" label="List view" variant="outline" />
		</ButtonGroup>
	{/snippet}
</Story>

<Story name="Vertical">
	{#snippet template()}
		<ButtonGroup label="Row actions" orientation="vertical">
			<Button variant="outline" iconLeft="edit">Edit</Button>
			<Button variant="outline" iconLeft="copy">Duplicate</Button>
			<Button variant="outline" iconLeft="trash">Delete</Button>
		</ButtonGroup>
	{/snippet}
</Story>
