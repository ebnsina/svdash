<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { clickOutside } from '#lib/utils/actions.js';

	interface Props {
		open?: boolean;
		label: string;
		align?: 'start' | 'center' | 'end';
		placement?: 'bottom' | 'top';
		width?: string;
		class?: string;
		/** Renders the control that opens the popover. */
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
		children: Snippet<[{ close: () => void }]>;
	}

	let {
		open = $bindable(false),
		label,
		align = 'start',
		placement = 'bottom',
		width = 'w-72',
		class: klass,
		trigger,
		children
	}: Props = $props();

	const id = uid('popover');
	let rootEl = $state<HTMLElement | null>(null);

	const alignment = { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' };
	const side = { bottom: 'top-full mt-2', top: 'bottom-full mb-2' };

	function close(restoreFocus = true) {
		open = false;
		if (restoreFocus) rootEl?.querySelector<HTMLElement>('[aria-expanded]')?.focus();
	}

	let triggerProps = $derived({
		'aria-expanded': open,
		'aria-controls': id,
		'aria-haspopup': 'dialog',
		onclick: () => (open = !open),
		onkeydown: (e: KeyboardEvent) => {
			if (e.key === 'Escape' && open) close(false);
		}
	});
</script>

<div
	bind:this={rootEl}
	class={cn('relative inline-block', klass)}
	use:clickOutside={() => (open = false)}
>
	{@render trigger({ props: triggerProps })}

	{#if open}
		<div
			{id}
			role="dialog"
			tabindex="-1"
			aria-label={label}
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					e.stopPropagation();
					close();
				}
			}}
			class={cn(
				'absolute z-50 rounded-xl bg-surface p-4 shadow-lg',
				width,
				alignment[align],
				side[placement]
			)}
		>
			{@render children({ close })}
		</div>
	{/if}
</div>
