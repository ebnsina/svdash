<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MultiSelect from './MultiSelect.svelte';
	import { teammates } from './mock.js';

	const { Story } = defineMeta({
		title: 'Forms/MultiSelect',
		component: MultiSelect,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Reviewers', options: teammates, class: 'w-96 max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="With selections" args={{ values: ['amina', 'leyla'] }} />
<Story
	name="Collapsed overflow"
	args={{ values: ['amina', 'deniz', 'farhan', 'leyla'], maxVisibleChips: 2 }}
/>
<Story name="With helper" args={{ helper: 'Backspace removes the last reviewer.' }} />
<Story name="Error" args={{ error: 'Add at least one reviewer.' }} />
<Story name="Disabled" args={{ disabled: true, values: ['noor'] }} />
