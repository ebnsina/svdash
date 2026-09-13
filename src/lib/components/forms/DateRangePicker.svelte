<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { clickOutside } from '#lib/utils/actions.js';
	import { formatDate } from '#lib/utils/format.js';
	import Calendar from './Calendar.svelte';
	import { controlBase, controlTone, controlSizes, type ControlSize } from './field.js';

	interface Props {
		start?: string;
		end?: string;
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		placeholder?: string;
		min?: string;
		max?: string;
		size?: ControlSize;
		disabled?: boolean;
		id?: string;
		class?: string;
	}

	let {
		start = $bindable(''),
		end = $bindable(''),
		label,
		hideLabel = false,
		helper,
		error,
		placeholder = 'Pick a date range',
		min,
		max,
		size = 'md',
		disabled = false,
		id = uid('daterange'),
		class: klass
	}: Props = $props();

	let open = $state(false);
	let triggerEl = $state<HTMLButtonElement | null>(null);
	let announcement = $state('');

	let display = $derived(
		start && end
			? `${formatDate(start)} – ${formatDate(end)}`
			: start
				? `${formatDate(start)} – …`
				: placeholder
	);

	function pick(iso: string) {
		if (!start || (start && end)) {
			start = iso;
			end = '';
			announcement = `Start ${formatDate(iso)} selected. Choose an end date.`;
		} else if (iso < start) {
			start = iso;
			announcement = `Start ${formatDate(iso)} selected.`;
		} else {
			end = iso;
			announcement = `Range ${formatDate(start)} to ${formatDate(iso)} selected.`;
			open = false;
			triggerEl?.focus();
		}
	}

	function clear() {
		start = '';
		end = '';
		announcement = 'Range cleared.';
	}
</script>

<div class={cn('relative flex flex-col gap-1.5', klass)} use:clickOutside={() => (open = false)}>
	<span id="{id}-label" class={cn('text-sm font-medium text-fg', hideLabel && 'sr-only')}
		>{label}</span
	>

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
		aria-describedby={helper ? `${id}-helper` : undefined}
		class={cn(
			controlBase,
			controlTone(Boolean(error)),
			controlSizes[size],
			'flex items-center justify-between gap-2 text-left',
			!start && 'text-faint'
		)}
	>
		<span class={start ? 'font-mono text-xs tabular-nums' : ''}>{display}</span>
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
					open = false;
					triggerEl?.focus();
				}
			}}
			class="absolute top-full left-0 z-40 mt-1.5 rounded-xl bg-surface p-3 shadow-lg"
		>
			<Calendar
				mode="range"
				rangeStart={start}
				rangeEnd={end}
				{min}
				{max}
				autofocus
				onselect={pick}
			/>
			<div class="mt-2 flex items-center justify-between border-t border-border/60 pt-2">
				<button
					type="button"
					onclick={clear}
					class="rounded-md px-2 py-1 text-xs font-medium text-muted hover:bg-subtle hover:text-fg focus-visible:ring-focus"
				>
					Clear
				</button>
				<button
					type="button"
					onclick={() => {
						open = false;
						triggerEl?.focus();
					}}
					class="rounded-md px-2 py-1 text-xs font-medium text-accent hover:bg-accent-soft focus-visible:ring-focus"
				>
					Done
				</button>
			</div>
		</div>
	{/if}

	{#if error}
		<p class="text-xs text-danger">{error}</p>
	{/if}
	{#if helper}
		<p id="{id}-helper" class="text-xs text-muted">{helper}</p>
	{/if}
	<span class="sr-only" role="status" aria-live="polite">{announcement}</span>
</div>
