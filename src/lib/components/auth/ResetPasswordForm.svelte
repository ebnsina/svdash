<script lang="ts">
	import Alert from '#lib/components/feedback/Alert.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import Input from '#lib/components/forms/Input.svelte';
	import AuthShell from './AuthShell.svelte';

	interface Props {
		password?: string;
		confirm?: string;
		loading?: boolean;
		error?: string;
		passwordError?: string;
		confirmError?: string;
		/** Shows the expired-link state instead of the form. */
		expired?: boolean;
		loginHref?: string;
		onsubmit?: (password: string) => void;
	}

	let {
		password = $bindable(''),
		confirm = $bindable(''),
		loading = false,
		error,
		passwordError,
		confirmError,
		expired = false,
		loginHref = '#login',
		onsubmit
	}: Props = $props();

	let mismatch = $derived(
		confirm.length > 0 && confirm !== password ? 'Passwords do not match.' : undefined
	);
</script>

<AuthShell title="Set a new password" description="Choose something you have not used before.">
	{#if expired}
		<div class="flex flex-col gap-4">
			<Alert tone="error" title="This link has expired">
				Reset links are valid for 30 minutes. Request a fresh one to continue.
			</Alert>
			<Button fullWidth href="#forgot">Request a new link</Button>
		</div>
	{:else}
		<form
			class="flex flex-col gap-4"
			onsubmit={(e) => {
				e.preventDefault();
				onsubmit?.(password);
			}}
		>
			{#if error}
				<Alert tone="error">{error}</Alert>
			{/if}
			<Input
				label="New password"
				type="password"
				autocomplete="new-password"
				required
				bind:value={password}
				error={passwordError}
				helper="At least 12 characters."
			/>
			<Input
				label="Confirm new password"
				type="password"
				autocomplete="new-password"
				required
				bind:value={confirm}
				error={confirmError ?? mismatch}
			/>
			<Button type="submit" fullWidth {loading} loadingLabel="Saving your password"
				>Save password</Button
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
