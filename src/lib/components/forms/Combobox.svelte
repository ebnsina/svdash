<script lang="ts">
	import { untrack, tick } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { clickOutside } from '#lib/utils/actions.js';
	import FormField from './FormField.svelte';
	import { controlBase, controlTone, controlSizes, type ControlSize } from './field.js';

	export interface ComboboxOption {
		value: string;
		label: string;
		description?: string;
		disabled?: boolean;
	}

	interface Props {
		value?: string;
		options: ComboboxOption[];
		label: string;
		hideLabel?: boolean;
		helper?: string;
		error?: string;
		placeholder?: string;
		size?: ControlSize;
		required?: boolean;
		disabled?: boolean;
		loading?: boolean;
		emptyMessage?: string;
		id?: string;
		class?: string;
		onselect?: (value: string) => void;
	}

	let {
		value = $bindable(''),
		options,
		label,
		hideLabel = false,
		helper,
		error,
		placeholder = 'Search…',
		size = 'md',
		required = false,
		disabled = false,
		loading = false,
		emptyMessage = 'No matches found',
		id = uid('combobox'),
		class: klass,
		onselect
	}: Props = $props();

	// APG: editable combobox with list autocomplete.
	let listboxId = $derived(`${id}-listbox`);
	let open = $state(false);
	let query = $state(untrack(() => options.find((o) => o.value === value)?.label ?? ''));
	let activeIndex = $state(-1);
	let listEl = $state<HTMLUListElement | null>(null);

	let filtered = $derived(
		query.trim() === ''
			? options
			: options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()))
	);
	let selectable = $derived(filtered.filter((o) => !o.disabled));
	let activeId = $derived(
		activeIndex >= 0 && filtered[activeIndex] ? `${id}-opt-${activeIndex}` : undefined
	);

	function openList(index = -1) {
		if (disabled) return;
		open = true;
		activeIndex = index;
	}

	function closeList() {
		open = false;
		activeIndex = -1;
	}

	function move(delta: number) {
		if (!open) return openList(delta > 0 ? 0 : filtered.length - 1);
		if (filtered.length === 0) return;
		let next = activeIndex;
		for (let i = 0; i < filtered.length; i += 1) {
			next = (next + delta + filtered.length) % filtered.length;
			if (!filtered[next].disabled) break;
		}
		activeIndex = next;
		scrollActiveIntoView();
	}

	function scrollActiveIntoView() {
		tick().then(() => {
			listEl
				?.querySelector('[aria-selected="true"], [data-active="true"]')
				?.scrollIntoView({ block: 'nearest' });
		});
	}

	function choose(option: ComboboxOption) {
		if (option.disabled) return;
		value = option.value;
		query = option.label;
		onselect?.(option.value);
		closeList();
	}

	function onKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (e.altKey && !open) openList();
				else move(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				move(-1);
				break;
			case 'Home':
				if (!open) return;
				e.preventDefault();
				activeIndex = filtered.findIndex((o) => !o.disabled);
				scrollActiveIntoView();
				break;
			case 'End':
				if (!open) return;
				e.preventDefault();
				activeIndex = filtered.findLastIndex((o) => !o.disabled);
				scrollActiveIntoView();
				break;
			case 'Enter':
				if (open && activeIndex >= 0) {
					e.preventDefault();
					choose(filtered[activeIndex]);
				}
				break;
			case 'Escape':
				e.preventDefault();
				if (open) closeList();
				else {
					query = '';
					value = '';
				}
				break;
			case 'Tab':
				closeList();
				break;
		}
	}
</script>

<div class={cn('relative', klass)} use:clickOutside={closeList}>
	<FormField {label} {hideLabel} {helper} {error} {required} {id}>
		{#snippet children({ id, describedBy, invalid })}
			<div class="relative">
				<input
					{id}
					type="text"
					role="combobox"
					autocomplete="off"
					spellcheck="false"
					{placeholder}
					{disabled}
					{required}
					bind:value={query}
					oninput={() => openList(0)}
					onkeydown={onKeydown}
					onclick={() => openList()}
					aria-expanded={open}
					aria-controls={listboxId}
					aria-autocomplete="list"
					aria-activedescendant={activeId}
					aria-describedby={describedBy}
					aria-invalid={invalid || undefined}
					class={cn(controlBase, controlTone(invalid), controlSizes[size], 'pr-9')}
				/>
				<span class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-faint">
					<Icon name={open ? 'chevron-up' : 'chevron-down'} class="size-4" />
				</span>
			</div>
		{/snippet}
	</FormField>

	<ul
		bind:this={listEl}
		id={listboxId}
		role="listbox"
		aria-label={label}
		hidden={!open}
		class="absolute top-full right-0 left-0 z-40 mt-1.5 max-h-64 overflow-y-auto rounded-xl bg-surface p-1 shadow-lg"
	>
		{#if loading}
			<li class="px-3 py-2 text-sm text-muted" role="presentation">Loading…</li>
		{:else if filtered.length === 0}
			<li class="px-3 py-2 text-sm text-muted" role="presentation">{emptyMessage}</li>
		{:else}
			{#each filtered as option, i (option.value)}
				<li
					id="{id}-opt-{i}"
					role="option"
					aria-selected={option.value === value}
					aria-disabled={option.disabled || undefined}
					data-active={i === activeIndex}
					onpointerdown={(e) => {
						e.preventDefault();
						choose(option);
					}}
					onpointermove={() => (activeIndex = i)}
					class={cn(
						'flex cursor-pointer flex-col gap-0.5 rounded-lg px-3 py-2 text-sm',
						option.disabled && 'cursor-not-allowed text-faint',
						i === activeIndex && !option.disabled && 'bg-subtle',
						option.value === value && 'text-accent'
					)}
				>
					<span class="font-medium">{option.label}</span>
					{#if option.description}
						<span class="text-xs text-muted">{option.description}</span>
					{/if}
				</li>
			{/each}
		{/if}
	</ul>

	<span class="sr-only" role="status" aria-live="polite">
		{open ? `${selectable.length} suggestions available` : ''}
	</span>
</div>
