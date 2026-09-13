<script lang="ts">
	import type { Series } from './chart.js';

	interface Props {
		caption: string;
		labels: string[];
		series: Series[];
	}

	let { caption, labels, series }: Props = $props();
	const fmt = new Intl.NumberFormat('en-US');
</script>

<!-- The same numbers as a real table, for screen readers and keyboard users. -->
<table class="sr-only">
	<caption>{caption}</caption>
	<thead>
		<tr>
			<th scope="col">Period</th>
			{#each series as s (s.name)}
				<th scope="col">{s.name}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each labels as label, i (label)}
			<tr>
				<th scope="row">{label}</th>
				{#each series as s (s.name)}
					<td>{fmt.format(s.values[i] ?? 0)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
