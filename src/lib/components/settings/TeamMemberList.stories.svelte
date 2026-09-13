<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TeamMemberList from './TeamMemberList.svelte';
	import { members } from './mock.js';

	const { Story } = defineMeta({
		title: 'Settings/TeamMemberList',
		component: TeamMemberList,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { members, class: 'w-[42rem] max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="Read only" args={{ readonly: true }} />
<Story name="Just the owner" args={{ members: members.slice(0, 1) }} />
<Story name="Empty" args={{ members: [] }} />
