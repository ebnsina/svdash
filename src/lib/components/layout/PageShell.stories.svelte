<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageShell from './PageShell.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import StatCard from '#lib/components/data-display/StatCard.svelte';

	const { Story } = defineMeta({
		title: 'Layout/PageShell',
		component: PageShell,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		argTypes: { width: { control: 'inline-radio', options: ['md', 'lg', 'full'] } },
		args: {
			title: 'Invoices',
			description: 'Every invoice raised across your workspace.',
			width: 'lg'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<PageShell
			title={args.title}
			description={args.description}
			width={args.width}
			bare={args.bare}
			class="min-h-dvh"
		>
			{#snippet actions()}
				<Button variant="outline" iconLeft="download">Export</Button>
				<Button iconLeft="plus">New invoice</Button>
			{/snippet}
			<div class="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
				<StatCard label="Outstanding" value="$18,420" trend={0.07} trendPolarity="down-good" />
				<StatCard label="Paid this month" value="$25,100" trend={0.128} />
				<StatCard label="Overdue" value="3" trend={-0.25} trendPolarity="down-good" />
				<StatCard label="Average days to pay" value="11" trend={-0.08} trendPolarity="down-good" />
			</div>
		</PageShell>
	{/snippet}
</Story>

<Story
	name="Narrow"
	args={{
		width: 'md',
		title: 'Profile',
		description: 'How you appear to your team.'
	}}
>
	{#snippet template(args)}
		<PageShell
			title={args.title}
			description={args.description}
			width={args.width}
			bare={args.bare}
			class="min-h-dvh"
		>
			<div class="rounded-xl bg-surface p-6 text-sm text-muted shadow-xs">
				A narrow shell suits settings and reading-heavy pages.
			</div>
		</PageShell>
	{/snippet}
</Story>

<Story name="Bare" args={{ bare: true, width: 'full' }}>
	{#snippet template(args)}
		<PageShell
			title={args.title}
			description={args.description}
			width={args.width}
			bare={args.bare}
			class="min-h-dvh"
		>
			<div class="rounded-xl bg-surface p-6 text-sm text-muted shadow-xs">
				No header — for pages that bring their own.
			</div>
		</PageShell>
	{/snippet}
</Story>
