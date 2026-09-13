<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';

	export interface SettingsSection {
		id: string;
		label: string;
		icon?: IconName;
		description?: string;
	}

	interface Props {
		sections: SettingsSection[];
		active?: string;
		title?: string;
		description?: string;
		label?: string;
		class?: string;
		onnavigate?: (id: string) => void;
		children: Snippet<[{ section: SettingsSection }]>;
	}

	let {
		sections,
		active = $bindable(sections[0]?.id ?? ''),
		title = 'Settings',
		description,
		label = 'Settings sections',
		class: klass,
		onnavigate,
		children
	}: Props = $props();

	let current = $derived(sections.find((s) => s.id === active) ?? sections[0]);

	function go(id: string) {
		active = id;
		onnavigate?.(id);
	}
</script>

<div class={cn('mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-8', klass)}>
	<div class="mb-6 flex flex-col gap-1 lg:mb-8">
		<h1 class="text-xl font-semibold tracking-tight font-display text-fg sm:text-2xl">{title}</h1>
		{#if description}
			<p class="text-sm text-muted">{description}</p>
		{/if}
	</div>

	<div class="flex flex-col gap-6 lg:flex-row lg:gap-10">
		<!-- Horizontal and scrollable on small screens, a rail from lg up. -->
		<nav aria-label={label} class="lg:w-56 lg:shrink-0">
			<ul
				class="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
			>
				{#each sections as section (section.id)}
					{@const on = section.id === active}
					<li class="shrink-0 lg:shrink">
						<a
							href="#{section.id}"
							aria-current={on ? 'page' : undefined}
							onclick={(e) => {
								e.preventDefault();
								go(section.id);
							}}
							class={cn(
								'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-focus',
								on ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-subtle hover:text-fg'
							)}
						>
							{#if section.icon}
								<Icon name={section.icon} class="size-4 shrink-0" />
							{/if}
							{section.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="min-w-0 flex-1">
			{#if current}
				<div class="mb-5 flex flex-col gap-1">
					<h2 class="text-base font-semibold text-fg">{current.label}</h2>
					{#if current.description}
						<p class="text-sm text-muted">{current.description}</p>
					{/if}
				</div>
				<div class="flex flex-col gap-6">{@render children({ section: current })}</div>
			{/if}
		</div>
	</div>
</div>
