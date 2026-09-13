<script lang="ts">
	import { tick } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { lockScroll } from '#lib/utils/actions.js';

	export interface Command {
		id: string;
		label: string;
		group?: string;
		icon?: IconName;
		shortcut?: string;
		keywords?: string;
		onselect?: () => void;
	}

	interface Props {
		open?: boolean;
		commands: Command[];
		placeholder?: string;
		emptyMessage?: string;
		/** Set false to wire your own shortcut. */
		hotkey?: boolean;
		class?: string;
		onselect?: (command: Command) => void;
	}

	let {
		open = $bindable(false),
		commands,
		placeholder = 'Search commands…',
		emptyMessage = 'No matching commands',
		hotkey = true,
		class: klass,
		onselect
	}: Props = $props();

	const id = uid('cmdk');
	let query = $state('');
	let activeIndex = $state(0);
	let inputEl = $state<HTMLInputElement | null>(null);
	let listEl = $state<HTMLDivElement | null>(null);
	let restoreTo: HTMLElement | null = null;

	let filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return commands;
		return commands.filter((c) =>
			`${c.label} ${c.group ?? ''} ${c.keywords ?? ''}`.toLowerCase().includes(q)
		);
	});

	// Preserve group order while keeping a single flat index for the roving selection.
	let groups = $derived.by(() => {
		const map = new Map<string, Command[]>();
		for (const command of filtered) {
			const key = command.group ?? 'Commands';
			map.set(key, [...(map.get(key) ?? []), command]);
		}
		return [...map.entries()];
	});

	function close() {
		open = false;
		query = '';
		activeIndex = 0;
		restoreTo?.focus();
	}

	function run(command: Command) {
		command.onselect?.();
		onselect?.(command);
		close();
	}

	function move(delta: number) {
		if (filtered.length === 0) return;
		activeIndex = (activeIndex + delta + filtered.length) % filtered.length;
		tick().then(() =>
			listEl?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' })
		);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			move(1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			move(-1);
		} else if (e.key === 'Home') {
			e.preventDefault();
			activeIndex = 0;
		} else if (e.key === 'End') {
			e.preventDefault();
			activeIndex = filtered.length - 1;
		} else if (e.key === 'Enter' && filtered[activeIndex]) {
			e.preventDefault();
			run(filtered[activeIndex]);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			close();
		}
	}

	function onGlobalKeydown(e: KeyboardEvent) {
		if (hotkey && e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}

	$effect(() => {
		if (!open) return;
		restoreTo = document.activeElement as HTMLElement | null;
		tick().then(() => inputEl?.focus());
		return lockScroll();
	});
</script>

<svelte:window onkeydown={onGlobalKeydown} />

{#if open}
	<div class="fixed inset-0 z-60 flex items-start justify-center p-4 pt-[10vh]">
		<div
			class="absolute inset-0 bg-overlay backdrop-blur-sm"
			onclick={close}
			aria-hidden="true"
		></div>

		<div
			role="dialog"
			aria-modal="true"
			aria-label="Command palette"
			class={cn(
				'relative flex w-full max-w-xl flex-col overflow-hidden rounded-xl bg-surface shadow-lg',
				klass
			)}
		>
			<div class="flex items-center gap-3 border-b border-border/60 px-4">
				<Icon name="search" class="size-4 shrink-0 text-faint" />
				<!-- APG combobox: the input owns the listbox and reports the active option. -->
				<input
					bind:this={inputEl}
					{id}
					type="text"
					role="combobox"
					autocomplete="off"
					spellcheck="false"
					{placeholder}
					bind:value={query}
					oninput={() => (activeIndex = 0)}
					onkeydown={onKeydown}
					aria-expanded="true"
					aria-controls="{id}-listbox"
					aria-autocomplete="list"
					aria-activedescendant={filtered[activeIndex] ? `${id}-opt-${activeIndex}` : undefined}
					aria-label="Search commands"
					class="h-12 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-faint"
				/>
				<kbd
					class="hidden rounded-xs border border-border px-1.5 py-0.5 font-mono text-2xs text-faint sm:block"
				>
					Esc
				</kbd>
			</div>

			<div
				bind:this={listEl}
				id="{id}-listbox"
				role={filtered.length > 0 ? 'listbox' : undefined}
				aria-label={filtered.length > 0 ? 'Commands' : undefined}
				class="max-h-80 overflow-y-auto p-2"
			>
				{#if filtered.length === 0}
					<p class="px-3 py-8 text-center text-sm text-muted" role="status">{emptyMessage}</p>
				{:else}
					{#each groups as [group, items] (group)}
						<div role="group" aria-label={group}>
							<p class="px-2 pt-2 pb-1 text-2xs font-semibold tracking-wide text-faint uppercase">
								{group}
							</p>
							{#each items as command (command.id)}
								{@const index = filtered.indexOf(command)}
								<div
									id="{id}-opt-{index}"
									role="option"
									tabindex="-1"
									aria-selected={index === activeIndex}
									data-index={index}
									onpointerdown={(e) => {
										e.preventDefault();
										run(command);
									}}
									onpointermove={() => (activeIndex = index)}
									class={cn(
										'flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-sm',
										index === activeIndex ? 'bg-subtle text-fg' : 'text-muted'
									)}
								>
									{#if command.icon}
										<Icon name={command.icon} class="size-4 shrink-0" />
									{/if}
									<span class="flex-1 truncate">{command.label}</span>
									{#if command.shortcut}
										<kbd class="font-mono text-2xs text-faint">{command.shortcut}</kbd>
									{/if}
								</div>
							{/each}
						</div>
					{/each}
				{/if}
			</div>

			<div
				class="hidden items-center gap-4 border-t border-border/60 px-4 py-2 text-2xs text-faint sm:flex"
			>
				<span><kbd class="font-mono">↑↓</kbd> navigate</span>
				<span><kbd class="font-mono">↵</kbd> run</span>
				<span><kbd class="font-mono">esc</kbd> close</span>
			</div>
		</div>
	</div>
{/if}
