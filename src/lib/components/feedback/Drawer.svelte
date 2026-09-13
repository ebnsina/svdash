<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { trapFocus, lockScroll } from '#lib/utils/actions.js';

	interface Props {
		open?: boolean;
		title: string;
		description?: string;
		side?: 'right' | 'left' | 'bottom';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		onclose?: () => void;
		children: Snippet;
		footer?: Snippet;
	}

	let {
		open = $bindable(false),
		title,
		description,
		side = 'right',
		size = 'md',
		class: klass,
		onclose,
		children,
		footer
	}: Props = $props();

	const id = uid('drawer');
	const widths = { sm: 'sm:max-w-sm', md: 'sm:max-w-md', lg: 'sm:max-w-xl' };
	const placement = {
		right: 'inset-y-0 right-0 w-full',
		left: 'inset-y-0 left-0 w-full',
		bottom: 'inset-x-0 bottom-0 max-h-[85dvh] rounded-t-xl inset-safe'
	};

	function close() {
		open = false;
		onclose?.();
	}

	$effect(() => {
		if (open) return lockScroll();
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && open) {
			e.preventDefault();
			close();
		}
	}}
/>

{#if open}
	<div class="fixed inset-0 z-50">
		<div
			class="absolute inset-0 bg-overlay backdrop-blur-sm"
			onclick={close}
			aria-hidden="true"
		></div>
		<div
			use:trapFocus
			role="dialog"
			aria-modal="true"
			aria-labelledby="{id}-title"
			aria-describedby={description ? `${id}-description` : undefined}
			class={cn(
				'absolute flex flex-col bg-surface shadow-lg',
				placement[side],
				side !== 'bottom' && widths[size],
				klass
			)}
		>
			<header class="flex items-start justify-between gap-4 border-b border-border/60 px-5 py-4">
				<div class="flex flex-col gap-1">
					<h2 id="{id}-title" class="text-base font-semibold text-fg">{title}</h2>
					{#if description}
						<p id="{id}-description" class="text-sm text-muted">{description}</p>
					{/if}
				</div>
				<button
					type="button"
					onclick={close}
					aria-label="Close panel"
					class="-mt-1 -mr-1 rounded-md p-1.5 text-muted hover:bg-subtle hover:text-fg focus-visible:ring-focus"
				>
					<Icon name="x" class="size-4" />
				</button>
			</header>

			<div class="flex-1 overflow-y-auto px-5 py-4 text-sm text-fg">{@render children()}</div>

			{#if footer}
				<footer
					class="flex flex-col-reverse gap-2 border-t border-border/60 px-5 py-4 sm:flex-row sm:justify-end"
				>
					{@render footer()}
				</footer>
			{/if}
		</div>
	</div>
{/if}
