<script lang="ts">
	import { cn } from '#lib/utils/cn.js';

	interface Props {
		variant?: 'line' | 'block' | 'circle';
		width?: string;
		height?: string;
		/** Number of stacked lines; the last one is shortened. */
		lines?: number;
		class?: string;
	}

	let { variant = 'line', width, height, lines = 1, class: klass }: Props = $props();

	const shapes = {
		line: 'h-3.5 rounded-xs',
		block: 'h-24 rounded-md',
		circle: 'size-10 rounded-full'
	};
</script>

<!-- aria-busy + aria-hidden content: screen readers get the loading state, not the placeholder shapes. -->
<div class={cn('flex flex-col gap-2', klass)} aria-busy="true" aria-live="polite">
	<span class="sr-only">Loading</span>
	{#each { length: lines } as _, i (i)}
		<span
			aria-hidden="true"
			class={cn(
				'block animate-pulse bg-skeleton',
				shapes[variant],
				i === lines - 1 && lines > 1 && 'w-3/5'
			)}
			style:width={i === lines - 1 && lines > 1 ? undefined : width}
			style:height
		></span>
	{/each}
</div>
