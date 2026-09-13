<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { chartColor, type Series } from './chart.js';

	interface Props {
		series: Series[];
		class?: string;
	}

	let { series, class: klass }: Props = $props();
</script>

<ul class={cn('flex flex-wrap items-center gap-x-4 gap-y-1.5', klass)}>
	{#each series as s, i (s.name)}
		<li class="flex items-center gap-1.5 text-xs text-muted">
			<span
				aria-hidden="true"
				class="size-2.5 shrink-0 rounded-xs"
				style:background-color={s.color ?? chartColor(i)}
			></span>
			{s.name}
		</li>
	{/each}
</ul>
