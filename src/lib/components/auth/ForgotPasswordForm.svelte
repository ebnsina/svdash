<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import Alert from '#lib/components/feedback/Alert.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import Input from '#lib/components/forms/Input.svelte';
	import AuthShell from './AuthShell.svelte';

	interface Props {
		email?: string;
		loading?: boolean;
		error?: string;
		emailError?: string;
		/** Switches to the confirmation state. */
		sent?: boolean;
		loginHref?: string;
		onsubmit?: (email: string) => void;
		onresend?: () => void;
	}

	let {
		email = $bindable(''),
		loading = false,
		error,
		emailError,
		sent = false,
		loginHref = '#login',
		onsubmit,
		onresend
	}: Props = $props();
</script>

<AuthShell
	title={sent ? 'Check your inbox' : 'Reset your password'}
	description={sent
		? `If an account exists for ${email || 'that address'}, a reset link is on its way.`
		: 'We will email you a link to set a new one.'}
>
	{#if sent}
		<div class="flex flex-col items-center gap-4 text-center">
			<span
				class="flex size-11 items-center justify-center rounded-full bg-success-soft text-success"
			>
				<Icon name="mail" class="size-5.5" />
			</span>
			<p class="text-sm text-muted">The link expires in 30 minutes. Check your spam folder too.</p>
			<Button variant="secondary" fullWidth onclick={onresend}>Send it again</Button>
		</div>
	{:else}
		<form
			class="flex flex-col gap-4"
			onsubmit={(e) => {
				e.preventDefault();
				onsubmit?.(email);
			}}
		>
			{#if error}
				<Alert tone="error">{error}</Alert>
			{/if}
			<Input
				label="Email address"
				type="email"
				autocomplete="email"
				placeholder="you@company.com"
				required
				bind:value={email}
				error={emailError}
			/>
			<Button type="submit" fullWidth {loading} loadingLabel="Sending the link"
				>Send reset link</Button
			>
		</form>
	{/if}

	{#snippet footer()}
		<a
			href={loginHref}
			class="rounded-xs font-medium text-accent hover:underline focus-visible:ring-focus"
		>
			Back to sign in
		</a>
	{/snippet}
</AuthShell>
