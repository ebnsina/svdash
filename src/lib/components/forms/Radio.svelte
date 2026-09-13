<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';

	interface Props {
		group?: string;
		value: string;
		name: string;
		label: string;
		description?: string;
		disabled?: boolean;
		id?: string;
		class?: string;
	}

	let {
		group = $bindable(),
		value,
		name,
		label,
		description,
		disabled = false,
		id = uid('radio'),
		class: klass
	}: Props = $props();
</script>

<div class={cn('flex items-start gap-2.5', klass)}>
	<span class="relative flex size-4.5 shrink-0 items-center justify-center">
		<input
			{id}
			{name}
			{value}
			{disabled}
			type="radio"
			bind:group
			aria-describedby={description ? `${id}-description` : undefined}
			class="peer size-4.5 appearance-none rounded-full border border-field bg-surface transition-colors checked:border-accent focus-visible:ring-focus disabled:cursor-not-allowed disabled:bg-subtle"
		/>
		<span
			aria-hidden="true"
			class="pointer-events-none absolute size-2 rounded-full bg-accent opacity-0 peer-checked:opacity-100"
		></span>
	</span>
	<span class="flex flex-col gap-0.5">
		<label
			for={id}
			class={cn('text-sm leading-tight font-medium text-fg select-none', disabled && 'text-faint')}
		>
			{label}
		</label>
		{#if description}
			<span id="{id}-description" class="text-xs text-muted">{description}</span>
		{/if}
	</span>
</div>
