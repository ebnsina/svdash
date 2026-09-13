<script lang="ts">
	import { icons, type IconName } from './registry.js';

	interface Props {
		name: IconName;
		/** Tailwind size class pair, e.g. `size-4`. */
		class?: string;
		strokeWidth?: number;
		/** Give a label only when the icon is the sole carrier of meaning. */
		label?: string;
	}

	let { name, class: klass = 'size-5', strokeWidth, label }: Props = $props();

	let Glyph = $derived(icons[name]);
</script>

<Glyph
	class={klass}
	stroke-width={strokeWidth}
	role={label ? 'img' : 'presentation'}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	focusable="false"
/>
