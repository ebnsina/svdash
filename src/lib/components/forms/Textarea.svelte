<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import FormField from './FormField.svelte';
	import { controlBase, controlTone } from './field.js';

	interface Props {
		value?: string;
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		placeholder?: string;
		rows?: number;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		maxlength?: number;
		/** Shows a live character count against `maxlength`. */
		showCount?: boolean;
		name?: string;
		id?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		label,
		hideLabel = false,
		helper,
		error,
		placeholder,
		rows = 4,
		required = false,
		disabled = false,
		readonly = false,
		maxlength,
		showCount = false,
		name,
		id = uid('textarea'),
		class: klass
	}: Props = $props();
</script>

<FormField {label} {hideLabel} {helper} {error} {required} {id} class={klass}>
	{#snippet children({ id, describedBy, invalid })}
		<textarea
			{id}
			{name}
			{rows}
			{placeholder}
			{required}
			{disabled}
			{readonly}
			{maxlength}
			bind:value
			aria-describedby={describedBy}
			aria-invalid={invalid || undefined}
			class={cn(controlBase, controlTone(invalid), 'resize-y rounded-md px-3 py-2 leading-relaxed')}
		></textarea>
		{#if showCount && maxlength}
			<p class="text-right text-xs text-faint" aria-live="polite">
				{value.length} / {maxlength}
			</p>
		{/if}
	{/snippet}
</FormField>
