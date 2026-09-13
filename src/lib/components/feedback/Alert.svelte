<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';

	type Tone = 'info' | 'success' | 'warning' | 'error';

	interface Props {
		tone?: Tone;
		title?: string;
		/** Full-width banner styling instead of a rounded card. */
		banner?: boolean;
		dismissible?: boolean;
		class?: string;
		ondismiss?: () => void;
		children: Snippet;
		actions?: Snippet;
	}

	let {
		tone = 'info',
		title,
		banner = false,
		dismissible = false,
		class: klass,
		ondismiss,
		children,
		actions
	}: Props = $props();

	let visible = $state(true);

	const styles: Record<Tone, { wrap: string; icon: string; glyph: IconName }> = {
		info: { wrap: 'border-info/40 bg-info-soft', icon: 'text-info', glyph: 'info' },
		success: {
			wrap: 'border-success/40 bg-success-soft',
			icon: 'text-success',
			glyph: 'check-circle'
		},
		warning: { wrap: 'border-warn/40 bg-warn-soft', icon: 'text-warn', glyph: 'alert-triangle' },
		error: { wrap: 'border-danger/40 bg-danger-soft', icon: 'text-danger', glyph: 'alert-circle' }
	};

	// Errors and warnings interrupt; info and success are polite.
	let role = $derived(tone === 'error' || tone === 'warning' ? 'alert' : 'status');
</script>

{#if visible}
	<div
		{role}
		class={cn(
			'flex items-start gap-3 border px-4 py-3 text-sm',
			banner ? 'rounded-none border-x-0' : 'rounded-lg',
			styles[tone].wrap,
			klass
		)}
	>
		<Icon name={styles[tone].glyph} class={cn('mt-0.5 size-4.5 shrink-0', styles[tone].icon)} />
		<div class="flex min-w-0 flex-1 flex-col gap-1">
			{#if title}
				<p class="font-semibold text-fg">{title}</p>
			{/if}
			<div class="text-muted">{@render children()}</div>
			{#if actions}
				<div class="mt-1.5 flex flex-wrap gap-2">{@render actions()}</div>
			{/if}
		</div>
		{#if dismissible}
			<button
				type="button"
				aria-label="Dismiss message"
				onclick={() => {
					visible = false;
					ondismiss?.();
				}}
				class="-mt-0.5 -mr-1 rounded-md p-1 text-muted hover:text-fg focus-visible:ring-focus"
			>
				<Icon name="x" class="size-4" />
			</button>
		{/if}
	</div>
{/if}
