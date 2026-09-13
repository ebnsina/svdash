<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import FormField from './FormField.svelte';
	import { controlBase, controlTone, controlSizes, type ControlSize } from './field.js';

	export interface SelectOption {
		value: string;
		label: string;
		disabled?: boolean;
		group?: string;
	}

	interface Props {
		value?: string;
		options: SelectOption[];
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		placeholder?: string;
		size?: ControlSize;
		required?: boolean;
		disabled?: boolean;
		name?: string;
		id?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		options,
		label,
		hideLabel = false,
		helper,
		error,
		placeholder = 'Select an option',
		size = 'md',
		required = false,
		disabled = false,
		name,
		id = uid('select'),
		class: klass
	}: Props = $props();

	// Native <select> — full keyboard and mobile behaviour for free.
	let groups = $derived([...new Set(options.map((o) => o.group).filter(Boolean))] as string[]);
	let ungrouped = $derived(options.filter((o) => !o.group));
</script>

<FormField {label} {hideLabel} {helper} {error} {required} {id} class={klass}>
	{#snippet children({ id, describedBy, invalid })}
		<div class="relative">
			<select
				{id}
				{name}
				{required}
				{disabled}
				bind:value
				aria-describedby={describedBy}
				aria-invalid={invalid || undefined}
				class={cn(
					controlBase,
					controlTone(invalid),
					controlSizes[size],
					'appearance-none pr-9',
					!value && 'text-faint'
				)}
			>
				<option value="" disabled>{placeholder}</option>
				{#each ungrouped as option (option.value)}
					<option value={option.value} disabled={option.disabled}>{option.label}</option>
				{/each}
				{#each groups as group (group)}
					<optgroup label={group}>
						{#each options.filter((o) => o.group === group) as option (option.value)}
							<option value={option.value} disabled={option.disabled}>{option.label}</option>
						{/each}
					</optgroup>
				{/each}
			</select>
			<Icon
				name="chevron-down"
				class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-faint"
			/>
		</div>
	{/snippet}
</FormField>
