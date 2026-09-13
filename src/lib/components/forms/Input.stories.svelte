<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';
	import { iconNames } from '#lib/icons/registry.js';

	const { Story } = defineMeta({
		title: 'Forms/Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			type: { control: 'select', options: ['text', 'email', 'password', 'search', 'tel', 'url'] },
			size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
			icon: { control: 'select', options: [undefined, ...iconNames] },
			variant: { control: 'inline-radio', options: ['outline', 'filled'] }
		},
		args: { label: 'Workspace name', placeholder: 'Acme Inc.', class: 'w-80 max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="With helper" args={{ helper: 'Shown to everyone on your team.' }} />
<Story name="Required" args={{ required: true, helper: 'You can change this later.' }} />
<Story
	name="Error"
	args={{
		label: 'Email address',
		type: 'email',
		value: 'not-an-email',
		error: 'Enter a valid email address.',
		helper: 'We only use this for billing receipts.'
	}}
/>
<Story
	name="With icon"
	args={{ label: 'Search', type: 'search', icon: 'search', placeholder: 'Search invoices' }}
/>
<Story
	name="With suffix"
	args={{ label: 'Custom domain', placeholder: 'acme', suffix: '.svdash.app' }}
/>
<Story name="Disabled" args={{ disabled: true, value: 'Locked value' }} />
<Story name="Read only" args={{ readonly: true, value: 'acme-production' }} />
<Story name="Sizes">
	{#snippet template()}
		<div class="flex w-80 max-w-full flex-col gap-4">
			<Input label="Small" size="sm" placeholder="Small" />
			<Input label="Medium" size="md" placeholder="Medium" />
			<Input label="Large" size="lg" placeholder="Large" />
		</div>
	{/snippet}
</Story>
