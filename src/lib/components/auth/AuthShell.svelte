<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';

	interface Props {
		title: string;
		description?: string;
		productName?: string;
		/** Line under the card, usually "already have an account?". */
		class?: string;
		children: Snippet;
		footer?: Snippet;
	}

	let {
		title,
		description,
		productName = 'Svdash',
		class: klass,
		children,
		footer
	}: Props = $props();
</script>

<div class={cn('flex min-h-dvh flex-col items-center justify-center bg-canvas px-4 py-10', klass)}>
	<div class="w-full max-w-sm">
		<div class="mb-7 flex flex-col items-center gap-3 text-center">
			<span class="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-fg">
				<Icon name="brain" class="size-5.5" />
			</span>
			<div class="flex flex-col gap-1.5">
				<h1 class="text-xl font-semibold tracking-tight font-display text-fg">{title}</h1>
				{#if description}
					<p class="text-sm text-muted">{description}</p>
				{/if}
			</div>
		</div>

		<div class="rounded-xl bg-surface p-6 shadow-md">
			{@render children()}
		</div>

		{#if footer}
			<p class="mt-5 text-center text-sm text-muted">{@render footer()}</p>
		{/if}

		<p class="mt-8 text-center text-xs text-faint">
			{productName} — no trackers, no dark patterns.
		</p>
	</div>
</div>
