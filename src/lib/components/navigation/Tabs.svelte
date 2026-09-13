<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';

	export interface Tab {
		id: string;
		label: string;
		icon?: IconName;
		badge?: string | number;
		disabled?: boolean;
	}

	interface Props {
		tabs: Tab[];
		value?: string;
		variant?: 'underline' | 'pill' | 'segmented';
		size?: 'sm' | 'md';
		fullWidth?: boolean;
		label?: string;
		class?: string;
		/** Panel content for the active tab. */
		panel?: Snippet<[{ tab: Tab }]>;
	}

	let {
		tabs,
		value = $bindable(tabs[0]?.id ?? ''),
		variant = 'underline',
		size = 'md',
		fullWidth = false,
		label = 'Sections',
		class: klass,
		panel
	}: Props = $props();

	const id = uid('tabs');
	let listEl = $state<HTMLDivElement | null>(null);

	let enabled = $derived(tabs.filter((t) => !t.disabled));
	let active = $derived(tabs.find((t) => t.id === value) ?? tabs[0]);

	// APG tabs: roving tabindex, automatic activation on arrow keys.
	function select(next: Tab | undefined) {
		if (!next || next.disabled) return;
		value = next.id;
		tick().then(() => listEl?.querySelector<HTMLElement>('[tabindex="0"]')?.focus());
	}

	function onKeydown(e: KeyboardEvent) {
		const i = enabled.findIndex((t) => t.id === value);
		const keys: Record<string, Tab | undefined> = {
			ArrowRight: enabled[(i + 1) % enabled.length],
			ArrowLeft: enabled[(i - 1 + enabled.length) % enabled.length],
			Home: enabled[0],
			End: enabled.at(-1)
		};
		if (e.key in keys) {
			e.preventDefault();
			select(keys[e.key]);
		}
	}

	const listStyles = {
		underline: 'gap-1 border-b border-border/60',
		pill: 'gap-1',
		segmented: 'gap-1 rounded-md border border-border bg-subtle p-1'
	};
	const tabStyles = {
		underline: (on: boolean) =>
			cn(
				'-mb-px border-b-2 px-3',
				on
					? 'border-accent text-fg'
					: 'border-transparent text-muted hover:border-border-strong hover:text-fg'
			),
		pill: (on: boolean) =>
			cn(
				'rounded-full px-3.5',
				on ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-subtle hover:text-fg'
			),
		segmented: (on: boolean) =>
			cn('flex-1 rounded-sm px-3', on ? 'bg-surface text-fg shadow-xs' : 'text-muted hover:text-fg')
	};
</script>

<div class={cn('flex flex-col', klass)}>
	<div
		bind:this={listEl}
		role="tablist"
		tabindex="-1"
		aria-label={label}
		onkeydown={onKeydown}
		class={cn('flex overflow-x-auto', listStyles[variant], fullWidth && '[&>button]:flex-1')}
	>
		{#each tabs as tab (tab.id)}
			{@const on = tab.id === value}
			<button
				type="button"
				role="tab"
				id="{id}-tab-{tab.id}"
				aria-selected={on}
				aria-controls={panel ? `${id}-panel` : undefined}
				tabindex={on ? 0 : -1}
				disabled={tab.disabled}
				onclick={() => select(tab)}
				class={cn(
					'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-40',
					size === 'sm' ? 'h-8 text-xs' : 'h-10 text-sm',
					tabStyles[variant](on)
				)}
			>
				{#if tab.icon}
					<Icon name={tab.icon} class="size-4" />
				{/if}
				{tab.label}
				{#if tab.badge !== undefined}
					<span
						class={cn(
							'rounded-full px-1.5 py-0.5 text-2xs font-semibold',
							on ? 'bg-accent text-accent-fg' : 'bg-subtle text-muted'
						)}
					>
						{tab.badge}
					</span>
				{/if}
			</button>
		{/each}
	</div>

	{#if panel && active}
		<div
			id="{id}-panel"
			role="tabpanel"
			tabindex="0"
			aria-labelledby="{id}-tab-{active.id}"
			class="pt-4 focus-visible:ring-focus"
		>
			{@render panel({ tab: active })}
		</div>
	{/if}
</div>
