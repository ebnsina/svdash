<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataTable from './DataTable.svelte';
	import Badge from './Badge.svelte';
	import { invoiceColumns, invoiceRows, manyInvoiceRows } from './mock.js';
	import type { Row, Column } from './DataTable.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import IconButton from '#lib/components/buttons/IconButton.svelte';
	import DropdownMenu from '#lib/components/feedback/DropdownMenu.svelte';
	import { formatCurrency, formatDate } from '#lib/utils/format.js';

	const tones = {
		Paid: 'success',
		Pending: 'warning',
		Overdue: 'danger',
		Draft: 'neutral'
	} as const;

	const { Story } = defineMeta({
		title: 'Data Display/DataTable',
		component: DataTable,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		args: {
			caption: 'Invoices',
			columns: invoiceColumns,
			rows: invoiceRows,
			searchPlaceholder: 'Search invoices',
			class: 'm-6'
		}
	});
</script>

{#snippet invoiceCell({ row, column }: { row: Row; column: Column })}
	{#if column.key === 'status'}
		<Badge tone={tones[row.status as keyof typeof tones]} dot>{row.status}</Badge>
	{:else if column.key === 'amount'}
		{formatCurrency(row.amount as number)}
	{:else if column.key === 'issued'}
		{formatDate(row.issued as string)}
	{:else if column.key === 'number'}
		<span class="font-mono text-xs">{row.number}</span>
	{:else}
		{String(row[column.key] ?? '—')}
	{/if}
{/snippet}

<Story name="Default">
	{#snippet template(args)}
		<DataTable {...args} cell={invoiceCell} />
	{/snippet}
</Story>

<Story name="With bulk actions and row menu">
	{#snippet template(args)}
		<DataTable {...args} cell={invoiceCell}>
			{#snippet filters()}
				<Button variant="outline" size="sm" iconLeft="filter">Status</Button>
				<Button variant="outline" size="sm" iconLeft="calendar">Date range</Button>
			{/snippet}
			{#snippet bulkActions({ clear })}
				<Button size="sm" variant="outline" iconLeft="download">Export</Button>
				<Button size="sm" variant="destructive" iconLeft="trash">Delete</Button>
				<Button size="sm" variant="ghost" onclick={clear}>Clear</Button>
			{/snippet}
			{#snippet rowActions({ row })}
				<DropdownMenu
					label="Actions for {row.number}"
					items={[
						{ label: 'View invoice', icon: 'eye' },
						{ label: 'Download PDF', icon: 'download' },
						{ label: 'Delete', icon: 'trash', destructive: true, separatorBefore: true }
					]}
				>
					{#snippet trigger({ props })}
						<IconButton
							icon="more-horizontal"
							label="Actions for {row.number}"
							size="sm"
							{...props}
						/>
					{/snippet}
				</DropdownMenu>
			{/snippet}
		</DataTable>
	{/snippet}
</Story>

<Story name="Preselected rows" args={{ selected: ['1', '4'] }}>
	{#snippet template(args)}
		<DataTable {...args} cell={invoiceCell}>
			{#snippet bulkActions({ clear })}
				<Button size="sm" variant="outline" iconLeft="download">Export</Button>
				<Button size="sm" variant="ghost" onclick={clear}>Clear</Button>
			{/snippet}
		</DataTable>
	{/snippet}
</Story>

<Story name="Without selection" args={{ selectable: false }}>
	{#snippet template(args)}
		<DataTable {...args} cell={invoiceCell} />
	{/snippet}
</Story>

<Story name="Paginated (5,000 rows)" args={{ rows: manyInvoiceRows, pageSize: 12 }}>
	{#snippet template(args)}
		<DataTable {...args} cell={invoiceCell} />
	{/snippet}
</Story>

<!-- Same 5,000 rows with no pagination: only the visible window is in the DOM. -->
<Story
	name="Virtualized (5,000 rows)"
	args={{ rows: manyInvoiceRows, virtualize: true, maxHeight: 'max-h-[32rem]' }}
>
	{#snippet template(args)}
		<DataTable {...args} cell={invoiceCell} />
	{/snippet}
</Story>

<Story name="Loading" args={{ loading: true }} />
<Story
	name="Empty"
	args={{
		rows: [],
		emptyTitle: 'No invoices yet',
		emptyDescription: 'Invoices appear here once you bill your first customer.'
	}}
/>
<Story
	name="Error"
	args={{ error: 'The billing service did not respond. Try again in a moment.' }}
/>
