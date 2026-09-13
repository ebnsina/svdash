<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';

	interface Props {
		checked?: boolean;
		label: string;
		hideLabel?: boolean;
		description?: string;
		disabled?: boolean;
		size?: 'sm' | 'md';
		/** Put the switch before the label instead of after it. */
		leading?: boolean;
		id?: string;
		class?: string;
		onchange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(false),
		label,
		hideLabel = false,
		description,
		disabled = false,
		size = 'md',
		leading = false,
		id = uid('switch'),
		class: klass,
		onchange
	}: Props = $props();

	function toggle() {
		checked = !checked;
		onchange?.(checked);
	}

	const track = { sm: 'h-5 w-9', md: 'h-6 w-11' };
	const thumb = { sm: 'size-3.5', md: 'size-4.5' };
	const travel = { sm: 'translate-x-4', md: 'translate-x-5' };
</script>

<div
	class={cn(
		'flex items-center justify-between gap-4',
		leading && 'flex-row-reverse justify-end',
		klass
	)}
>
	<span class={cn('flex flex-col gap-0.5', hideLabel && 'sr-only')}>
		<span id="{id}-label" class={cn('text-sm font-medium text-fg', disabled && 'text-faint')}>
			{label}
		</span>
		{#if description}
			<span id="{id}-description" class="text-xs text-muted">{description}</span>
		{/if}
	</span>

	<button
		{id}
		type="button"
		role="switch"
		aria-checked={checked}
		aria-labelledby="{id}-label"
		aria-describedby={description ? `${id}-description` : undefined}
		{disabled}
		onclick={toggle}
		class={cn(
			'relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-50',
			track[size],
			checked ? 'bg-accent' : 'bg-field'
		)}
	>
		<span
			aria-hidden="true"
			class={cn(
				'pointer-events-none ml-0.5 inline-block rounded-full bg-white shadow-xs transition-transform',
				thumb[size],
				checked ? travel[size] : 'translate-x-0'
			)}
		></span>
	</button>
</div>
