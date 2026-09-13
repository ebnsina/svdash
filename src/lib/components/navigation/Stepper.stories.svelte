<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Stepper from './Stepper.svelte';

	const steps = [
		{ id: 'account', label: 'Create account', description: 'Name and email' },
		{ id: 'workspace', label: 'Set up workspace', description: 'Pick a name and region' },
		{ id: 'invite', label: 'Invite your team', description: 'Optional' },
		{ id: 'billing', label: 'Add billing', description: 'Card or invoice' }
	];

	const { Story } = defineMeta({
		title: 'Navigation/Stepper',
		component: Stepper,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: { orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
		args: { steps, current: 1, label: 'Onboarding progress', class: 'w-[42rem] max-w-full' }
	});
</script>

<Story name="Horizontal" />
<Story name="Vertical" args={{ orientation: 'vertical', class: 'w-80 max-w-full' }} />
<Story name="First step" args={{ current: 0 }} />
<Story name="All complete" args={{ current: 4 }} />
<Story name="Navigable" args={{ current: 2, navigable: true }} />
