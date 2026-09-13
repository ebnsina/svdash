<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './Avatar.svelte';

	const { Story } = defineMeta({
		title: 'Data Display/Avatar',
		component: Avatar,
		tags: ['autodocs'],
		argTypes: {
			size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
			shape: { control: 'inline-radio', options: ['circle', 'square'] },
			status: { control: 'select', options: [undefined, 'online', 'away', 'busy', 'offline'] }
		},
		args: { name: 'Amina Rahman', size: 'md' }
	});
</script>

<Story name="Default" />
<Story name="Sizes">
	{#snippet template()}
		<div class="flex items-end gap-3">
			<Avatar name="Amina Rahman" size="xs" />
			<Avatar name="Amina Rahman" size="sm" />
			<Avatar name="Amina Rahman" size="md" />
			<Avatar name="Amina Rahman" size="lg" />
			<Avatar name="Amina Rahman" size="xl" />
		</div>
	{/snippet}
</Story>
<Story name="Square" args={{ shape: 'square', size: 'lg' }} />
<Story name="With status">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<Avatar name="Amina Rahman" status="online" />
			<Avatar name="Deniz Yilmaz" status="away" />
			<Avatar name="Leyla Kaya" status="busy" />
			<Avatar name="Omar Siddiq" status="offline" />
		</div>
	{/snippet}
</Story>
<Story
	name="Broken image falls back to initials"
	args={{ src: '/does-not-exist.png', size: 'lg' }}
/>
<Story name="Single word name" args={{ name: 'Support' }} />
