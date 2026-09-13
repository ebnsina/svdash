<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';
	import { countries, plans } from './mock.js';

	const { Story } = defineMeta({
		title: 'Forms/Select',
		component: Select,
		tags: ['autodocs'],
		argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
		args: { label: 'Country', options: countries, class: 'w-80 max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="Selected" args={{ value: 'my' }} />
<Story name="Grouped" args={{ label: 'Plan', options: plans, value: 'growth' }} />
<Story name="With helper" args={{ helper: 'Used to work out sales tax.' }} />
<Story name="Error" args={{ error: 'Choose a country.' }} />
<Story name="Disabled" args={{ disabled: true, value: 'de' }} />
