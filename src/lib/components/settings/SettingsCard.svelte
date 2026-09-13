<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils/cn.js';

	interface Props {
		title?: string;
		description?: string;
		/** Muted strip at the bottom, usually for the save button. */
		footerNote?: string;
		class?: string;
		children: Snippet;
		footer?: Snippet;
	}

	let { title, description, footerNote, class: klass, children, footer }: Props = $props();
</script>

<section class={cn('rounded-xl bg-surface shadow-xs', klass)}>
	{#if title}
		<header class="flex flex-col gap-1 border-b border-border/60 px-5 py-4">
			<h3 class="text-sm font-semibold text-fg">{title}</h3>
			{#if description}
				<p class="text-sm text-muted">{description}</p>
			{/if}
		</header>
	{/if}

	<div class="px-5 py-4">{@render children()}</div>

	{#if footer || footerNote}
		<footer
			class="flex flex-col gap-3 rounded-b-xl border-t border-border/60 bg-subtle px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
		>
			<p class="text-xs text-muted">{footerNote ?? ''}</p>
			{#if footer}
				<div class="flex shrink-0 items-center gap-2">{@render footer()}</div>
			{/if}
		</footer>
	{/if}
</section>
