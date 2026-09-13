<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SettingsCard from './SettingsCard.svelte';
	import Input from '#lib/components/forms/Input.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Settings/SettingsCard',
		component: SettingsCard,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			title: 'Workspace name',
			description: 'Shown in the sidebar and on invoices.',
			class: 'w-[36rem] max-w-full'
		}
	});
</script>

<Story name="Default">
	{#snippet template()}
		<SettingsCard
			title="Workspace name"
			description="Shown in the sidebar and on invoices."
			footerNote="Up to 32 characters."
			class="w-[36rem] max-w-full"
		>
			<Input label="Name" hideLabel value="Acme Inc." />
			{#snippet footer()}
				<Button size="sm">Save</Button>
			{/snippet}
		</SettingsCard>
	{/snippet}
</Story>

<Story name="Without a footer">
	{#snippet template()}
		<SettingsCard
			title="Region"
			description="Where your data is stored. This cannot be changed."
			class="w-[36rem] max-w-full"
		>
			<p class="text-sm text-muted">Frankfurt, Germany (eu-central-1)</p>
		</SettingsCard>
	{/snippet}
</Story>

<Story name="Without a header">
	{#snippet template()}
		<SettingsCard class="w-[36rem] max-w-full">
			<p class="text-sm text-muted">
				A bare card, for when the section heading already says enough.
			</p>
		</SettingsCard>
	{/snippet}
</Story>
