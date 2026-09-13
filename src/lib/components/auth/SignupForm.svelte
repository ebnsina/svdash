<script lang="ts">
	import Alert from '#lib/components/feedback/Alert.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import Input from '#lib/components/forms/Input.svelte';
	import Checkbox from '#lib/components/forms/Checkbox.svelte';
	import AuthShell from './AuthShell.svelte';

	interface Props {
		name?: string;
		email?: string;
		password?: string;
		loading?: boolean;
		error?: string;
		nameError?: string;
		emailError?: string;
		passwordError?: string;
		termsError?: string;
		loginHref?: string;
		onsubmit?: (values: { name: string; email: string; password: string }) => void;
	}

	let {
		name = $bindable(''),
		email = $bindable(''),
		password = $bindable(''),
		loading = false,
		error,
		nameError,
		emailError,
		passwordError,
		termsError,
		loginHref = '#login',
		onsubmit
	}: Props = $props();

	let accepted = $state(false);

	// Simple strength read-out; the real rule belongs to the backend.
	let strength = $derived(
		[/.{12,}/, /[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length
	);
	let strengthLabel = $derived(
		['Too short', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength]
	);
</script>

<AuthShell title="Create your account" description="Free for 14 days. No card required.">
	<form
		class="flex flex-col gap-4"
		onsubmit={(e) => {
			e.preventDefault();
			onsubmit?.({ name, email, password });
		}}
	>
		{#if error}
			<Alert tone="error">{error}</Alert>
		{/if}

		<Input
			label="Full name"
			autocomplete="name"
			placeholder="Amina Rahman"
			required
			bind:value={name}
			error={nameError}
		/>
		<Input
			label="Work email"
			type="email"
			autocomplete="email"
			placeholder="you@company.com"
			required
			bind:value={email}
			error={emailError}
		/>

		<div class="flex flex-col gap-2">
			<Input
				label="Password"
				type="password"
				autocomplete="new-password"
				placeholder="At least 12 characters"
				required
				bind:value={password}
				error={passwordError}
			/>
			{#if password}
				<div class="flex items-center gap-2">
					<div class="flex h-1 flex-1 gap-1" aria-hidden="true">
						{#each { length: 5 } as _, i (i)}
							<span
								class="flex-1 rounded-full {i < strength
									? strength <= 2
										? 'bg-danger'
										: strength <= 3
											? 'bg-warn'
											: 'bg-success'
									: 'bg-subtle'}"
							></span>
						{/each}
					</div>
					<span class="text-xs text-muted" role="status" aria-live="polite">{strengthLabel}</span>
				</div>
			{/if}
		</div>

		<Checkbox
			bind:checked={accepted}
			label="I agree to the terms and privacy policy"
			error={termsError}
		/>

		<Button type="submit" fullWidth {loading} loadingLabel="Creating your account"
			>Create account</Button
		>
	</form>

	{#snippet footer()}
		Already have an account?
		<a
			href={loginHref}
			class="rounded-xs font-medium text-accent hover:underline focus-visible:ring-focus"
		>
			Sign in
		</a>
	{/snippet}
</AuthShell>
