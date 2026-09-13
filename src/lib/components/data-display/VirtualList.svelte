<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { createVirtualizer } from '@tanstack/svelte-virtual';
	import { get } from 'svelte/store';
	import { untrack } from 'svelte';
	import { cn } from '#lib/utils/cn.js';

	interface Props {
		items: T[];
		/** Names the list for assistive tech. */
		label: string;
		/** Approximate row height in px; measured rows correct it. */
		estimateSize?: number;
		height?: string;
		overscan?: number;
		class?: string;
		row: Snippet<[{ item: T; index: number }]>;
		empty?: Snippet;
	}

	let {
		items,
		label,
		estimateSize = 56,
		height = 'h-96',
		overscan = 8,
		class: klass,
		row,
		empty
	}: Props = $props();

	let scrollEl = $state<HTMLDivElement | null>(null);

	const virtualizer = createVirtualizer<HTMLDivElement, HTMLLIElement>({
		count: 0,
		getScrollElement: () => scrollEl,
		estimateSize: () => estimateSize,
		overscan: untrack(() => overscan)
	});

	$effect(() => {
		const count = items.length;
		untrack(() => get(virtualizer)).setOptions({
			count,
			getScrollElement: () => scrollEl,
			estimateSize: () => estimateSize,
			overscan
		});
	});

	let virtualItems = $derived($virtualizer.getVirtualItems());
</script>

{#if items.length === 0 && empty}
	{@render empty()}
{:else}
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		bind:this={scrollEl}
		tabindex="0"
		role="region"
		aria-label={label}
		class={cn('overflow-y-auto focus-visible:ring-focus', height, klass)}
	>
		<!-- Only the visible window is in the DOM; the list still reports its true
		     length so screen readers announce "n of total" correctly. -->
		<ul role="list" style:height="{$virtualizer.getTotalSize()}px" class="relative w-full">
			{#each virtualItems as virtualRow (virtualRow.key)}
				<li
					role="listitem"
					aria-setsize={items.length}
					aria-posinset={virtualRow.index + 1}
					data-index={virtualRow.index}
					style:transform="translateY({virtualRow.start}px)"
					class="absolute top-0 left-0 w-full"
				>
					{@render row({ item: items[virtualRow.index], index: virtualRow.index })}
				</li>
			{/each}
		</ul>
	</div>
{/if}
