<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import NumberInput from './NumberInput.svelte';

	const { Story } = defineMeta({
		title: 'Forms/NumberInput',
		component: NumberInput,
		tags: ['autodocs'],
		argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
		args: { label: 'Seats', value: 5, min: 1, max: 50, class: 'w-56' }
	});
</script>

<Story name="Default" />
<Story
	name="With unit"
	args={{ label: 'Request timeout', value: 30, min: 1, max: 120, unit: 'sec' }}
/>
<Story name="At maximum" args={{ value: 50, helper: 'Contact sales for more than 50 seats.' }} />
<Story name="Error" args={{ value: 0, error: 'At least one seat is required.' }} />
<Story name="Disabled" args={{ disabled: true }} />
