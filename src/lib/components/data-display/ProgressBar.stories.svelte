<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ProgressBar from './ProgressBar.svelte';

	const { Story } = defineMeta({
		title: 'Data Display/ProgressBar',
		component: ProgressBar,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: {
			tone: { control: 'inline-radio', options: ['accent', 'success', 'warning', 'danger'] },
			size: { control: 'inline-radio', options: ['sm', 'md'] }
		},
		args: { label: 'Storage used', value: 42, class: 'w-80 max-w-full' }
	});
</script>

<Story name="Default" />
<Story
	name="Custom value text"
	args={{ label: 'API requests', value: 92000, max: 100000, valueText: '92,000 of 100,000' }}
/>
<Story name="Tones">
	{#snippet template()}
		<div class="flex w-80 max-w-full flex-col gap-5">
			<ProgressBar label="Healthy" value={28} tone="accent" />
			<ProgressBar label="Complete" value={100} tone="success" />
			<ProgressBar label="Getting full" value={78} tone="warning" />
			<ProgressBar label="Over quota" value={98} tone="danger" />
		</div>
	{/snippet}
</Story>
<Story name="Small, unlabelled" args={{ size: 'sm', hideLabel: true, value: 64 }} />
<Story
	name="Indeterminate"
	args={{ indeterminate: true, label: 'Importing customers', valueText: 'Working…' }}
/>
