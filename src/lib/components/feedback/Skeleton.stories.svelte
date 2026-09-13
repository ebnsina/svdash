<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Skeleton from './Skeleton.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Skeleton',
		component: Skeleton,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: { variant: { control: 'inline-radio', options: ['line', 'block', 'circle'] } },
		args: { variant: 'line', lines: 1, class: 'w-80' }
	});
</script>

<Story name="Line" args={{ lines: 1 }} />
<Story name="Paragraph" args={{ lines: 4 }} />
<Story name="Block" args={{ variant: 'block' }} />
<Story name="Circle" args={{ variant: 'circle' }} />

<Story name="Card placeholder">
	{#snippet template()}
		<div class="w-80 max-w-full rounded-xl bg-surface p-4 shadow-xs">
			<div class="flex items-center gap-3">
				<Skeleton variant="circle" />
				<Skeleton lines={2} class="flex-1" />
			</div>
			<Skeleton variant="block" class="mt-4" />
		</div>
	{/snippet}
</Story>

<Story name="Table placeholder">
	{#snippet template()}
		<div class="w-[36rem] max-w-full divide-y divide-border/60 rounded-xl bg-surface shadow-xs">
			{#each { length: 5 } as _, i (i)}
				<div class="flex items-center gap-4 px-4 py-3">
					<Skeleton variant="circle" class="[&>span]:size-7" />
					<Skeleton class="flex-1" />
					<Skeleton width="4rem" />
				</div>
			{/each}
		</div>
	{/snippet}
</Story>
