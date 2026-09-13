<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ApiKeyRow from './ApiKeyRow.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Settings/ApiKeyRow',
		component: ApiKeyRow,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: { environment: { control: 'inline-radio', options: ['live', 'test'] } },
		args: {
			name: 'Production server',
			value: 'svd_live_9f2b7d41c8e64a0fb3d5271e',
			createdAt: '2026-06-14',
			lastUsedAt: '2026-09-13T07:40:00Z',
			class: 'w-[42rem] max-w-full rounded-xl bg-surface shadow-xs'
		}
	});
</script>

<Story name="Default" />
<Story name="Revealed" args={{ revealed: true }} />
<Story
	name="Test key"
	args={{
		name: 'Local development',
		environment: 'test',
		prefix: 'svd_test_',
		value: 'svd_test_11aa22bb33cc44dd55ee66ff',
		lastUsedAt: undefined
	}}
/>

<Story name="In a list">
	{#snippet template()}
		<div class="w-[42rem] max-w-full rounded-xl bg-surface shadow-xs">
			<div class="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
				<h3 class="text-sm font-semibold text-fg">API keys</h3>
				<Button size="sm" iconLeft="plus">New key</Button>
			</div>
			<ApiKeyRow
				name="Production server"
				value="svd_live_9f2b7d41c8e64a0fb3d5271e"
				createdAt="2026-06-14"
				lastUsedAt="2026-09-13T07:40:00Z"
			/>
			<ApiKeyRow
				name="Reporting job"
				value="svd_live_44ce18a7b9026fd3e5710c8b"
				createdAt="2026-07-02"
				lastUsedAt="2026-09-01T03:00:00Z"
			/>
			<ApiKeyRow
				name="Local development"
				environment="test"
				prefix="svd_test_"
				value="svd_test_11aa22bb33cc44dd55ee66ff"
				createdAt="2026-08-20"
			/>
		</div>
	{/snippet}
</Story>
