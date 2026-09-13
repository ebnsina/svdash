<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import { iconNames } from '#lib/icons/registry.js';

	const { Story } = defineMeta({
		title: 'Buttons/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['primary', 'secondary', 'outline', 'ghost', 'destructive']
			},
			size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
			iconLeft: { control: 'select', options: [undefined, ...iconNames] },
			iconRight: { control: 'select', options: [undefined, ...iconNames] },
			disabled: { control: 'boolean' },
			loading: { control: 'boolean' },
			fullWidth: { control: 'boolean' }
		},
		args: { variant: 'primary', size: 'md' }
	});
</script>

<Story name="Default" args={{ variant: 'primary' }}>
	{#snippet template(args)}
		<Button {...args}>Save changes</Button>
	{/snippet}
</Story>

<Story name="All variants">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-3">
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Delete</Button>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-3">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	{/snippet}
</Story>

<Story name="With icons">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-3">
			<Button iconLeft="plus">New project</Button>
			<Button variant="outline" iconRight="chevron-right">Continue</Button>
			<Button variant="secondary" iconLeft="download">Export CSV</Button>
		</div>
	{/snippet}
</Story>

<Story name="Loading" args={{ loading: true }}>
	{#snippet template(args)}
		<Button {...args}>Saving</Button>
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	{#snippet template(args)}
		<Button {...args}>Unavailable</Button>
	{/snippet}
</Story>

<Story name="Full width" args={{ fullWidth: true }}>
	{#snippet template(args)}
		<div class="w-80 max-w-full">
			<Button {...args}>Continue to checkout</Button>
		</div>
	{/snippet}
</Story>

<Story name="As link">
	{#snippet template()}
		<Button href="#anchor" iconRight="external-link">View documentation</Button>
	{/snippet}
</Story>
