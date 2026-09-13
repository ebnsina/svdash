<script lang="ts">
	import Alert from '#lib/components/feedback/Alert.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import Input from '#lib/components/forms/Input.svelte';
	import Checkbox from '#lib/components/forms/Checkbox.svelte';
	import AuthShell from './AuthShell.svelte';

	interface Props {
		email?: string;
		password?: string;
		loading?: boolean;
		/** Whole-form failure, announced via role="alert". */
		error?: string;
		emailError?: string;
		passwordError?: string;
		signupHref?: string;
		forgotHref?: string;
		onsubmit?: (values: { email: string; password: string; remember: boolean }) => void;
	}

	let {
		email = $bindable(''),
		password = $bindable(''),
		loading = false,
		error,
		emailError,
		passwordError,
		signupHref = '#signup',
		forgotHref = '#forgot',
		onsubmit
	}: Props = $props();

	let remember = $state(true);
</script>

<AuthShell title="Welcome back" description="Sign in to your workspace.">
	<form
		class="flex flex-col gap-4"
		onsubmit={(e) => {
			e.preventDefault();
			onsubmit?.({ email, password, remember });
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

		<div class="flex flex-col gap-1.5">
			<Input
				label="Password"
				type="password"
				autocomplete="current-password"
				placeholder="••••••••"
				required
				bind:value={password}
				error={passwordError}
			/>
			<a
				href={forgotHref}
				class="self-end rounded-xs text-xs font-medium text-accent hover:underline focus-visible:ring-focus"
			>
				Forgot your password?
			</a>
		</div>

		<Checkbox label="Keep me signed in" bind:checked={remember} />

		<Button type="submit" fullWidth {loading} loadingLabel="Signing in">Sign in</Button>
	</form>

	{#snippet footer()}
		New here?
		<a
			href={signupHref}
			class="rounded-xs font-medium text-accent hover:underline focus-visible:ring-focus"
		>
			Create an account
		</a>
	{/snippet}
</AuthShell>
