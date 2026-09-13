<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { clickOutside } from '#lib/utils/actions.js';

	export interface MenuItem {
		label: string;
		icon?: IconName;
		shortcut?: string;
		disabled?: boolean;
		destructive?: boolean;
		/** Makes this a checkable item (APG menuitemcheckbox) rather than a command. */
		checked?: boolean;
		/** Draws a divider above this item. */
		separatorBefore?: boolean;
		onselect?: () => void;
	}

	interface Props {
		open?: boolean;
		items: MenuItem[];
		label: string;
		align?: 'start' | 'end';
		width?: string;
		class?: string;
		trigger: Snippet<[{ props: Record<string, unknown> }]>;
	}

	let {
		open = $bindable(false),
		items,
		label,
		align = 'end',
		width = 'w-56',
		class: klass,
		trigger
	}: Props = $props();

	const id = uid('menu');
	let menuEl = $state<HTMLDivElement | null>(null);
	let triggerEl = $state<HTMLElement | null>(null);
	let activeIndex = $state(-1);

	let enabled = $derived(
		items.map((item, i) => ({ item, i })).filter(({ item }) => !item.disabled)
	);
	// Reserve the leading slot for every row once any row uses it, so labels line up.
	let hasLeading = $derived(items.some((item) => item.icon || item.checked !== undefined));

	function openMenu(index: number) {
		open = true;
		activeIndex = index;
		focusActive();
	}

	function closeMenu(restoreFocus = true) {
		open = false;
		activeIndex = -1;
		if (restoreFocus) triggerEl?.querySelector<HTMLElement>('button, [role="button"]')?.focus();
	}

	function focusActive() {
		tick().then(() => menuEl?.querySelector<HTMLElement>('[tabindex="0"]')?.focus());
	}

	function move(delta: number) {
		if (enabled.length === 0) return;
		const current = enabled.findIndex(({ i }) => i === activeIndex);
		const next = (current + delta + enabled.length) % enabled.length;
		activeIndex = enabled[next].i;
		focusActive();
	}

	function choose(item: MenuItem) {
		if (item.disabled) return;
		item.onselect?.();
		closeMenu();
	}

	function onMenuKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				move(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				move(-1);
				break;
			case 'Home':
				e.preventDefault();
				activeIndex = enabled[0]?.i ?? -1;
				focusActive();
				break;
			case 'End':
				e.preventDefault();
				activeIndex = enabled.at(-1)?.i ?? -1;
				focusActive();
				break;
			case 'Escape':
				e.preventDefault();
				closeMenu();
				break;
			case 'Tab':
				closeMenu(false);
				break;
		}
	}

	function onTriggerKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openMenu(enabled[0]?.i ?? -1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			openMenu(enabled.at(-1)?.i ?? -1);
		}
	}

	let triggerProps = $derived({
		'aria-haspopup': 'menu' as const,
		'aria-expanded': open,
		'aria-controls': id,
		onclick: () => (open ? closeMenu(false) : openMenu(enabled[0]?.i ?? -1)),
		onkeydown: onTriggerKeydown
	});
</script>

<div class={cn('relative inline-block', klass)} use:clickOutside={() => (open = false)}>
	<span bind:this={triggerEl} class="contents">{@render trigger({ props: triggerProps })}</span>

	{#if open}
		<div
			bind:this={menuEl}
			{id}
			role="menu"
			aria-label={label}
			tabindex="-1"
			onkeydown={onMenuKeydown}
			class={cn(
				'absolute top-full z-50 mt-1.5 rounded-xl bg-surface p-1 shadow-lg',
				width,
				align === 'end' ? 'right-0' : 'left-0'
			)}
		>
			{#each items as item, i (item.label)}
				{#if item.separatorBefore}
					<div role="separator" class="my-1 h-px bg-border"></div>
				{/if}
				<button
					type="button"
					role={item.checked === undefined ? 'menuitem' : 'menuitemcheckbox'}
					aria-checked={item.checked}
					tabindex={i === activeIndex ? 0 : -1}
					aria-disabled={item.disabled || undefined}
					onclick={() => choose(item)}
					onpointermove={() => !item.disabled && (activeIndex = i)}
					class={cn(
						'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm focus-visible:ring-focus-inset',
						item.disabled
							? 'cursor-not-allowed text-faint'
							: item.destructive
								? 'text-danger hover:bg-danger-soft'
								: 'text-fg hover:bg-subtle',
						i === activeIndex &&
							!item.disabled &&
							(item.destructive ? 'bg-danger-soft' : 'bg-subtle')
					)}
				>
					{#if hasLeading}
						<span class="flex size-4 shrink-0 items-center justify-center">
							{#if item.checked}
								<Icon name="check" class="size-4 text-accent" />
							{:else if item.icon && item.checked === undefined}
								<Icon name={item.icon} class="size-4 opacity-80" />
							{/if}
						</span>
					{/if}
					<span class="flex-1 truncate">{item.label}</span>
					{#if item.shortcut}
						<kbd class="font-mono text-2xs text-faint">{item.shortcut}</kbd>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
