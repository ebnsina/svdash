<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Sparkline from './Sparkline.svelte';

	const { Story } = defineMeta({
		title: 'Data Display/Sparkline',
		component: Sparkline,
		tags: ['autodocs'],
		args: { values: [12, 15, 14, 19, 18, 24, 22, 31], class: 'h-10 w-40' }
	});
</script>

<Story name="Default" />
<Story name="Line only" args={{ filled: false }} />
<Story
	name="Falling"
	args={{ values: [31, 28, 29, 24, 22, 19, 17, 12], color: 'var(--c-danger)' }}
/>
<Story name="Flat" args={{ values: [20, 20, 20, 20, 20], color: 'var(--c-faint)' }} />
