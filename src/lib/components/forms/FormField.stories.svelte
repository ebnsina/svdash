<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FormField from './FormField.svelte';

	const { Story } = defineMeta({
		title: 'Forms/FormField',
		component: FormField,
		tags: ['autodocs'],
		args: { label: 'API base URL', class: 'w-96 max-w-full' }
	});
</script>

<!-- FormField owns the label, hint, error and the aria-describedby wiring. Any control can sit inside it. -->
<Story name="Default">
	{#snippet template(args)}
		<FormField {...args} helper="Must be reachable over HTTPS.">
			{#snippet children({ id, describedBy, invalid })}
				<input
					{id}
					aria-describedby={describedBy}
					aria-invalid={invalid || undefined}
					class="h-9.5 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg focus-visible:ring-focus"
				/>
			{/snippet}
		</FormField>
	{/snippet}
</Story>

<Story name="Error and helper">
	{#snippet template()}
		<FormField
			label="API base URL"
			error="Must start with https://"
			helper="Must be reachable over HTTPS."
			class="w-96 max-w-full"
		>
			{#snippet children({ id, describedBy, invalid })}
				<input
					{id}
					value="http://api.local"
					aria-describedby={describedBy}
					aria-invalid={invalid || undefined}
					class="h-9.5 w-full rounded-md border border-danger bg-surface px-3 text-sm text-fg focus-visible:ring-focus"
				/>
			{/snippet}
		</FormField>
	{/snippet}
</Story>

<Story name="Hidden label">
	{#snippet template()}
		<FormField label="Search" hideLabel class="w-96 max-w-full">
			{#snippet children({ id })}
				<input
					{id}
					type="search"
					placeholder="Label is present for screen readers only"
					class="h-9.5 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg focus-visible:ring-focus"
				/>
			{/snippet}
		</FormField>
	{/snippet}
</Story>
