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
		size?: 'sm' | 'md' | 'lg' | 'xl';
		/** Set false for flows the user must not dismiss accidentally. */
		dismissible?: boolean;
		class?: string;
		onclose?: () => void;
		children: Snippet;
		footer?: Snippet;
	}

	let {
		open = $bindable(false),
		title,
		description,
		size = 'md',
		dismissible = true,
		class: klass,
		onclose,
		children,
		footer
	}: Props = $props();

	const id = uid('modal');
	const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

	function close() {
		open = false;
		onclose?.();
	}

	$effect(() => {
		if (!open) return;
		const unlock = lockScroll();
		return unlock;
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && open && dismissible) {
			e.preventDefault();
			close();
		}
	}}
/>

{#if open}
	<div class="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
		<div
			class="absolute inset-0 bg-overlay backdrop-blur-sm"
			onclick={() => dismissible && close()}
			aria-hidden="true"
		></div>

		<div
			use:trapFocus
			role="dialog"
			aria-modal="true"
			aria-labelledby="{id}-title"
			aria-describedby={description ? `${id}-description` : undefined}
			class={cn(
				'relative flex max-h-[90dvh] w-full flex-col rounded-t-xl bg-surface shadow-lg sm:rounded-xl',
				sizes[size],
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
				{#if dismissible}
					<button
						type="button"
						onclick={close}
						aria-label="Close dialog"
						class="-mt-1 -mr-1 rounded-md p-1.5 text-muted hover:bg-subtle hover:text-fg focus-visible:ring-focus"
					>
						<Icon name="x" class="size-4" />
					</button>
				{/if}
			</header>

			<div class="flex-1 overflow-y-auto px-5 py-4 text-sm text-fg">
				{@render children()}
			</div>

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
