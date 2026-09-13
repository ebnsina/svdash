<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { trapFocus, lockScroll } from '#lib/utils/actions.js';
	import type { NavGroup } from './nav.js';

	interface Props {
		open?: boolean;
		groups: NavGroup[];
		active?: string;
		productName?: string;
		label?: string;
		class?: string;
		onnavigate?: (id: string) => void;
	}

	let {
		open = $bindable(false),
		groups,
		active = $bindable(''),
		productName = 'Svdash',
		label = 'Main',
		class: klass,
		onnavigate
	}: Props = $props();

	function go(item: { id: string; disabled?: boolean }) {
		if (item.disabled) return;
		active = item.id;
		onnavigate?.(item.id);
		open = false;
	}

	$effect(() => {
		if (open) return lockScroll();
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && open) open = false;
	}}
/>

{#if open}
	<div class="fixed inset-0 z-50 lg:hidden">
		<div
			class="absolute inset-0 bg-overlay backdrop-blur-sm"
			onclick={() => (open = false)}
			aria-hidden="true"
		></div>

		<div
			use:trapFocus
			role="dialog"
			aria-modal="true"
			aria-label="Navigation"
			class={cn(
				'absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-surface inset-safe shadow-lg',
				klass
			)}
		>
			<div class="flex h-14 items-center justify-between gap-2 px-4">
				<span class="flex items-center gap-2">
					<span class="flex size-8 items-center justify-center rounded-md bg-accent text-accent-fg">
						<Icon name="brain" class="size-4.5" />
					</span>
					<span class="text-sm font-semibold text-fg">{productName}</span>
				</span>
				<button
					type="button"
					onclick={() => (open = false)}
					aria-label="Close navigation"
					class="rounded-md p-1.5 text-muted hover:bg-subtle hover:text-fg focus-visible:ring-focus"
				>
					<Icon name="x" class="size-4" />
				</button>
			</div>

			<nav aria-label={label} class="flex-1 overflow-y-auto px-2 py-3">
				{#each groups as group, gi (group.label ?? gi)}
					<div class={gi > 0 ? 'mt-5' : ''}>
						{#if group.label}
							<p class="px-2 pb-1.5 text-2xs font-semibold tracking-wide text-faint uppercase">
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
										onclick={(e) => {
											if (!item.href || item.disabled) e.preventDefault();
											go(item);
										}}
										class={cn(
											'flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium focus-visible:ring-focus',
											item.disabled
												? 'cursor-not-allowed text-faint'
												: on
													? 'bg-accent-soft text-accent'
													: 'text-muted hover:bg-subtle hover:text-fg'
										)}
									>
										<Icon name={item.icon} class="size-4.5 shrink-0" />
										<span class="flex-1 truncate">{item.label}</span>
										{#if item.badge !== undefined}
											<span
												class="rounded-full bg-subtle px-1.5 py-0.5 text-2xs font-semibold text-muted"
											>
												{item.badge}
											</span>
										{/if}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</div>
	</div>
{/if}
