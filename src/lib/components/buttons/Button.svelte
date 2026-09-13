<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';
	import Spinner from './Spinner.svelte';
	import {
		base,
		variants,
		sizes,
		glyphSizes,
		type ButtonSize,
		type ButtonVariant
	} from './styles.js';

	interface Props extends Omit<
		HTMLButtonAttributes & HTMLAnchorAttributes,
		'type' | 'class' | 'href'
	> {
		variant?: ButtonVariant;
		size?: ButtonSize;
		type?: 'button' | 'submit' | 'reset';
		/** Renders an anchor instead of a button. */
		href?: string;
		disabled?: boolean;
		loading?: boolean;
		/** Announced while `loading` is true. */
		loadingLabel?: string;
		fullWidth?: boolean;
		iconLeft?: IconName;
		iconRight?: IconName;
		class?: string;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		type = 'button',
		href,
		disabled = false,
		loading = false,
		loadingLabel = 'Loading',
		fullWidth = false,
		iconLeft,
		iconRight,
		class: klass,
		children,
		...rest
	}: Props = $props();

	let inert = $derived(disabled || loading);
	let classes = $derived(cn(base, variants[variant], sizes[size], fullWidth && 'w-full', klass));
</script>

{#snippet inner()}
	{#if loading}
		<Spinner class={glyphSizes[size]} />
		<span class="sr-only">{loadingLabel}</span>
	{:else if iconLeft}
		<Icon name={iconLeft} class={glyphSizes[size]} />
	{/if}
	{@render children?.()}
	{#if iconRight && !loading}
		<Icon name={iconRight} class={glyphSizes[size]} />
	{/if}
{/snippet}

{#if href}
	<a
		{href}
		class={classes}
		aria-disabled={inert || undefined}
		tabindex={inert ? -1 : undefined}
		role="button"
		{...rest}
	>
		{@render inner()}
	</a>
{:else}
	<button {type} class={classes} disabled={inert} aria-busy={loading || undefined} {...rest}>
		{@render inner()}
	</button>
{/if}
