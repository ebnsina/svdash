<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DateRangePicker from './DateRangePicker.svelte';

	const { Story } = defineMeta({
		title: 'Forms/DateRangePicker',
		component: DateRangePicker,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Reporting period', class: 'w-80 max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="Selected range" args={{ start: '2026-09-01', end: '2026-09-13' }} />
<Story name="Partial range" args={{ start: '2026-09-05' }} />
<Story name="With helper" args={{ helper: 'Pick a start date, then an end date.' }} />
<Story name="Disabled" args={{ disabled: true }} />
