<script lang="ts">
	import { untrack, tick } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import {
		addDays,
		addMonths,
		fromISO,
		fullDateLabel,
		isSameDay,
		monthGrid,
		monthLabel,
		toISO,
		weekdayLabels
	} from './date.js';

	interface Props {
		/** ISO `YYYY-MM-DD`. */
		selected?: string;
		rangeStart?: string;
		rangeEnd?: string;
		min?: string;
		max?: string;
		/** Highlights the hovered/focused day as a provisional range end. */
		mode?: 'single' | 'range';
		autofocus?: boolean;
		class?: string;
		onselect?: (iso: string) => void;
	}

	let {
		selected,
		rangeStart,
		rangeEnd,
		min,
		max,
		mode = 'single',
		autofocus = false,
		class: klass,
		onselect
	}: Props = $props();

	const gridId = uid('calendar');
	const today = new Date();

	const initial = () =>
		untrack(() => (selected ? fromISO(selected) : rangeStart ? fromISO(rangeStart) : today));
	let cursor = $state(initial());
	let focused = $state(initial());
	let gridEl = $state<HTMLDivElement | null>(null);
	let announcement = $state('');

	let weeks = $derived(monthGrid(cursor));

	function disabled(d: Date) {
		const iso = toISO(d);
		return (min !== undefined && iso < min) || (max !== undefined && iso > max);
	}

	function inRange(d: Date) {
		if (mode !== 'range' || !rangeStart || !rangeEnd) return false;
		const iso = toISO(d);
		return iso > rangeStart && iso < rangeEnd;
	}

	function isEdge(d: Date) {
		const iso = toISO(d);
		return iso === rangeStart || iso === rangeEnd || iso === selected;
	}

	function focusDay(d: Date) {
		focused = d;
		if (d.getMonth() !== cursor.getMonth() || d.getFullYear() !== cursor.getFullYear()) {
			cursor = new Date(d.getFullYear(), d.getMonth(), 1);
			announcement = monthLabel(cursor);
		}
		tick().then(() => gridEl?.querySelector<HTMLElement>('[tabindex="0"]')?.focus());
	}

	function onKeydown(e: KeyboardEvent) {
		const moves: Record<string, () => Date> = {
			ArrowLeft: () => addDays(focused, -1),
			ArrowRight: () => addDays(focused, 1),
			ArrowUp: () => addDays(focused, -7),
			ArrowDown: () => addDays(focused, 7),
			Home: () => addDays(focused, -((focused.getDay() + 6) % 7)),
			End: () => addDays(focused, 6 - ((focused.getDay() + 6) % 7)),
			PageUp: () => addMonths(focused, e.shiftKey ? -12 : -1),
			PageDown: () => addMonths(focused, e.shiftKey ? 12 : 1)
		};
		const next = moves[e.key];
		if (next) {
			e.preventDefault();
			focusDay(next());
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (!disabled(focused)) onselect?.(toISO(focused));
		}
	}

	function shiftMonth(n: number) {
		cursor = addMonths(cursor, n);
		announcement = monthLabel(cursor);
	}

	$effect(() => {
		if (autofocus) tick().then(() => gridEl?.querySelector<HTMLElement>('[tabindex="0"]')?.focus());
	});
</script>

<div class={cn('w-[17.5rem] select-none', klass)}>
	<div class="mb-2 flex items-center justify-between">
		<button
			type="button"
			onclick={() => shiftMonth(-1)}
			aria-label="Previous month"
			class="rounded-md p-1.5 text-muted hover:bg-subtle hover:text-fg focus-visible:ring-focus"
		>
			<Icon name="chevron-left" class="size-4" />
		</button>
		<span id="{gridId}-label" class="text-sm font-semibold text-fg" aria-live="polite">
			{monthLabel(cursor)}
		</span>
		<button
			type="button"
			onclick={() => shiftMonth(1)}
			aria-label="Next month"
			class="rounded-md p-1.5 text-muted hover:bg-subtle hover:text-fg focus-visible:ring-focus"
		>
			<Icon name="chevron-right" class="size-4" />
		</button>
	</div>

	<div
		bind:this={gridEl}
		role="grid"
		tabindex="-1"
		aria-labelledby="{gridId}-label"
		onkeydown={onKeydown}
		class="grid grid-cols-7 gap-0.5"
	>
		<div role="row" class="contents">
			{#each weekdayLabels as day (day)}
				<span
					role="columnheader"
					aria-label={day}
					class="pb-1 text-center text-2xs font-medium tracking-wide text-faint uppercase"
				>
					{day.slice(0, 2)}
				</span>
			{/each}
		</div>

		{#each weeks as week, w (w)}
			<div role="row" class="contents">
				{#each week as day (toISO(day))}
					{@const outside = day.getMonth() !== cursor.getMonth()}
					{@const isDisabled = disabled(day)}
					<div role="gridcell" aria-selected={isEdge(day)} class="contents">
						<button
							type="button"
							tabindex={isSameDay(day, focused) ? 0 : -1}
							disabled={isDisabled}
							aria-label={fullDateLabel(day)}
							aria-current={isSameDay(day, today) ? 'date' : undefined}
							onclick={() => {
								focused = day;
								onselect?.(toISO(day));
							}}
							class={cn(
								'flex h-11 items-center justify-center rounded-md font-mono text-xs tabular-nums transition-colors focus-visible:ring-focus',
								!isEdge(day) && (outside ? 'text-faint' : 'text-fg'),
								isDisabled && 'cursor-not-allowed text-faint line-through',
								!isDisabled && !isEdge(day) && 'hover:bg-subtle',
								inRange(day) && 'bg-accent-soft text-accent',
								isEdge(day) && 'bg-accent font-semibold text-accent-fg hover:bg-accent-hover',
								isSameDay(day, today) && !isEdge(day) && 'ring-1 ring-border-strong ring-inset'
							)}
						>
							{day.getDate()}
						</button>
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<span class="sr-only" role="status" aria-live="polite">{announcement}</span>
</div>
