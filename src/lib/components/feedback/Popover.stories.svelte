<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import Checkbox from '#lib/components/forms/Checkbox.svelte';
	import RadioGroup from '#lib/components/forms/RadioGroup.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Popover',
		component: Popover,
		tags: ['autodocs'],
		argTypes: { align: { control: 'inline-radio', options: ['start', 'center', 'end'] } },
		args: { label: 'Filters', align: 'start' }
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="p-8">
			<Popover label="Column filters">
				{#snippet trigger({ props })}
					<Button variant="outline" iconLeft="filter" {...props}>Filters</Button>
				{/snippet}
				{#snippet children({ close })}
					<div class="flex flex-col gap-3">
						<p class="text-sm font-semibold text-fg">Status</p>
						<Checkbox label="Paid" checked />
						<Checkbox label="Pending" checked />
						<Checkbox label="Overdue" />
						<Button size="sm" onclick={close}>Apply</Button>
					</div>
				{/snippet}
			</Popover>
		</div>
	{/snippet}
</Story>

<Story name="Aligned to the end">
	{#snippet template()}
		<div class="flex justify-end p-8">
			<Popover label="Sort options" align="end">
				{#snippet trigger({ props })}
					<Button variant="outline" iconRight="chevrons-up-down" {...props}>Sort</Button>
				{/snippet}
				{#snippet children({ close })}
					<RadioGroup
						legend="Sort by"
						value="recent"
						options={[
							{ value: 'recent', label: 'Most recent' },
							{ value: 'amount', label: 'Highest amount' },
							{ value: 'name', label: 'Customer name' }
						]}
					/>
					<Button size="sm" class="mt-3" onclick={close}>Done</Button>
				{/snippet}
			</Popover>
		</div>
	{/snippet}
</Story>

<Story name="Above the trigger">
	{#snippet template()}
		<div class="flex items-end p-8 pt-48">
			<Popover label="Help" placement="top" width="w-64">
				{#snippet trigger({ props })}
					<Button variant="ghost" iconLeft="info" {...props}>What is this?</Button>
				{/snippet}
				{#snippet children()}
					<p class="text-sm text-muted">
						Monthly recurring revenue, normalised to a 30-day month and excluding one-off charges.
					</p>
				{/snippet}
			</Popover>
		</div>
	{/snippet}
</Story>
