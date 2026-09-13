<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';

	interface Props {
		content: string;
		placement?: 'top' | 'bottom' | 'left' | 'right';
		/** Delay before showing on hover, in ms. */
		delay?: number;
		class?: string;
		children: Snippet<[{ describedBy: string }]>;
	}

	let { content, placement = 'top', delay = 200, class: klass, children }: Props = $props();

	const id = uid('tooltip');
	let visible = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const positions = {
		top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
		bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 -translate-y-1/2 ml-2'
	};

	function show(immediate = false) {
		clearTimeout(timer);
		if (immediate) visible = true;
		else timer = setTimeout(() => (visible = true), delay);
	}

	function hide() {
		clearTimeout(timer);
		visible = false;
	}
</script>

<!-- APG tooltip: shows on hover and focus, dismissed with Escape, never itself focusable. -->
<span
	role="presentation"
	class={cn('relative inline-flex', klass)}
	onpointerenter={() => show()}
	onpointerleave={hide}
	onfocusin={() => show(true)}
	onfocusout={hide}
	onkeydown={(e) => {
		if (e.key === 'Escape' && visible) {
			e.stopPropagation();
			hide();
		}
	}}
>
	{@render children({ describedBy: id })}

	<span
		{id}
		role="tooltip"
		hidden={!visible}
		class={cn(
			'pointer-events-none absolute z-50 w-max max-w-56 rounded-md bg-fg px-2.5 py-1.5 text-xs leading-snug font-medium text-canvas shadow-md',
			positions[placement]
		)}
	>
		{content}
	</span>
</span>
