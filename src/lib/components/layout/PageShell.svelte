<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils/cn.js';

	interface Props {
		title: string;
		description?: string;
		/** Container width; `full` fills the viewport. */
		width?: 'md' | 'lg' | 'full';
		/** Removes the page header entirely. */
		bare?: boolean;
		class?: string;
		actions?: Snippet;
		children: Snippet;
	}

	let {
		title,
		description,
		width = 'lg',
		bare = false,
		class: klass,
		actions,
		children
	}: Props = $props();

	const widths = { md: 'max-w-3xl', lg: 'max-w-7xl', full: 'max-w-none' };
</script>

<main class={cn('flex-1 bg-canvas', klass)}>
	<div class={cn('mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8', widths[width])}>
		{#if !bare}
			<!-- Title and description lead; actions sit opposite them. -->
			<div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between lg:mb-8">
				<div class="flex min-w-0 flex-col gap-1">
					<h1 class="text-xl font-semibold tracking-tight font-display text-fg sm:text-2xl">
						{title}
					</h1>
					{#if description}
						<p class="max-w-2xl text-sm text-muted">{description}</p>
					{/if}
				</div>
				{#if actions}
					<div class="flex shrink-0 flex-wrap items-center gap-2">{@render actions()}</div>
				{/if}
			</div>
		{/if}

		{@render children()}
	</div>
</main>
