<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SignupForm from './SignupForm.svelte';

	const { Story } = defineMeta({
		title: 'Auth/Signup',
		component: SignupForm,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		args: {}
	});
</script>

<Story name="Default" />
<Story
	name="Weak password"
	args={{ name: 'Amina Rahman', email: 'amina@acme.com', password: 'acme' }}
/>
<Story
	name="Strong password"
	args={{ name: 'Amina Rahman', email: 'amina@acme.com', password: 'Correct-Horse-9!' }}
/>
<Story
	name="Loading"
	args={{
		name: 'Amina Rahman',
		email: 'amina@acme.com',
		password: 'Correct-Horse-9!',
		loading: true
	}}
/>
<Story
	name="Email taken"
	args={{ email: 'amina@acme.com', emailError: 'An account already uses this email.' }}
/>
<Story name="Terms not accepted" args={{ termsError: 'Accept the terms to continue.' }} />
