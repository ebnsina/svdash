<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { clickOutside } from '#lib/utils/actions.js';
	import type { ComboboxOption } from './Combobox.svelte';

	interface Props {
		values?: string[];
		options: ComboboxOption[];
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		maxVisibleChips?: number;
		emptyMessage?: string;
		id?: string;
		class?: string;
	}

	let {
		values = $bindable<string[]>([]),
		options,
		label,
		hideLabel = false,
		helper,
		error,
		placeholder = 'Add…',
		required = false,
		disabled = false,
		maxVisibleChips = 99,
		emptyMessage = 'No matches found',
		id = uid('multiselect'),
		class: klass
	}: Props = $props();

	let listboxId = $derived(`${id}-listbox`);
	let helperId = $derived(`${id}-helper`);
	let errorId = $derived(`${id}-error`);

	let open = $state(false);
	let query = $state('');
	let activeIndex = $state(-1);
	let inputEl = $state<HTMLInputElement | null>(null);

	let filtered = $derived(
		options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()))
	);
	let selected = $derived(options.filter((o) => values.includes(o.value)));
	let overflow = $derived(Math.max(0, selected.length - maxVisibleChips));
	let describedBy = $derived(
		[error && errorId, helper && helperId].filter(Boolean).join(' ') || undefined
	);

	function toggle(option: ComboboxOption) {
		if (option.disabled) return;
		values = values.includes(option.value)
			? values.filter((v) => v !== option.value)
			: [...values, option.value];
		query = '';
		inputEl?.focus();
	}

	function remove(value: string) {
		values = values.filter((v) => v !== value);
		inputEl?.focus();
	}

	function move(delta: number) {
		if (!open) {
			open = true;
			activeIndex = 0;
			return;
		}
		if (filtered.length === 0) return;
		activeIndex = (activeIndex + delta + filtered.length) % filtered.length;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			move(1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			move(-1);
		} else if (e.key === 'Enter' && open && activeIndex >= 0 && filtered[activeIndex]) {
			e.preventDefault();
			toggle(filtered[activeIndex]);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			open = false;
			activeIndex = -1;
		} else if (e.key === 'Backspace' && query === '' && values.length > 0) {
			remove(values[values.length - 1]);
		} else if (e.key === 'Tab') {
			open = false;
		}
	}
</script>

<div class={cn('relative flex flex-col gap-1.5', klass)} use:clickOutside={() => (open = false)}>
	<label for={id} class={cn('text-sm font-medium text-fg', hideLabel && 'sr-only')}>
		{label}
		{#if required}
			<span class="text-danger" aria-hidden="true">*</span>
			<span class="sr-only">(required)</span>
		{/if}
	</label>

	<div
		class={cn(
			'flex min-h-9.5 flex-wrap items-center gap-1.5 rounded-md border bg-surface p-1.5 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent',
			error ? 'border-danger' : 'border-field hover:border-fg/40',
			disabled && 'cursor-not-allowed bg-subtle'
		)}
	>
		{#each selected.slice(0, maxVisibleChips) as option (option.value)}
			<span
				class="inline-flex items-center gap-1 rounded-full bg-subtle py-0.5 pr-1 pl-2.5 text-xs font-medium text-fg"
			>
				{option.label}
				<button
					type="button"
					{disabled}
					onclick={() => remove(option.value)}
					aria-label="Remove {option.label}"
					class="rounded-full p-0.5 text-muted hover:text-fg focus-visible:ring-focus"
				>
					<Icon name="x" class="size-3" />
				</button>
			</span>
		{/each}
		{#if overflow > 0}
			<span class="px-1 text-xs text-muted">+{overflow} more</span>
		{/if}

		<input
			bind:this={inputEl}
			{id}
			type="text"
			role="combobox"
			autocomplete="off"
			{disabled}
			placeholder={selected.length === 0 ? placeholder : ''}
			bind:value={query}
			oninput={() => {
				open = true;
				activeIndex = 0;
			}}
			onkeydown={onKeydown}
			onfocus={() => (open = true)}
			aria-expanded={open}
			aria-controls={listboxId}
			aria-autocomplete="list"
			aria-describedby={describedBy}
			aria-invalid={error ? true : undefined}
			aria-activedescendant={activeIndex >= 0 && filtered[activeIndex]
				? `${id}-opt-${activeIndex}`
				: undefined}
			class="min-w-24 flex-1 bg-transparent px-1.5 text-sm text-fg outline-none placeholder:text-faint disabled:cursor-not-allowed"
		/>
	</div>

	<ul
		{...{ id: listboxId }}
		role="listbox"
		aria-label={label}
		aria-multiselectable="true"
		hidden={!open}
		class="absolute top-full right-0 left-0 z-40 mt-1.5 max-h-64 overflow-y-auto rounded-xl bg-surface p-1 shadow-lg"
	>
		{#if filtered.length === 0}
			<li class="px-3 py-2 text-sm text-muted" role="presentation">{emptyMessage}</li>
		{:else}
			{#each filtered as option, i (option.value)}
				<li
					id="{id}-opt-{i}"
					role="option"
					aria-selected={values.includes(option.value)}
					aria-disabled={option.disabled || undefined}
					onpointerdown={(e) => {
						e.preventDefault();
						toggle(option);
					}}
					onpointermove={() => (activeIndex = i)}
					class={cn(
						'flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm',
						i === activeIndex && 'bg-subtle',
						option.disabled && 'cursor-not-allowed text-faint'
					)}
				>
					<span
						class={cn(
							'flex size-4 items-center justify-center rounded-xs border',
							values.includes(option.value)
								? 'border-accent bg-accent text-accent-fg'
								: 'border-field'
						)}
						aria-hidden="true"
					>
						{#if values.includes(option.value)}
							<Icon name="check" class="size-3" strokeWidth={3} />
						{/if}
					</span>
					{option.label}
				</li>
			{/each}
		{/if}
	</ul>

	{#if error}
		<p id={errorId} class="text-xs text-danger">{error}</p>
	{/if}
	{#if helper}
		<p id={helperId} class="text-xs text-muted">{helper}</p>
	{/if}
	<span class="sr-only" role="status" aria-live="polite">{values.length} selected</span>
</div>
