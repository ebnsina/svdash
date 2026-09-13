<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import Alert from '#lib/components/feedback/Alert.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import AuthShell from './AuthShell.svelte';

	interface Props {
		email: string;
		state?: 'pending' | 'verifying' | 'verified' | 'failed';
		/** Seconds until the resend button unlocks. */
		resendIn?: number;
		onresend?: () => void;
		oncontinue?: () => void;
	}

	let { email, state = 'pending', resendIn = 0, onresend, oncontinue }: Props = $props();

	const copy = {
		pending: { icon: 'mail', tone: 'bg-accent-soft text-accent', title: 'Verify your email' },
		verifying: { icon: 'loader', tone: 'bg-subtle text-muted', title: 'Verifying…' },
		verified: {
			icon: 'check-circle',
			tone: 'bg-success-soft text-success',
			title: 'Email verified'
		},
		failed: {
			icon: 'x-circle',
			tone: 'bg-danger-soft text-danger',
			title: 'We could not verify that link'
		}
	} as const;

	let current = $derived(copy[state]);
</script>

<AuthShell
	title={current.title}
	description={state === 'verified'
		? 'Your account is ready to use.'
		: state === 'failed'
			? 'The link may have expired or already been used.'
			: `We sent a confirmation link to ${email}.`}
>
	<div class="flex flex-col items-center gap-5 text-center">
		<span class="flex size-12 items-center justify-center rounded-full {current.tone}">
			<Icon name={current.icon} class="size-6 {state === 'verifying' ? 'animate-spin' : ''}" />
		</span>

		{#if state === 'failed'}
			<Alert tone="error" class="w-full text-left"
				>Request a new confirmation email and try again.</Alert
			>
		{/if}

		<p class="sr-only" role="status" aria-live="polite">{current.title}</p>

		{#if state === 'verified'}
			<Button fullWidth onclick={oncontinue}>Continue to your dashboard</Button>
		{:else if state !== 'verifying'}
			<div class="flex w-full flex-col gap-2">
				<Button fullWidth variant="secondary" disabled={resendIn > 0} onclick={onresend}>
					{resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend confirmation email'}
				</Button>
				<p class="text-xs text-muted">Wrong address? Sign out and start again.</p>
			</div>
		{/if}
	</div>
</AuthShell>
