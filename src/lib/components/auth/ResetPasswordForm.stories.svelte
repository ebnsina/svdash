<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ResetPasswordForm from './ResetPasswordForm.svelte';

	const { Story } = defineMeta({
		title: 'Auth/ResetPassword',
		component: ResetPasswordForm,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		args: {}
	});
</script>

<Story name="Default" />
<Story name="Mismatch" args={{ password: 'Correct-Horse-9!', confirm: 'Correct-Horse-8!' }} />
<Story
	name="Too short"
	args={{ password: 'short', passwordError: 'Use at least 12 characters.' }}
/>
<Story
	name="Loading"
	args={{ password: 'Correct-Horse-9!', confirm: 'Correct-Horse-9!', loading: true }}
/>
<Story name="Expired link" args={{ expired: true }} />
