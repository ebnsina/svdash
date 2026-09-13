<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DangerZone from './DangerZone.svelte';
	import { dangerActions } from './mock.js';

	const { Story } = defineMeta({
		title: 'Settings/DangerZone',
		component: DangerZone,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { actions: dangerActions, class: 'w-[42rem] max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="Single action" args={{ actions: [dangerActions[2]] }} />
<Story
	name="All available"
	args={{ actions: dangerActions.map((a) => ({ ...a, disabled: false })) }}
/>
