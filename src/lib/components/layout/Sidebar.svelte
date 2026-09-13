<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import type { NavGroup } from './nav.js';

	interface Props {
		groups: NavGroup[];
		/** Id of the active nav item. */
		active?: string;
		collapsed?: boolean;
		productName?: string;
		label?: string;
		class?: string;
		onnavigate?: (id: string) => void;
		header?: Snippet<[{ collapsed: boolean }]>;
		footer?: Snippet<[{ collapsed: boolean }]>;
	}

	let {
		groups,
		active = $bindable(''),
		collapsed = $bindable(false),
		productName = 'Svdash',
		label = 'Main',
		class: klass,
		onnavigate,
		header,
		footer
	}: Props = $props();

	function go(id: string, disabled?: boolean) {
		if (disabled) return;
		active = id;
		onnavigate?.(id);
	}
</script>

<aside
	class={cn(
		'sticky top-0 flex h-dvh shrink-0 flex-col bg-surface transition-[width] duration-200',
		collapsed ? 'w-16' : 'w-60',
		klass
	)}
>
	<div class={cn('flex h-14 items-center', collapsed ? 'justify-center px-2' : 'gap-2 px-4')}>
		{#if header}
			{@render header({ collapsed })}
		{:else}
			<span
				class="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-fg"
			>
				<Icon name="brain" class="size-4.5" />
			</span>
			{#if !collapsed}
				<span class="truncate text-sm font-semibold text-fg">{productName}</span>
			{/if}
		{/if}
	</div>

	<nav aria-label={label} class="flex-1 overflow-y-auto px-2 py-3">
		{#each groups as group, gi (group.label ?? gi)}
			<div class={gi > 0 ? 'mt-5' : ''}>
				{#if group.label}
					<p
						class={cn(
							'px-2 pb-1.5 text-2xs font-semibold tracking-wide text-faint uppercase',
							collapsed && 'sr-only'
						)}
					>
						{group.label}
					</p>
				{/if}
				<ul class="flex flex-col gap-0.5">
					{#each group.items as item (item.id)}
						{@const on = item.id === active}
						<li>
							<a
								href={item.href ?? '#'}
								aria-current={on ? 'page' : undefined}
								aria-disabled={item.disabled || undefined}
								title={collapsed ? item.label : undefined}
								onclick={(e) => {
									if (!item.href || item.disabled) e.preventDefault();
									go(item.id, item.disabled);
								}}
								class={cn(
									'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors focus-visible:ring-focus',
									collapsed && 'justify-center px-0',
									item.disabled
										? 'cursor-not-allowed text-faint'
										: on
											? 'bg-accent-soft text-accent'
											: 'text-muted hover:bg-subtle hover:text-fg'
								)}
							>
								<Icon name={item.icon} class="size-4.5 shrink-0" />
								{#if collapsed}
									<span class="sr-only">{item.label}</span>
								{:else}
									<span class="flex-1 truncate">{item.label}</span>
									{#if item.badge !== undefined}
										<span
											class={cn(
												'rounded-full px-1.5 py-0.5 text-2xs font-semibold',
												on ? 'bg-accent text-accent-fg' : 'bg-subtle text-muted'
											)}
										>
											{item.badge}
										</span>
									{/if}
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>

	{#if footer}
		<div class={cn('p-2', collapsed && 'flex justify-center')}>
			{@render footer({ collapsed })}
		</div>
	{/if}
</aside>
