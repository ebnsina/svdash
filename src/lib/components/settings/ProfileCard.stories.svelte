<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ProfileCard from './ProfileCard.svelte';

	const { Story } = defineMeta({
		title: 'Settings/ProfileCard',
		component: ProfileCard,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: {
			name: 'Amina Rahman',
			email: 'amina@acme.com',
			role: 'Owner',
			joinedAt: '2026-04-02',
			class: 'w-[42rem] max-w-full'
		}
	});
</script>

<Story name="Default" />
<Story name="Without a role" args={{ role: undefined }} />
<Story
	name="New member"
	args={{ name: 'Leyla Kaya', email: 'leyla@acme.com', role: 'Viewer', joinedAt: '2026-09-11' }}
/>
