<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RadioGroup from './RadioGroup.svelte';

	const options = [
		{ value: 'monthly', label: 'Monthly', description: 'Billed every month, cancel any time.' },
		{ value: 'yearly', label: 'Yearly', description: 'Two months free.' },
		{ value: 'invoice', label: 'Invoice', description: 'Only on Enterprise.', disabled: true }
	];

	const { Story } = defineMeta({
		title: 'Forms/RadioGroup',
		component: RadioGroup,
		tags: ['autodocs'],
		argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
		args: { legend: 'Billing period', options, value: 'monthly', class: 'w-96 max-w-full' }
	});
</script>

<Story name="Default" />
<Story
	name="Horizontal"
	args={{
		orientation: 'horizontal',
		legend: 'Theme',
		value: 'system',
		options: [
			{ value: 'light', label: 'Light' },
			{ value: 'dark', label: 'Dark' },
			{ value: 'system', label: 'System' }
		]
	}}
/>
<Story name="With helper" args={{ helper: 'Changing this takes effect on your next invoice.' }} />
<Story name="Error" args={{ value: '', error: 'Choose a billing period.' }} />
