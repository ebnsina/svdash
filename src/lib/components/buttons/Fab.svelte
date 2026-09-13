<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';

	interface Props {
		icon?: IconName;
		label: string;
		/** Shows the label beside the icon from `sm` up. */
		extended?: boolean;
		position?: 'bottom-right' | 'bottom-left' | 'static';
		class?: string;
		onclick?: (e: MouseEvent) => void;
	}

	let {
		icon = 'plus',
		label,
		extended = false,
		position = 'bottom-right',
		class: klass,
		onclick
	}: Props = $props();

	const positions = {
		'bottom-right': 'fixed bottom-5 right-5 z-30',
		'bottom-left': 'fixed bottom-5 left-5 z-30',
		static: 'relative'
	};
</script>

<button
	type="button"
	aria-label={label}
	class={cn(
		'inline-flex h-13 items-center justify-center gap-2 rounded-full bg-accent text-accent-fg shadow-lg transition-colors hover:bg-accent-hover focus-visible:ring-focus',
		extended ? 'px-5' : 'w-13',
		positions[position],
		klass
	)}
	{onclick}
>
	<Icon name={icon} class="size-5.5" />
	{#if extended}
		<span class="hidden text-sm font-medium sm:inline">{label}</span>
	{/if}
</button>
