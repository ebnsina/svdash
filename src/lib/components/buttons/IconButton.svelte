<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';
	import Spinner from './Spinner.svelte';
	import {
		base,
		variants,
		iconSizes,
		glyphSizes,
		type ButtonSize,
		type ButtonVariant
	} from './styles.js';

	interface Props extends Omit<HTMLButtonAttributes, 'type' | 'class'> {
		icon: IconName;
		/** Required — an icon-only control has no visible name. */
		label: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		loading?: boolean;
		pressed?: boolean;
		expanded?: boolean;
		controls?: string;
		haspopup?: 'menu' | 'dialog' | 'listbox' | 'true';
		class?: string;
	}

	// `...rest` matters: menu and popover triggers hand their ARIA wiring and key
	// handlers to this component via a spread, and named props alone would drop them.
	let {
		icon,
		label,
		variant = 'ghost',
		size = 'md',
		type = 'button',
		disabled = false,
		loading = false,
		pressed,
		expanded,
		controls,
		haspopup,
		class: klass,
		...rest
	}: Props = $props();
</script>

<button
	{type}
	class={cn(base, variants[variant], iconSizes[size], 'hit-area', klass)}
	disabled={disabled || loading}
	aria-label={label}
	aria-pressed={pressed}
	aria-expanded={expanded}
	aria-controls={controls}
	aria-haspopup={haspopup}
	aria-busy={loading || undefined}
	{...rest}
>
	{#if loading}
		<Spinner class={glyphSizes[size]} />
	{:else}
		<Icon name={icon} class={glyphSizes[size]} />
	{/if}
</button>
