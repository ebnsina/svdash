<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';

	interface Props {
		label: string;
		/** Hide the label visually but keep it for screen readers. */
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		required?: boolean;
		/** Passed straight through if you need to control the id yourself. */
		id?: string;
		class?: string;
		/** Receives the wiring the control must spread onto itself. */
		children: Snippet<[{ id: string; describedBy: string | undefined; invalid: boolean }]>;
	}

	let {
		label,
		hideLabel = false,
		helper,
		error,
		required = false,
		id = uid('field'),
		class: klass,
		children
	}: Props = $props();

	let helperId = $derived(`${id}-helper`);
	let errorId = $derived(`${id}-error`);
	let invalid = $derived(Boolean(error));
	// Error first so it is read before the hint.
	let describedBy = $derived(
		[error && errorId, helper && helperId].filter(Boolean).join(' ') || undefined
	);
</script>

<div class={cn('flex flex-col gap-1.5', klass)}>
	<label for={id} class={cn('text-sm font-medium text-fg', hideLabel && 'sr-only')}>
		{label}
		{#if required}
			<span class="text-danger" aria-hidden="true">*</span>
			<span class="sr-only">(required)</span>
		{/if}
	</label>

	{@render children({ id, describedBy, invalid })}

	{#if error}
		<p id={errorId} class="text-xs text-danger">{error}</p>
	{/if}
	{#if helper}
		<p id={helperId} class="text-xs text-muted">{helper}</p>
	{/if}
</div>
