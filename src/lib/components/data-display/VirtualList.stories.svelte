<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import VirtualList from './VirtualList.svelte';
	import Avatar from './Avatar.svelte';
	import EmptyState from './EmptyState.svelte';
	import { feedItems, type FeedItem } from './mock.js';
	import { formatRelative } from '#lib/utils/format.js';

	const { Story } = defineMeta({
		title: 'Data Display/VirtualList',
		component: VirtualList,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { items: feedItems, label: 'Activity feed', estimateSize: 56 }
	});
</script>

<!-- 2,000 rows; only the visible window is ever in the DOM. -->
<Story name="Long feed">
	{#snippet template(args)}
		<div class="w-[36rem] max-w-full rounded-xl bg-surface shadow-xs">
			<VirtualList
				items={feedItems}
				label="Activity feed"
				estimateSize={args.estimateSize}
				class="rounded-xl"
			>
				{#snippet row({ item }: { item: FeedItem })}
					<div class="flex items-center gap-3 border-b border-border/60 px-4 py-2.5">
						<Avatar name={item.actor} size="sm" />
						<span class="flex min-w-0 flex-1 flex-col">
							<span class="truncate text-sm text-fg">
								<span class="font-medium">{item.actor}</span>
								{item.action}
							</span>
							<time datetime={item.at} class="text-xs text-faint">{formatRelative(item.at)}</time>
						</span>
					</div>
				{/snippet}
			</VirtualList>
		</div>
	{/snippet}
</Story>

<Story name="Short list">
	{#snippet template()}
		<div class="w-[36rem] max-w-full rounded-xl bg-surface shadow-xs">
			<VirtualList items={feedItems.slice(0, 6)} label="Activity feed" height="h-auto">
				{#snippet row({ item }: { item: FeedItem })}
					<div class="flex items-center gap-3 border-b border-border/60 px-4 py-2.5">
						<Avatar name={item.actor} size="sm" />
						<span class="truncate text-sm text-fg">{item.actor} {item.action}</span>
					</div>
				{/snippet}
			</VirtualList>
		</div>
	{/snippet}
</Story>

<Story name="Empty">
	{#snippet template()}
		<div class="w-[36rem] max-w-full">
			<VirtualList items={[]} label="Activity feed">
				{#snippet row()}
					<span></span>
				{/snippet}
				{#snippet empty()}
					<EmptyState
						icon="inbox"
						title="No activity yet"
						description="Actions your team takes show up here."
					/>
				{/snippet}
			</VirtualList>
		</div>
	{/snippet}
</Story>
