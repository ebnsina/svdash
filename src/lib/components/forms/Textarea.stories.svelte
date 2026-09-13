<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Textarea from './Textarea.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Textarea',
		component: Textarea,
		tags: ['autodocs'],
		args: {
			label: 'Description',
			placeholder: 'What does this project do?',
			class: 'w-96 max-w-full'
		}
	});
</script>

<Story name="Default" />
<Story name="With helper" args={{ helper: 'Markdown is supported.' }} />
<Story
	name="With character count"
	args={{ maxlength: 160, showCount: true, value: 'Payments infrastructure for small shops.' }}
/>
<Story name="Error" args={{ error: 'Description is required.', value: '' }} />
<Story
	name="Disabled"
	args={{ disabled: true, value: 'Cannot edit while the project is archived.' }}
/>
