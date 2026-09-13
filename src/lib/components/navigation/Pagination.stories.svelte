<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Pagination from './Pagination.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Pagination',
		component: Pagination,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: { variant: { control: 'inline-radio', options: ['numbered', 'compact'] } },
		args: {
			page: 1,
			totalPages: 12,
			totalItems: 118,
			pageSize: 10,
			class: 'w-[42rem] max-w-full'
		}
	});
</script>

<Story name="Default" />
<!-- Compact drops the page numbers: in a filtered table, search is how people navigate. -->
<Story name="Compact" args={{ variant: 'compact', page: 4 }} />
<Story name="Compact, last page" args={{ variant: 'compact', page: 12 }} />
<Story name="Middle page" args={{ page: 6 }} />
<Story name="Last page" args={{ page: 12 }} />
<Story name="Few pages" args={{ totalPages: 3, totalItems: 24 }} />
<Story name="Single page" args={{ totalPages: 1, totalItems: 7 }} />
<Story name="Without summary" args={{ page: 4, totalItems: undefined }} />
