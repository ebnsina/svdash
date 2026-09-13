<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Fab from './Fab.svelte';
	import { iconNames } from '#lib/icons/registry.js';

	const { Story } = defineMeta({
		title: 'Buttons/Fab',
		component: Fab,
		tags: ['autodocs'],
		argTypes: {
			icon: { control: 'select', options: iconNames },
			position: { control: 'inline-radio', options: ['bottom-right', 'bottom-left', 'static'] }
		},
		args: { icon: 'plus', label: 'New invoice', position: 'static' }
	});
</script>

<Story name="Default" />

<Story name="Extended" args={{ extended: true }} />

<Story
	name="Anchored to viewport"
	args={{ position: 'bottom-right', extended: true }}
	parameters={{ layout: 'fullscreen' }}
>
	{#snippet template(args)}
		<div class="h-64 bg-canvas p-6 text-sm text-muted">Scroll region — the button stays put.</div>
		<Fab {...args} />
	{/snippet}
</Story>
