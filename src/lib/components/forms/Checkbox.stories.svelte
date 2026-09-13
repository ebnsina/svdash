<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		args: { label: 'Email me about product updates' }
	});
</script>

<Story name="Default" />
<Story name="Checked" args={{ checked: true }} />
<Story
	name="With description"
	args={{ description: 'At most one email a month. Unsubscribe any time.' }}
/>
<Story name="Indeterminate" args={{ label: 'Select all rows', indeterminate: true }} />
<Story
	name="Error"
	args={{ label: 'I accept the terms', error: 'You must accept the terms to continue.' }}
/>
<Story
	name="Disabled"
	args={{ disabled: true, checked: true, label: 'Managed by your administrator' }}
/>
<Story name="Group">
	{#snippet template()}
		<fieldset class="flex flex-col gap-3">
			<legend class="mb-1 text-sm font-medium text-fg">Notifications</legend>
			<Checkbox label="Deployment finished" checked description="Sent to your inbox." />
			<Checkbox label="Billing receipts" checked />
			<Checkbox label="Weekly usage digest" />
		</fieldset>
	{/snippet}
</Story>
