<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import FormField from './FormField.svelte';
	import {
		controlBase,
		controlTone,
		controlSizes,
		type ControlSize,
		type ControlVariant
	} from './field.js';

	interface Props {
		value?: string;
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
		placeholder?: string;
		size?: ControlSize;
		/** `filled` trades the outline for a fill — use it for search, not for forms. */
		variant?: ControlVariant;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		icon?: IconName;
		/** Short unit or hint pinned to the right of the field. */
		suffix?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		name?: string;
		id?: string;
		class?: string;
		oninput?: (e: Event) => void;
	}

	let {
		value = $bindable(''),
		label,
		hideLabel = false,
		helper,
		error,
		type = 'text',
		placeholder,
		size = 'md',
		variant = 'outline',
		required = false,
		disabled = false,
		readonly = false,
		icon,
		suffix,
		autocomplete,
		name,
		id = uid('input'),
		class: klass,
		oninput
	}: Props = $props();
</script>

<FormField {label} {hideLabel} {helper} {error} {required} {id} class={klass}>
	{#snippet children({ id, describedBy, invalid })}
		<div class="relative">
			{#if icon}
				<Icon
					name={icon}
					class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint"
				/>
			{/if}
			<input
				{id}
				{name}
				{type}
				{placeholder}
				{required}
				{disabled}
				{readonly}
				{autocomplete}
				bind:value
				{oninput}
				aria-describedby={describedBy}
				aria-invalid={invalid || undefined}
				class={cn(
					controlBase,
					controlTone(invalid, variant),
					controlSizes[size],
					icon && 'pl-9',
					suffix && 'pr-14'
				)}
			/>
			{#if suffix}
				<span
					class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-faint"
				>
					{suffix}
				</span>
			{/if}
		</div>
	{/snippet}
</FormField>
