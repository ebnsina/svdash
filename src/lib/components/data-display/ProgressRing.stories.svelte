<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ProgressRing from './ProgressRing.svelte';

	const { Story } = defineMeta({
		title: 'Data Display/ProgressRing',
		component: ProgressRing,
		tags: ['autodocs'],
		argTypes: {
			tone: { control: 'inline-radio', options: ['accent', 'success', 'warning', 'danger'] }
		},
		args: { label: 'Onboarding progress', value: 64 }
	});
</script>

<Story name="Default" />
<Story name="Tones">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-6">
			<ProgressRing label="Accent" value={35} />
			<ProgressRing label="Success" value={100} tone="success" />
			<ProgressRing label="Warning" value={76} tone="warning" />
			<ProgressRing label="Danger" value={95} tone="danger" />
		</div>
	{/snippet}
</Story>
<Story name="Small" args={{ size: 56, thickness: 6, value: 48 }} />
<Story name="Custom centre text" args={{ size: 120, value: 3, max: 5, valueText: '3/5' }} />
