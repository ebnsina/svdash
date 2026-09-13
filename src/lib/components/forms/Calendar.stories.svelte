<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Calendar from './Calendar.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Calendar',
		component: Calendar,
		tags: ['autodocs'],
		args: { class: 'rounded-xl bg-surface shadow-xs p-3' }
	});
</script>

<Story name="Default" />
<Story name="Selected" args={{ selected: '2026-09-13' }} />
<Story name="Range" args={{ mode: 'range', rangeStart: '2026-09-03', rangeEnd: '2026-09-18' }} />
<Story name="Bounded" args={{ min: '2026-09-08', max: '2026-09-24' }} />
