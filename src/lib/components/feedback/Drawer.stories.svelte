<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Drawer from './Drawer.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import Input from '#lib/components/forms/Input.svelte';
	import Switch from '#lib/components/forms/Switch.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Drawer',
		component: Drawer,
		tags: ['autodocs'],
		argTypes: {
			side: { control: 'inline-radio', options: ['right', 'left', 'bottom'] },
			size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }
		},
		args: { title: 'Filters', side: 'right', size: 'md' }
	});
</script>

<script lang="ts">
	let right = $state(false);
	let left = $state(false);
	let bottom = $state(false);
</script>

<Story name="Right">
	{#snippet template()}
		<Button onclick={() => (right = true)}>Open filters</Button>
		<Drawer bind:open={right} title="Filters" description="Narrow the invoice list.">
			<div class="flex flex-col gap-5">
				<Input label="Customer" placeholder="Search customers" icon="search" />
				<Switch label="Only unpaid" description="Hide settled invoices." />
				<Switch label="Include drafts" checked />
			</div>
			{#snippet footer()}
				<Button variant="secondary" onclick={() => (right = false)}>Reset</Button>
				<Button onclick={() => (right = false)}>Apply filters</Button>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>

<Story name="Left">
	{#snippet template()}
		<Button onclick={() => (left = true)}>Open navigation</Button>
		<Drawer bind:open={left} side="left" title="Navigation" size="sm">
			<p class="text-muted">Anything can live in a drawer — this one slides in from the left.</p>
		</Drawer>
	{/snippet}
</Story>

<Story name="Bottom sheet">
	{#snippet template()}
		<Button onclick={() => (bottom = true)}>Open sheet</Button>
		<Drawer bind:open={bottom} side="bottom" title="Quick actions">
			<div class="flex flex-col gap-2">
				<Button variant="secondary" fullWidth iconLeft="download">Export as CSV</Button>
				<Button variant="secondary" fullWidth iconLeft="copy">Duplicate</Button>
				<Button variant="secondary" fullWidth iconLeft="trash">Move to trash</Button>
			</div>
		</Drawer>
	{/snippet}
</Story>
