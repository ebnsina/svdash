<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'Data Display/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			tone: {
				control: 'select',
				options: ['neutral', 'accent', 'success', 'warning', 'danger', 'info']
			},
			variant: { control: 'inline-radio', options: ['soft', 'outline', 'solid'] },
			size: { control: 'inline-radio', options: ['sm', 'md'] }
		},
		args: { tone: 'success', variant: 'soft', size: 'sm' }
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Badge tone={args.tone} variant={args.variant} size={args.size} dot={args.dot} icon={args.icon}>
			Paid
		</Badge>
	{/snippet}
</Story>

<Story name="Tones">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-2">
			<Badge tone="neutral">Draft</Badge>
			<Badge tone="accent">Beta</Badge>
			<Badge tone="success">Paid</Badge>
			<Badge tone="warning">Pending</Badge>
			<Badge tone="danger">Overdue</Badge>
			<Badge tone="info">Scheduled</Badge>
		</div>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="flex flex-col gap-3">
			<div class="flex flex-wrap gap-2">
				<Badge variant="soft" tone="success">Soft</Badge>
				<Badge variant="outline" tone="success">Outline</Badge>
				<Badge variant="solid" tone="success">Solid</Badge>
			</div>
			<div class="flex flex-wrap gap-2">
				<Badge variant="soft" tone="danger">Soft</Badge>
				<Badge variant="outline" tone="danger">Outline</Badge>
				<Badge variant="solid" tone="danger">Solid</Badge>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With status dot">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-2">
			<Badge dot tone="success">Operational</Badge>
			<Badge dot tone="warning">Degraded</Badge>
			<Badge dot tone="danger">Outage</Badge>
		</div>
	{/snippet}
</Story>

<Story name="With icon">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-2">
			<Badge icon="shield" tone="accent" size="md">Verified</Badge>
			<Badge icon="clock" tone="neutral" size="md">Queued</Badge>
		</div>
	{/snippet}
</Story>

<Story name="Removable">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-2">
			<Badge tone="neutral" onremove={() => {}}>eu-central-1</Badge>
			<Badge tone="neutral" onremove={() => {}}>production</Badge>
		</div>
	{/snippet}
</Story>
