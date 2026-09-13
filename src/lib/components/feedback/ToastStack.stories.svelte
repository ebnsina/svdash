<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ToastStack from './ToastStack.svelte';
	import { createToaster } from './toast.svelte.js';
	import Button from '#lib/components/buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Toast',
		component: ToastStack,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: {
			position: {
				control: 'inline-radio',
				options: ['top-right', 'bottom-right', 'top-center', 'bottom-center']
			}
		},
		args: { position: 'bottom-right' }
	});
</script>

<script lang="ts">
	const toaster = createToaster();
</script>

<Story name="Interactive">
	{#snippet template(args)}
		<div class="flex flex-wrap gap-2">
			<Button
				variant="secondary"
				onclick={() => toaster.success('Invoice sent', 'Amina will get an email shortly.')}
			>
				Success
			</Button>
			<Button
				variant="secondary"
				onclick={() => toaster.info('Export started', 'We will email you when it is ready.')}
			>
				Info
			</Button>
			<Button
				variant="secondary"
				onclick={() => toaster.warning('Usage at 92%', 'Consider upgrading your plan.')}
			>
				Warning
			</Button>
			<Button
				variant="secondary"
				onclick={() => toaster.error('Payment failed', 'The card ending 4242 was declined.')}
			>
				Error (sticky)
			</Button>
			<Button variant="ghost" onclick={toaster.clear}>Clear all</Button>
		</div>
		<ToastStack
			toasts={toaster.toasts}
			position={args.position}
			ondismiss={toaster.dismiss}
			onhold={toaster.hold}
			onresume={toaster.resume}
		/>
	{/snippet}
</Story>

<Story name="All tones">
	{#snippet template(args)}
		<p class="text-sm text-muted">A static stack, for reviewing the visual treatment.</p>
		<ToastStack
			position={args.position}
			toasts={[
				{
					id: '1',
					tone: 'success',
					title: 'Invoice sent',
					description: 'Amina will get an email shortly.'
				},
				{
					id: '2',
					tone: 'info',
					title: 'Export started',
					description: 'We will email you when it is ready.'
				},
				{ id: '3', tone: 'warning', title: 'Usage at 92%' },
				{
					id: '4',
					tone: 'error',
					title: 'Payment failed',
					description: 'The card ending 4242 was declined.'
				}
			]}
		/>
	{/snippet}
</Story>

<Story name="With an action">
	{#snippet template(args)}
		<p class="text-sm text-muted">Toasts can carry a single follow-up action.</p>
		<ToastStack
			position={args.position}
			toasts={[
				{
					id: '1',
					tone: 'info',
					title: 'Invoice moved to trash',
					description: 'It will be deleted for good in 30 days.',
					action: { label: 'Undo', onclick: () => {} }
				}
			]}
		/>
	{/snippet}
</Story>
