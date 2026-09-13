<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils/cn.js';

	interface Props {
		/** Labels the group for assistive tech. */
		label: string;
		orientation?: 'horizontal' | 'vertical';
		class?: string;
		children: Snippet;
	}

	let { label, orientation = 'horizontal', class: klass, children }: Props = $props();
</script>

<!-- Children are joined visually; each keeps its own accessible name. -->
<div
	role="group"
	aria-label={label}
	class={cn(
		'isolate inline-flex',
		orientation === 'vertical' ? 'flex-col' : 'flex-row',
		orientation === 'vertical'
			? '[&>*]:rounded-none [&>*+*]:-mt-px [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md'
			: '[&>*]:rounded-none [&>*+*]:-ml-px [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md',
		'[&>*:focus-visible]:z-10 [&>*:hover]:z-10',
		klass
	)}
>
	{@render children()}
</div>
