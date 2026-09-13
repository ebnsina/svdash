<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ForgotPasswordForm from './ForgotPasswordForm.svelte';

	const { Story } = defineMeta({
		title: 'Auth/ForgotPassword',
		component: ForgotPasswordForm,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		args: {}
	});
</script>

<Story name="Default" />
<Story name="Loading" args={{ email: 'amina@acme.com', loading: true }} />
<Story name="Link sent" args={{ email: 'amina@acme.com', sent: true }} />
<Story
	name="Invalid email"
	args={{ email: 'amina@', emailError: 'Enter a valid email address.' }}
/>
<Story
	name="Server error"
	args={{ error: 'We could not send the email just now. Try again in a minute.' }}
/>
