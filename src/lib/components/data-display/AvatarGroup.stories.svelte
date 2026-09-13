<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AvatarGroup from './AvatarGroup.svelte';
	import { people } from './mock.js';

	const { Story } = defineMeta({
		title: 'Data Display/AvatarGroup',
		component: AvatarGroup,
		tags: ['autodocs'],
		argTypes: { size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] } },
		args: { people, max: 4, size: 'sm', label: 'Project members' }
	});
</script>

<Story name="Default" />
<Story name="All visible" args={{ max: 10 }} />
<Story name="Large" args={{ size: 'lg', max: 3 }} />
<Story name="Two people" args={{ people: people.slice(0, 2) }} />
