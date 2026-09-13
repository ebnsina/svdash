<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Sidebar from '#lib/components/layout/Sidebar.svelte';
	import Topbar from '#lib/components/layout/Topbar.svelte';
	import MobileNav from '#lib/components/layout/MobileNav.svelte';
	import PageShell from '#lib/components/layout/PageShell.svelte';
	import { navGroups, user, notifications } from '#lib/components/layout/mock.js';
	import StatCard from '#lib/components/data-display/StatCard.svelte';
	import LineChart from '#lib/components/data-display/LineChart.svelte';
	import DonutChart from '#lib/components/data-display/DonutChart.svelte';
	import DataTable from '#lib/components/data-display/DataTable.svelte';
	import Badge from '#lib/components/data-display/Badge.svelte';
	import Timeline from '#lib/components/data-display/Timeline.svelte';
	import {
		months,
		revenueSeries,
		planMix,
		invoiceColumns,
		invoiceRows,
		activity
	} from '#lib/components/data-display/mock.js';
	import type { Row, Column } from '#lib/components/data-display/DataTable.svelte';
	import CommandPalette from '#lib/components/navigation/CommandPalette.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import IconButton from '#lib/components/buttons/IconButton.svelte';
	import DropdownMenu from '#lib/components/feedback/DropdownMenu.svelte';
	import ToastStack from '#lib/components/feedback/ToastStack.svelte';
	import { createToaster } from '#lib/components/feedback/toast.svelte.js';
	import { formatCurrency, formatDate } from '#lib/utils/format.js';

	const { Story } = defineMeta({
		title: 'Design Tokens/Dashboard example',
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' }
	});

	const tones = {
		Paid: 'success',
		Pending: 'warning',
		Overdue: 'danger',
		Draft: 'neutral'
	} as const;

	const commands = [
		{ id: 'c1', label: 'Go to invoices', group: 'Navigation', icon: 'file' as const },
		{ id: 'c2', label: 'Create invoice', group: 'Actions', icon: 'plus' as const, shortcut: '⌘N' },
		{ id: 'c3', label: 'Toggle dark mode', group: 'Preferences', icon: 'moon' as const }
	];
</script>

<script lang="ts">
	let mobileOpen = $state(false);
	let sidebarCollapsed = $state(false);
	let paletteOpen = $state(false);
	let active = $state('overview');
	let columns = $state(invoiceColumns);
	let selected = $state<string[]>([]);
	const toaster = createToaster();
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

<!-- Every piece here is a component from this library; nothing is bespoke to the story. -->
<Story name="Full page">
	{#snippet template()}
		<div class="flex min-h-dvh bg-canvas">
			<Sidebar
				groups={navGroups}
				bind:active
				bind:collapsed={sidebarCollapsed}
				class="hidden lg:flex"
			/>
			<MobileNav bind:open={mobileOpen} groups={navGroups} bind:active />

			<div class="flex min-w-0 flex-1 flex-col">
				<Topbar
					{user}
					{notifications}
					{sidebarCollapsed}
					breadcrumbs={[{ label: 'Dashboard', href: '#' }, { label: 'Overview' }]}
					onsidebartoggle={() => (sidebarCollapsed = !sidebarCollapsed)}
					onmenu={() => (mobileOpen = true)}
					onsearch={() => (paletteOpen = true)}
				>
					{#snippet actions()}
						<Button
							size="sm"
							iconLeft="plus"
							class="hidden sm:inline-flex"
							onclick={() =>
								toaster.success('Draft invoice created', 'It is saved under Invoices.')}
						>
							New invoice
						</Button>
					{/snippet}
				</Topbar>

				<PageShell title="Overview" description="How the workspace is doing this month.">
					{#snippet actions()}
						<Button variant="outline" size="sm" iconLeft="calendar">Sep 2026</Button>
						<Button variant="outline" size="sm" iconLeft="download">Export</Button>
					{/snippet}

					<div class="flex flex-col gap-6">
						<div class="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
							<StatCard
								label="Monthly recurring revenue"
								value="$25,100"
								trend={0.128}
								sparkline={[18, 20, 19, 22, 21, 24, 25]}
								icon="bar-chart"
							/>
							<StatCard
								label="Active subscriptions"
								value="807"
								trend={0.031}
								sparkline={[740, 755, 762, 780, 788, 799, 807]}
								icon="users"
							/>
							<StatCard
								label="Churn rate"
								value="2.1%"
								trend={-0.006}
								trendPolarity="down-good"
								sparkline={[3.1, 2.9, 2.8, 2.5, 2.4, 2.2, 2.1]}
								icon="arrow-down"
							/>
							<StatCard
								label="Outstanding"
								value="$18,420"
								trend={0.07}
								trendPolarity="down-good"
								sparkline={[12, 13, 15, 14, 16, 17, 18]}
								icon="file"
							/>
						</div>

						<div class="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-4">
							<LineChart
								title="Revenue by month"
								labels={months}
								series={revenueSeries}
								valueFormat={{ style: 'currency', currency: 'USD', notation: 'compact' }}
								class="rounded-xl bg-surface p-5 shadow-xs lg:col-span-2"
							/>
							<DonutChart
								title="Subscriptions by plan"
								slices={planMix}
								centerSublabel="accounts"
								size={150}
								class="justify-center rounded-xl bg-surface p-5 shadow-xs sm:flex-col sm:items-stretch"
							/>
						</div>
						<div class="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-4">
							<DataTable
								caption="Recent invoices"
								bind:columns
								bind:selected
								rows={invoiceRows}
								cell={invoiceCell}
								searchPlaceholder="Search invoices"
								maxHeight="max-h-96"
								class="xl:col-span-2"
							>
								{#snippet bulkActions({ clear })}
									<Button size="sm" variant="outline" iconLeft="download">Export</Button>
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

							<section class="rounded-xl bg-surface p-5 shadow-xs">
								<h2 class="mb-4 text-sm font-semibold text-fg">Recent activity</h2>
								<Timeline events={activity} />
							</section>
						</div>
					</div>
				</PageShell>
			</div>

			<CommandPalette bind:open={paletteOpen} {commands} />
			<ToastStack
				toasts={toaster.toasts}
				ondismiss={toaster.dismiss}
				onhold={toaster.hold}
				onresume={toaster.resume}
			/>
		</div>
	{/snippet}
</Story>
