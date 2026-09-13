<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';

	interface Props {
		title: string;
		description?: string;
		icon?: IconName;
		size?: 'sm' | 'md';
		/** Renders inside a dashed card rather than bare. */
		bordered?: boolean;
		class?: string;
		actions?: Snippet;
	}

	let {
		title,
		description,
		icon = 'inbox',
		size = 'md',
		bordered = true,
		class: klass,
		actions
	}: Props = $props();
</script>

<div
	class={cn(
		'flex flex-col items-center justify-center text-center',
		size === 'sm' ? 'gap-2 px-4 py-8' : 'gap-3 px-6 py-14',
		bordered && 'rounded-lg border border-dashed border-border bg-surface',
		klass
	)}
>
	<span
		class={cn(
			'flex items-center justify-center rounded-full bg-subtle text-faint',
			size === 'sm' ? 'size-9' : 'size-12'
		)}
	>
		<Icon name={icon} class={size === 'sm' ? 'size-4.5' : 'size-6'} />
	</span>
	<p class={cn('font-semibold text-fg', size === 'sm' ? 'text-sm' : 'text-base')}>{title}</p>
	{#if description}
		<p class="max-w-sm text-sm text-muted">{description}</p>
	{/if}
	{#if actions}
		<div class="mt-2 flex flex-wrap items-center justify-center gap-2">{@render actions()}</div>
	{/if}
</div>
