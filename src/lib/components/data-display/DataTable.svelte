<script lang="ts">
	import { untrack, type Snippet } from 'svelte';
	import {
		createTable,
		tableFeatures,
		rowSortingFeature,
		createSortedRowModel,
		sortFn_alphanumeric,
		sortFn_text,
		globalFilteringFeature,
		columnFilteringFeature,
		createFilteredRowModel,
		filterFn_includesString,
		rowSelectionFeature,
		columnVisibilityFeature,
		rowPaginationFeature,
		createPaginatedRowModel
	} from '@tanstack/svelte-table';
	import type {
		ColumnDef,
		SortingState,
		ColumnVisibilityState,
		RowSelectionState
	} from '@tanstack/svelte-table';
	import { createVirtualizer } from '@tanstack/svelte-virtual';
	import { get } from 'svelte/store';
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { formatNumber } from '#lib/utils/format.js';
	import { debounced } from '#lib/utils/debounce.svelte.js';
	import Button from '#lib/components/buttons/Button.svelte';
	import Checkbox from '#lib/components/forms/Checkbox.svelte';
	import Input from '#lib/components/forms/Input.svelte';
	import DropdownMenu from '#lib/components/feedback/DropdownMenu.svelte';
	import Skeleton from '#lib/components/feedback/Skeleton.svelte';
	import Pagination from '#lib/components/navigation/Pagination.svelte';
	import EmptyState from './EmptyState.svelte';

	export type Row = Record<string, unknown> & { id: string };

	export interface Column {
		key: string;
		header: string;
		sortable?: boolean;
		align?: 'left' | 'right' | 'center';
		/** Tailwind width class, e.g. `w-40`. */
		width?: string;
		hidden?: boolean;
	}

	interface Props {
		rows: Row[];
		columns: Column[];
		caption: string;
		selected?: string[];
		selectable?: boolean;
		searchable?: boolean;
		searchPlaceholder?: string;
		/** Rows per page. Set 0 to show every row without pagination. */
		pageSize?: number;
		/** Windows the rows instead of paginating — for tens of thousands of rows. */
		virtualize?: boolean;
		rowHeight?: number;
		loading?: boolean;
		error?: string;
		emptyTitle?: string;
		emptyDescription?: string;
		maxHeight?: string;
		class?: string;
		cell?: Snippet<[{ row: Row; column: Column }]>;
		filters?: Snippet;
		bulkActions?: Snippet<[{ selected: string[]; clear: () => void }]>;
		rowActions?: Snippet<[{ row: Row }]>;
	}

	let {
		rows,
		columns = $bindable(),
		caption,
		selected = $bindable<string[]>([]),
		selectable = true,
		searchable = true,
		searchPlaceholder = 'Search',
		pageSize = 10,
		virtualize = false,
		rowHeight = 45,
		loading = false,
		error,
		emptyTitle = 'Nothing to show',
		emptyDescription = 'Once there is data it will appear here.',
		maxHeight = 'max-h-[32rem]',
		class: klass,
		cell,
		filters,
		bulkActions,
		rowActions
	}: Props = $props();

	// TanStack owns sorting, filtering, selection, visibility and pagination.
	// The markup stays ours so cells can be Svelte snippets rather than render functions.
	const features = tableFeatures({
		rowSortingFeature,
		sortedRowModel: createSortedRowModel(),
		sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
		columnFilteringFeature,
		globalFilteringFeature,
		filteredRowModel: createFilteredRowModel(),
		filterFns: { includesString: filterFn_includesString },
		rowSelectionFeature,
		columnVisibilityFeature,
		rowPaginationFeature,
		paginatedRowModel: createPaginatedRowModel()
	});

	let query = $state('');
	// Typing shouldn't re-filter on every keystroke of a long list.
	let globalFilter = debounced(() => query, 200);
	let sorting = $state<SortingState>([]);
	let pagination = $state(
		untrack(() => ({ pageIndex: 0, pageSize: pageSize || rows.length || 1 }))
	);

	let columnVisibility = $derived<ColumnVisibilityState>(
		Object.fromEntries(columns.map((c) => [c.key, !c.hidden]))
	);
	let rowSelection = $derived<RowSelectionState>(
		Object.fromEntries(selected.map((key) => [key, true]))
	);

	let tableColumns = $derived(
		columns.map(
			(column) =>
				({
					id: column.key,
					accessorKey: column.key,
					header: column.header,
					enableSorting: column.sortable ?? false,
					enableHiding: true,
					sortFn: 'alphanumeric',
					filterFn: 'includesString'
				}) satisfies ColumnDef<typeof features, Row>
		)
	);

	const table = createTable({
		features,
		get columns() {
			return tableColumns;
		},
		get data() {
			return rows;
		},
		getRowId: (row) => row.id,
		enableRowSelection: true,
		autoResetPageIndex: true,
		manualPagination: false,
		state: {
			get sorting() {
				return sorting;
			},
			get globalFilter() {
				return globalFilter.current;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get pagination() {
				return pagination;
			}
		},
		onSortingChange: (updater) => {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		onPaginationChange: (updater) => {
			pagination = typeof updater === 'function' ? updater(pagination) : updater;
		},
		onRowSelectionChange: (updater) => {
			const next = typeof updater === 'function' ? updater(rowSelection) : updater;
			selected = Object.keys(next).filter((key) => next[key]);
		},
		onColumnVisibilityChange: (updater) => {
			const next = typeof updater === 'function' ? updater(columnVisibility) : updater;
			columns = columns.map((c) => ({ ...c, hidden: next[c.key] === false }));
		}
	});

	let visibleColumns = $derived(columns.filter((c) => !c.hidden));
	let filteredRows = $derived(table.getFilteredRowModel().rows);
	let pageRows = $derived(
		virtualize || !pageSize ? filteredRows : table.getPaginatedRowModel().rows
	);
	let pageCount = $derived(Math.max(1, table.getPageCount()));

	// Virtualized body: spacer rows above and below keep <table> semantics intact.
	let scrollEl = $state<HTMLDivElement | null>(null);
	const virtualizer = createVirtualizer<HTMLDivElement, HTMLTableRowElement>({
		count: 0,
		getScrollElement: () => scrollEl,
		estimateSize: () => rowHeight,
		overscan: 12
	});

	// Reconfigure in place — recreating the virtualizer on every data change would
	// reset the scroll position and thrash the observers.
	$effect(() => {
		const count = virtualize ? pageRows.length : 0;
		untrack(() => get(virtualizer)).setOptions({
			count,
			getScrollElement: () => scrollEl,
			estimateSize: () => rowHeight,
			overscan: 12
		});
	});

	let virtualItems = $derived(virtualize ? $virtualizer.getVirtualItems() : []);
	let padTop = $derived(virtualItems.length ? virtualItems[0].start : 0);
	let padBottom = $derived(
		virtualItems.length
			? $virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
			: 0
	);
	let renderedRows = $derived(
		virtualize ? virtualItems.map((v) => pageRows[v.index]).filter(Boolean) : pageRows
	);

	let allSelected = $derived(pageRows.length > 0 && pageRows.every((r) => r.getIsSelected()));
	let someSelected = $derived(selected.length > 0 && !allSelected);

	let columnMenuItems = $derived(
		table.getAllLeafColumns().map((column) => ({
			label: columns.find((c) => c.key === column.id)?.header ?? column.id,
			checked: column.getIsVisible(),
			// Never let the last visible column be hidden — nothing would be left to read.
			disabled: column.getIsVisible() && visibleColumns.length === 1,
			onselect: () => column.toggleVisibility()
		}))
	);

	function toggleAll() {
		table.toggleAllPageRowsSelected(!allSelected);
	}

	const alignments = { left: 'text-left', right: 'text-right', center: 'text-center' };
</script>

<div class={cn('flex flex-col rounded-xl bg-surface shadow-xs', klass)}>
	<!-- Toolbar -->
	<div
		class="flex flex-col gap-3 border-b border-border/60 p-3 sm:flex-row sm:items-center sm:justify-between"
	>
		{#if selected.length > 0 && bulkActions}
			<div class="flex flex-wrap items-center gap-3">
				<span class="text-sm font-medium text-fg">{selected.length} selected</span>
				{@render bulkActions({ selected, clear: () => table.resetRowSelection() })}
			</div>
		{:else}
			<div class="flex flex-1 flex-wrap items-center gap-2">
				{#if searchable}
					<Input
						label="Search {caption}"
						hideLabel
						type="search"
						size="sm"
						variant="filled"
						icon="search"
						placeholder={searchPlaceholder}
						bind:value={query}
						class="w-full sm:w-64 [&_input]:rounded-lg"
					/>
				{/if}
				{#if filters}
					{@render filters()}
				{/if}
			</div>
		{/if}

		<div class="flex shrink-0 items-center gap-2">
			<DropdownMenu label="Toggle columns" items={columnMenuItems}>
				{#snippet trigger({ props })}
					<Button variant="outline" size="sm" iconLeft="columns" {...props}>Columns</Button>
				{/snippet}
			</DropdownMenu>
		</div>
	</div>

	{#if error}
		<div role="alert" class="flex flex-col items-center gap-3 px-6 py-14 text-center">
			<span
				class="flex size-12 items-center justify-center rounded-full bg-danger-soft text-danger"
			>
				<Icon name="alert-circle" class="size-6" />
			</span>
			<p class="text-base font-semibold text-fg">Could not load {caption.toLowerCase()}</p>
			<p class="max-w-sm text-sm text-muted">{error}</p>
		</div>
	{:else if loading}
		<div class="flex flex-col gap-4 p-4" aria-busy="true">
			<span class="sr-only">Loading {caption}</span>
			{#each { length: 6 } as _, i (i)}
				<Skeleton class="w-full" />
			{/each}
		</div>
	{:else if filteredRows.length === 0}
		<EmptyState
			bordered={false}
			icon={query ? 'search' : 'inbox'}
			title={query ? `No results for “${query}”` : emptyTitle}
			description={query ? 'Try a different search term.' : emptyDescription}
		/>
	{:else}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			bind:this={scrollEl}
			tabindex="0"
			role="region"
			aria-label="{caption} rows"
			class={cn('overflow-auto focus-visible:ring-focus-inset', maxHeight)}
		>
			<table class="w-full border-collapse text-sm">
				<caption class="sr-only">{caption}</caption>
				<thead class="sticky top-0 z-10 bg-chrome backdrop-blur-xl">
					{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
						<tr>
							{#if selectable}
								<th scope="col" class="w-10 border-b border-border/60 px-3 py-2.5">
									<Checkbox
										label="Select all rows on this page"
										hideLabel
										checked={allSelected}
										indeterminate={someSelected}
										onchange={toggleAll}
									/>
								</th>
							{/if}
							{#each headerGroup.headers as header (header.id)}
								{@const column = columns.find((c) => c.key === header.column.id)}
								{@const sorted = header.column.getIsSorted()}
								<th
									scope="col"
									aria-sort={sorted === 'asc'
										? 'ascending'
										: sorted === 'desc'
											? 'descending'
											: header.column.getCanSort()
												? 'none'
												: undefined}
									class={cn(
										'border-b border-border/60 px-3 py-2.5 font-medium whitespace-nowrap text-muted',
										alignments[column?.align ?? 'left'],
										column?.width
									)}
								>
									{#if header.column.getCanSort()}
										<button
											type="button"
											onclick={header.column.getToggleSortingHandler()}
											class={cn(
												'-mx-1 inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:text-fg focus-visible:ring-focus',
												column?.align === 'right' && 'flex-row-reverse'
											)}
										>
											{column?.header ?? header.column.id}
											<Icon
												name={sorted === 'asc'
													? 'chevron-up'
													: sorted === 'desc'
														? 'chevron-down'
														: 'chevrons-up-down'}
												class={cn('size-3.5', sorted ? 'text-accent' : 'text-faint')}
											/>
										</button>
									{:else}
										{column?.header ?? header.column.id}
									{/if}
								</th>
							{/each}
							{#if rowActions}
								<th scope="col" class="w-12 border-b border-border/60 px-3 py-2.5">
									<span class="sr-only">Row actions</span>
								</th>
							{/if}
						</tr>
					{/each}
				</thead>
				<tbody>
					{#if padTop > 0}
						<tr aria-hidden="true"><td style:height="{padTop}px" colspan="99"></td></tr>
					{/if}

					{#each renderedRows as row (row.id)}
						<tr
							class={cn(
								'border-b border-border/60 last:border-0 hover:bg-subtle/60',
								row.getIsSelected() && 'bg-accent-soft/40'
							)}
						>
							{#if selectable}
								<td class="px-3 py-2.5">
									<Checkbox
										label="Select row {String(row.original[visibleColumns[0]?.key] ?? row.id)}"
										hideLabel
										checked={row.getIsSelected()}
										onchange={() => row.toggleSelected()}
									/>
								</td>
							{/if}
							{#each visibleColumns as column, ci (column.key)}
								<svelte:element
									this={ci === 0 ? 'th' : 'td'}
									scope={ci === 0 ? 'row' : undefined}
									class={cn(
										'px-3 py-2.5 text-fg',
										ci === 0 ? 'font-medium' : 'font-normal text-muted',
										alignments[column.align ?? 'left'],
										column.align === 'right' && 'font-mono tabular-nums'
									)}
								>
									{#if cell}
										{@render cell({ row: row.original, column })}
									{:else}
										{String(row.original[column.key] ?? '—')}
									{/if}
								</svelte:element>
							{/each}
							{#if rowActions}
								<td class="px-3 py-2.5 text-right">{@render rowActions({ row: row.original })}</td>
							{/if}
						</tr>
					{/each}

					{#if padBottom > 0}
						<tr aria-hidden="true"><td style:height="{padBottom}px" colspan="99"></td></tr>
					{/if}
				</tbody>
			</table>
		</div>

		<div
			class="flex flex-col gap-3 border-t border-border/60 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
		>
			<p class="text-xs text-muted" role="status" aria-live="polite">
				{#if selected.length > 0}
					<span class="font-medium text-fg">{formatNumber(selected.length)}</span>
					of {formatNumber(filteredRows.length)} selected
				{:else}
					{formatNumber(filteredRows.length)}
					{filteredRows.length === 1 ? 'row' : 'rows'}
				{/if}
			</p>

			{#if pageSize && !virtualize && pageCount > 1}
				<Pagination
					variant="compact"
					page={pagination.pageIndex + 1}
					totalPages={pageCount}
					totalItems={filteredRows.length}
					pageSize={pagination.pageSize}
					onchange={(page) => table.setPageIndex(page - 1)}
				/>
			{/if}
		</div>
	{/if}
</div>
