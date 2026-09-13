<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';

	export interface Crumb {
		label: string;
		href?: string;
	}

	interface Props {
		items: Crumb[];
		/** Collapses the middle when there are more items than this. */
		maxItems?: number;
		class?: string;
	}

	let { items, maxItems = 4, class: klass }: Props = $props();

	let collapsed = $derived(
		items.length > maxItems
			? [items[0], { label: '…' } as Crumb, ...items.slice(-(maxItems - 2))]
			: items
	);
</script>

<nav aria-label="Breadcrumb" class={cn('min-w-0', klass)}>
	<ol class="flex min-w-0 flex-wrap items-center gap-1 text-sm">
		{#each collapsed as item, i (item.label + i)}
			<li class="flex min-w-0 items-center gap-1">
				{#if i > 0}
					<Icon name="chevron-right" class="size-3.5 shrink-0 text-faint" />
				{/if}

				{#if item.label === '…'}
					<span class="px-1 text-faint" aria-hidden="true">…</span>
				{:else if i === collapsed.length - 1}
					<span aria-current="page" class="truncate font-medium text-fg">{item.label}</span>
				{:else if item.href}
					<a
						href={item.href}
						class="truncate rounded-xs text-muted hover:text-fg hover:underline focus-visible:ring-focus"
					>
						{item.label}
					</a>
				{:else}
					<span class="truncate text-muted">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
