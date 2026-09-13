<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import OnboardingWelcome from './OnboardingWelcome.svelte';

	const tasks = [
		{
			id: 'profile',
			label: 'Complete your profile',
			description: 'Name and photo',
			icon: 'user' as const,
			done: true
		},
		{
			id: 'workspace',
			label: 'Name your workspace',
			description: 'Shown on invoices',
			icon: 'building' as const,
			done: true
		},
		{
			id: 'invite',
			label: 'Invite your team',
			description: 'Optional, but faster together',
			icon: 'users' as const
		},
		{
			id: 'key',
			label: 'Create your first API key',
			description: 'Connect your app',
			icon: 'key' as const
		},
		{
			id: 'billing',
			label: 'Add a payment method',
			description: 'Only charged after the trial',
			icon: 'credit-card' as const
		}
	];

	const { Story } = defineMeta({
		title: 'Auth/OnboardingWelcome',
		component: OnboardingWelcome,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		args: { name: 'Amina', tasks }
	});
</script>

<Story name="Default" />
<Story name="Fresh start" args={{ tasks: tasks.map((t) => ({ ...t, done: false })) }} />
<Story name="All done" args={{ tasks: tasks.map((t) => ({ ...t, done: true })) }} />
