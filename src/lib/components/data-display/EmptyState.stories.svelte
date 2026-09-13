<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import EmptyState from './EmptyState.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Data Display/EmptyState',
		component: EmptyState,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
		args: {
			title: 'No invoices yet',
			description: 'Invoices appear here once you bill your first customer.',
			icon: 'file',
			class: 'w-[36rem] max-w-full'
		}
	});
</script>

<Story name="Default" />

<Story name="With actions">
	{#snippet template()}
		<EmptyState
			class="w-[36rem] max-w-full"
			icon="file"
			title="No invoices yet"
			description="Invoices appear here once you bill your first customer."
		>
			{#snippet actions()}
				<Button iconLeft="plus">Create invoice</Button>
				<Button variant="ghost">Import from CSV</Button>
			{/snippet}
		</EmptyState>
	{/snippet}
</Story>

<Story
	name="No search results"
	args={{
		icon: 'search',
		title: 'No results for “eu-west”',
		description: 'Check the spelling or try a broader search.'
	}}
/>
<Story name="Compact" args={{ size: 'sm', description: undefined }} />
<Story name="Borderless" args={{ bordered: false }} />
