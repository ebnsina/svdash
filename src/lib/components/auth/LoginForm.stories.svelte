<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoginForm from './LoginForm.svelte';

	const { Story } = defineMeta({
		title: 'Auth/Login',
		component: LoginForm,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		args: {}
	});
</script>

<Story name="Default" />
<Story name="Filled" args={{ email: 'amina@acme.com', password: 'hunter2hunter2' }} />
<Story
	name="Loading"
	args={{ email: 'amina@acme.com', password: 'hunter2hunter2', loading: true }}
/>
<Story
	name="Wrong credentials"
	args={{ email: 'amina@acme.com', error: 'That email and password do not match. Try again.' }}
/>
<Story
	name="Field errors"
	args={{
		email: 'not-an-email',
		emailError: 'Enter a valid email address.',
		passwordError: 'Enter your password.'
	}}
/>
