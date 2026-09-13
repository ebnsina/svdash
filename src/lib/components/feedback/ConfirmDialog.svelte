<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { uid } from '#lib/utils/uid.js';
	import { trapFocus, lockScroll } from '#lib/utils/actions.js';
	import Button from '#lib/components/buttons/Button.svelte';

	interface Props {
		open?: boolean;
		title: string;
		message: string;
		confirmLabel?: string;
		cancelLabel?: string;
		destructive?: boolean;
		loading?: boolean;
		/** Requires typing this exact string before confirm is enabled. */
		confirmPhrase?: string;
		onconfirm?: () => void;
		oncancel?: () => void;
	}

	let {
		open = $bindable(false),
		title,
		message,
		confirmLabel = 'Confirm',
		cancelLabel = 'Cancel',
		destructive = false,
		loading = false,
		confirmPhrase,
		onconfirm,
		oncancel
	}: Props = $props();

	const id = uid('confirm');
	let typed = $state('');
	let ready = $derived(!confirmPhrase || typed === confirmPhrase);

	function cancel() {
		open = false;
		typed = '';
		oncancel?.();
	}

	$effect(() => {
		if (open) return lockScroll();
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && open) cancel();
	}}
/>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
		<div
			class="absolute inset-0 bg-overlay backdrop-blur-sm"
			onclick={cancel}
			aria-hidden="true"
		></div>
		<!-- APG alertdialog: an urgent message that interrupts the workflow. -->
		<div
			use:trapFocus
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="{id}-title"
			aria-describedby="{id}-message"
			class="relative w-full max-w-md rounded-xl bg-surface p-5 shadow-lg"
		>
			<div class="flex gap-3.5">
				<span
					class="flex size-9 shrink-0 items-center justify-center rounded-full {destructive
						? 'bg-danger-soft text-danger'
						: 'bg-accent-soft text-accent'}"
				>
					<Icon name={destructive ? 'alert-triangle' : 'alert-circle'} class="size-4.5" />
				</span>
				<div class="flex min-w-0 flex-col gap-1.5">
					<h2 id="{id}-title" class="text-base font-semibold text-fg">{title}</h2>
					<p id="{id}-message" class="text-sm text-muted">{message}</p>

					{#if confirmPhrase}
						<label for="{id}-phrase" class="mt-2 text-xs text-muted">
							Type <span class="font-mono font-semibold text-fg">{confirmPhrase}</span> to confirm
						</label>
						<input
							id="{id}-phrase"
							bind:value={typed}
							autocomplete="off"
							class="h-9 w-full rounded-xl bg-subtle px-3 font-mono text-sm text-fg focus-visible:ring-focus"
						/>
					{/if}
				</div>
			</div>

			<div class="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				<Button variant="secondary" onclick={cancel}>{cancelLabel}</Button>
				<Button
					variant={destructive ? 'destructive' : 'primary'}
					disabled={!ready}
					{loading}
					onclick={() => {
						onconfirm?.();
						open = false;
						typed = '';
					}}
				>
					{confirmLabel}
				</Button>
			</div>
		</div>
	</div>
{/if}
