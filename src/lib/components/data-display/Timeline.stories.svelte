<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Timeline from './Timeline.svelte';
	import { activity } from './mock.js';

	const { Story } = defineMeta({
		title: 'Data Display/Timeline',
		component: Timeline,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { events: activity, class: 'w-[32rem] max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="Single event" args={{ events: activity.slice(0, 1) }} />
<Story name="In a card">
	{#snippet template()}
		<div class="w-[32rem] max-w-full rounded-xl bg-surface p-5 shadow-xs">
			<h3 class="mb-4 text-sm font-semibold text-fg">Recent activity</h3>
			<Timeline events={activity} />
		</div>
	{/snippet}
</Story>
