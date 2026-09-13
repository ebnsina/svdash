<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';

	interface Props {
		page?: number;
		totalPages: number;
		/** Total row count, for the "showing x of y" summary. */
		totalItems?: number;
		pageSize?: number;
		/** Page numbers either side of the current page. Numbered variant only. */
		siblings?: number;
		/**
		 * `numbered` lists page numbers; `compact` is just the range and prev/next.
		 * Compact suits tables where filtering, not paging, is how people navigate.
		 */
		variant?: 'numbered' | 'compact';
		label?: string;
		class?: string;
		onchange?: (page: number) => void;
	}

	let {
		page = $bindable(1),
		totalPages,
		totalItems,
		pageSize = 10,
		siblings = 1,
		variant = 'numbered',
		label = 'Pagination',
		class: klass,
		onchange
	}: Props = $props();

	const nf = new Intl.NumberFormat('en-US');

	let pages = $derived.by(() => {
		const out: (number | 'gap')[] = [];
		const from = Math.max(2, page - siblings);
		const to = Math.min(totalPages - 1, page + siblings);
		out.push(1);
		if (from > 2) out.push('gap');
		for (let i = from; i <= to; i += 1) out.push(i);
		if (to < totalPages - 1) out.push('gap');
		if (totalPages > 1) out.push(totalPages);
		return out;
	});

	let rangeStart = $derived((page - 1) * pageSize + 1);
	let rangeEnd = $derived(Math.min(page * pageSize, totalItems ?? page * pageSize));

	function go(next: number) {
		const clamped = Math.min(totalPages, Math.max(1, next));
		if (clamped === page) return;
		page = clamped;
		onchange?.(clamped);
	}

	const btn =
		'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-40';
</script>

<nav
	aria-label={label}
	class={cn('flex flex-col items-center justify-between gap-3 sm:flex-row', klass)}
>
	{#if variant === 'numbered'}
		{#if totalItems !== undefined}
			<p class="text-xs text-muted">
				Showing <span class="font-medium text-fg"
					>{nf.format(rangeStart)}–{nf.format(rangeEnd)}</span
				>
				of <span class="font-medium text-fg">{nf.format(totalItems)}</span>
			</p>
		{/if}

		<ul class="flex items-center gap-1.5">
			<li>
				<button
					type="button"
					class={cn(btn, 'text-muted hover:bg-subtle hover:text-fg')}
					disabled={page === 1}
					onclick={() => go(page - 1)}
				>
					<Icon name="chevron-left" class="size-4" />
					<span class="sr-only">Previous page</span>
				</button>
			</li>

			{#each pages as item, i (String(item) + i)}
				<li>
					{#if item === 'gap'}
						<span class="px-1 text-sm text-faint" aria-hidden="true">…</span>
					{:else}
						<button
							type="button"
							aria-current={item === page ? 'page' : undefined}
							aria-label="Page {item}"
							onclick={() => go(item)}
							class={cn(
								btn,
								item === page
									? 'bg-accent text-accent-fg'
									: 'text-muted hover:bg-subtle hover:text-fg'
							)}
						>
							{item}
						</button>
					{/if}
				</li>
			{/each}

			<li>
				<button
					type="button"
					class={cn(btn, 'text-muted hover:bg-subtle hover:text-fg')}
					disabled={page === totalPages}
					onclick={() => go(page + 1)}
				>
					<span class="sr-only">Next page</span>
					<Icon name="chevron-right" class="size-4" />
				</button>
			</li>
		</ul>
	{:else}
		<div class="flex items-center gap-2 sm:ml-auto">
			{#if totalItems !== undefined}
				<p class="font-mono text-xs text-muted tabular-nums">
					{nf.format(rangeStart)}–{nf.format(rangeEnd)} of {nf.format(totalItems)}
				</p>
			{/if}
			<button
				type="button"
				class={cn(btn, 'text-muted hover:bg-subtle hover:text-fg')}
				disabled={page === 1}
				onclick={() => go(page - 1)}
			>
				<Icon name="chevron-left" class="size-4" />
				<span class="sr-only">Previous page</span>
			</button>
			<button
				type="button"
				class={cn(btn, 'text-muted hover:bg-subtle hover:text-fg')}
				disabled={page === totalPages}
				onclick={() => go(page + 1)}
			>
				<span class="sr-only">Next page</span>
				<Icon name="chevron-right" class="size-4" />
			</button>
		</div>
	{/if}

	<span class="sr-only" role="status" aria-live="polite">Page {page} of {totalPages}</span>
</nav>
