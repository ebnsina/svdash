<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TagInput from './TagInput.svelte';

	const { Story } = defineMeta({
		title: 'Forms/TagInput',
		component: TagInput,
		tags: ['autodocs'],
		args: { label: 'Tags', class: 'w-96 max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="With tags" args={{ tags: ['billing', 'urgent', 'eu-region'] }} />
<Story name="With limit" args={{ tags: ['api', 'v2'], max: 5 }} />
<Story name="At limit" args={{ tags: ['api', 'v2', 'beta'], max: 3 }} />
<Story name="Error" args={{ tags: [], error: 'Add at least one tag.' }} />
<Story name="Disabled" args={{ disabled: true, tags: ['locked'] }} />
