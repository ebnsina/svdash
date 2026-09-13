<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DatePicker from './DatePicker.svelte';

	const { Story } = defineMeta({
		title: 'Forms/DatePicker',
		component: DatePicker,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Invoice date', class: 'w-72 max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="Selected" args={{ value: '2026-09-13' }} />
<Story
	name="With bounds"
	args={{ min: '2026-09-01', max: '2026-09-30', helper: 'Only dates in September 2026.' }}
/>
<Story name="Error" args={{ error: 'Choose an invoice date.' }} />
<Story name="Disabled" args={{ disabled: true, value: '2026-01-01' }} />
