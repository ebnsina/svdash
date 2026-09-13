<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Combobox from './Combobox.svelte';
	import { teammates } from './mock.js';

	const { Story } = defineMeta({
		title: 'Forms/Combobox',
		component: Combobox,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			label: 'Assignee',
			options: teammates,
			helper: 'Type to filter. Arrow keys to browse, Enter to pick.',
			class: 'w-80 max-w-full'
		}
	});
</script>

<Story name="Default" />
<Story name="Preselected" args={{ value: 'deniz' }} />
<Story name="Loading" args={{ loading: true }} />
<Story
	name="Empty"
	args={{ options: [], emptyMessage: 'No teammates yet — invite someone first.' }}
/>
<Story name="Error" args={{ error: 'Pick an assignee before saving.' }} />
<Story name="Disabled" args={{ disabled: true, value: 'amina' }} />
