<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';

	type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

	interface Props {
		tone?: Tone;
		variant?: 'soft' | 'outline' | 'solid';
		size?: 'sm' | 'md';
		icon?: IconName;
		/** Shows a small filled dot before the label. */
		dot?: boolean;
		/** Renders a remove button with an accessible name. */
		onremove?: () => void;
		class?: string;
		children: Snippet;
	}

	let {
		tone = 'neutral',
		variant = 'soft',
		size = 'sm',
		icon,
		dot = false,
		onremove,
		class: klass,
		children
	}: Props = $props();

	const soft: Record<Tone, string> = {
		neutral: 'bg-subtle text-muted',
		accent: 'bg-accent-soft text-accent',
		success: 'bg-success-soft text-success',
		warning: 'bg-warn-soft text-warn',
		danger: 'bg-danger-soft text-danger',
		info: 'bg-info-soft text-info'
	};
	const outline: Record<Tone, string> = {
		neutral: 'border border-border text-muted',
		accent: 'border border-accent/40 text-accent',
		success: 'border border-success/40 text-success',
		warning: 'border border-warn/40 text-warn',
		danger: 'border border-danger/40 text-danger',
		info: 'border border-info/40 text-info'
	};
	const solid: Record<Tone, string> = {
		neutral: 'bg-fg text-canvas',
		accent: 'bg-accent text-accent-fg',
		success: 'bg-success text-on-solid',
		warning: 'bg-warn text-on-solid',
		danger: 'bg-danger text-on-solid',
		info: 'bg-info text-on-solid'
	};
	const dots: Record<Tone, string> = {
		neutral: 'bg-faint',
		accent: 'bg-accent',
		success: 'bg-success',
		warning: 'bg-warn',
		danger: 'bg-danger',
		info: 'bg-info'
	};
</script>

<span
	class={cn(
		'inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap',
		size === 'sm' ? 'px-2 py-0.5 text-2xs' : 'px-2.5 py-1 text-xs',
		{ soft, outline, solid }[variant][tone],
		klass
	)}
>
	{#if dot}
		<span
			aria-hidden="true"
			class={cn('size-1.5 rounded-full', variant === 'solid' ? 'bg-current' : dots[tone])}
		></span>
	{/if}
	{#if icon}
		<Icon name={icon} class="size-3" />
	{/if}
	{@render children()}
	{#if onremove}
		<button
			type="button"
			onclick={onremove}
			aria-label="Remove"
			class="-mr-0.5 rounded-full p-0.5 hover:bg-black/10 focus-visible:ring-focus dark:hover:bg-white/10"
		>
			<Icon name="x" class="size-2.5" strokeWidth={2.5} />
		</button>
	{/if}
</span>
