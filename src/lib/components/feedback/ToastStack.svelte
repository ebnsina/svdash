<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';
	import type { Toast, ToastTone } from './toast.svelte.js';

	interface Props {
		toasts: Toast[];
		position?: 'top-right' | 'bottom-right' | 'top-center' | 'bottom-center';
		class?: string;
		ondismiss?: (id: string) => void;
		/** Hovering or focusing the stack holds the auto-dismiss timers. */
		onhold?: () => void;
		onresume?: () => void;
	}

	let {
		toasts,
		position = 'bottom-right',
		class: klass,
		ondismiss,
		onhold,
		onresume
	}: Props = $props();

	const positions = {
		'top-right': 'top-4 right-4 items-end',
		'bottom-right': 'bottom-4 right-4 items-end',
		'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
		'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center'
	};

	const tones: Record<ToastTone, { icon: IconName; color: string }> = {
		info: { icon: 'info', color: 'text-info' },
		success: { icon: 'check-circle', color: 'text-success' },
		warning: { icon: 'alert-triangle', color: 'text-warn' },
		error: { icon: 'alert-circle', color: 'text-danger' }
	};

	// Errors interrupt; everything else waits its turn.
	let assertive = $derived(toasts.filter((t) => t.tone === 'error'));
	let polite = $derived(toasts.filter((t) => t.tone !== 'error'));
</script>

{#snippet item(toast: Toast)}
	<div
		class="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl bg-surface px-4 py-3 shadow-lg"
	>
		<Icon
			name={tones[toast.tone].icon}
			class={cn('mt-0.5 size-4.5 shrink-0', tones[toast.tone].color)}
		/>
		<div class="flex min-w-0 flex-1 flex-col gap-0.5">
			<p class="text-sm font-medium text-fg">{toast.title}</p>
			{#if toast.description}
				<p class="text-xs text-muted">{toast.description}</p>
			{/if}
			{#if toast.action}
				<button
					type="button"
					onclick={toast.action.onclick}
					class="mt-1.5 self-start rounded-md text-xs font-semibold text-accent underline underline-offset-2 focus-visible:ring-focus"
				>
					{toast.action.label}
				</button>
			{/if}
		</div>
		<button
			type="button"
			aria-label="Dismiss {toast.title}"
			onclick={() => ondismiss?.(toast.id)}
			class="-mt-0.5 -mr-1 rounded-md p-1 text-muted hover:text-fg focus-visible:ring-focus"
		>
			<Icon name="x" class="size-3.5" />
		</button>
	</div>
{/snippet}

<div
	role="presentation"
	onpointerenter={onhold}
	onpointerleave={onresume}
	onfocusin={onhold}
	onfocusout={onresume}
	class={cn('pointer-events-none fixed z-60 flex flex-col gap-2', positions[position], klass)}
>
	<div role="region" aria-label="Notifications" class="contents">
		<div aria-live="assertive" aria-atomic="false" class="contents">
			{#each assertive as toast (toast.id)}
				{@render item(toast)}
			{/each}
		</div>
		<div aria-live="polite" aria-atomic="false" class="contents">
			{#each polite as toast (toast.id)}
				{@render item(toast)}
			{/each}
		</div>
	</div>
</div>
