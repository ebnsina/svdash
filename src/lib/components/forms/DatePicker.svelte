<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { clickOutside } from '#lib/utils/actions.js';
	import { formatDate } from '#lib/utils/format.js';
	import Calendar from './Calendar.svelte';
	import { controlBase, controlTone, controlSizes, type ControlSize } from './field.js';

	interface Props {
		/** ISO `YYYY-MM-DD`. */
		value?: string;
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		placeholder?: string;
		min?: string;
		max?: string;
		size?: ControlSize;
		required?: boolean;
		disabled?: boolean;
		id?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		label,
		hideLabel = false,
		helper,
		error,
		placeholder = 'Pick a date',
		min,
		max,
		size = 'md',
		required = false,
		disabled = false,
		id = uid('datepicker'),
		class: klass
	}: Props = $props();

	let open = $state(false);
	let triggerEl = $state<HTMLButtonElement | null>(null);

	let describedBy = $derived(
		[error && `${id}-error`, helper && `${id}-helper`].filter(Boolean).join(' ') || undefined
	);
	let display = $derived(value ? formatDate(value) : placeholder);

	function close(restoreFocus = true) {
		open = false;
		if (restoreFocus) triggerEl?.focus();
	}
</script>

<div class={cn('relative flex flex-col gap-1.5', klass)} use:clickOutside={() => (open = false)}>
	<span id="{id}-label" class={cn('text-sm font-medium text-fg', hideLabel && 'sr-only')}>
		{label}
		{#if required}
			<span class="text-danger" aria-hidden="true">*</span>
			<span class="sr-only">(required)</span>
		{/if}
	</span>

	<button
		bind:this={triggerEl}
		{id}
		type="button"
		{disabled}
		onclick={() => (open = !open)}
		aria-haspopup="dialog"
		aria-expanded={open}
		aria-controls="{id}-dialog"
		aria-labelledby="{id}-label {id}"
		aria-describedby={describedBy}
		class={cn(
			controlBase,
			controlTone(Boolean(error)),
			controlSizes[size],
			'flex items-center justify-between gap-2 text-left',
			!value && 'text-faint'
		)}
	>
		<span class={value ? 'font-mono tabular-nums' : ''}>{display}</span>
		<Icon name="calendar" class="size-4 shrink-0 text-faint" />
	</button>

	{#if open}
		<div
			id="{id}-dialog"
			role="dialog"
			tabindex="-1"
			aria-label="Choose {label}"
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					e.stopPropagation();
					close();
				}
			}}
			class="absolute top-full left-0 z-40 mt-1.5 rounded-xl bg-surface p-3 shadow-lg"
		>
			<Calendar
				selected={value}
				{min}
				{max}
				autofocus
				onselect={(iso) => {
					value = iso;
					close();
				}}
			/>
		</div>
	{/if}

	{#if error}
		<p id="{id}-error" class="text-xs text-danger">{error}</p>
	{/if}
	{#if helper}
		<p id="{id}-helper" class="text-xs text-muted">{helper}</p>
	{/if}
</div>
