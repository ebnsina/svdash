<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './Alert.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Alert',
		component: Alert,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: {
			tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] }
		},
		args: { tone: 'info', title: 'Scheduled maintenance' }
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="w-[36rem] max-w-full">
			<Alert
				tone={args.tone}
				title={args.title}
				banner={args.banner}
				dismissible={args.dismissible}
			>
				We will be read-only on Sunday from 02:00 to 04:00 UTC.
			</Alert>
		</div>
	{/snippet}
</Story>

<Story name="All tones">
	{#snippet template()}
		<div class="flex w-[36rem] max-w-full flex-col gap-3">
			<Alert tone="info" title="Heads up">Your trial ends in six days.</Alert>
			<Alert tone="success" title="Payment received">Invoice #1042 has been settled.</Alert>
			<Alert tone="warning" title="Usage is high">You have used 92% of your monthly quota.</Alert>
			<Alert tone="error" title="Payment failed">We could not charge the card ending 4242.</Alert>
		</div>
	{/snippet}
</Story>

<Story name="With actions">
	{#snippet template()}
		<div class="w-[36rem] max-w-full">
			<Alert tone="error" title="Payment failed">
				We could not charge the card ending 4242. Update it to keep your service running.
				{#snippet actions()}
					<Button size="sm" variant="destructive">Update card</Button>
					<Button size="sm" variant="ghost">Contact support</Button>
				{/snippet}
			</Alert>
		</div>
	{/snippet}
</Story>

<Story name="Dismissible">
	{#snippet template()}
		<div class="w-[36rem] max-w-full">
			<Alert tone="info" title="New dashboard" dismissible
				>You can rearrange your metric cards now.</Alert
			>
		</div>
	{/snippet}
</Story>

<Story name="Banner" parameters={{ layout: 'fullscreen' }}>
	{#snippet template()}
		<Alert tone="warning" banner dismissible>Your card expires at the end of this month.</Alert>
	{/snippet}
</Story>

<Story name="Without title">
	{#snippet template()}
		<div class="w-[36rem] max-w-full">
			<Alert tone="success">Settings saved.</Alert>
		</div>
	{/snippet}
</Story>
