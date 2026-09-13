<script lang="ts">
	interface Props {
		class?: string;
	}
	let { class: klass = 'size-4' }: Props = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	class="{klass} animate-spin"
	aria-hidden="true"
	focusable="false"
>
	<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.5" opacity="0.25" />
	<path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
</svg>
