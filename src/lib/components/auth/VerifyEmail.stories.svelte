<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import VerifyEmail from './VerifyEmail.svelte';

	const { Story } = defineMeta({
		title: 'Auth/VerifyEmail',
		component: VerifyEmail,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		argTypes: {
			state: { control: 'inline-radio', options: ['pending', 'verifying', 'verified', 'failed'] }
		},
		args: { email: 'amina@acme.com', state: 'pending' }
	});
</script>

<Story name="Pending" />
<Story name="Resend locked" args={{ resendIn: 42 }} />
<Story name="Verifying" args={{ state: 'verifying' }} />
<Story name="Verified" args={{ state: 'verified' }} />
<Story name="Failed" args={{ state: 'failed' }} />
