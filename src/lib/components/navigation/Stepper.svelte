<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';

	export interface Step {
		id: string;
		label: string;
		description?: string;
	}

	interface Props {
		steps: Step[];
		/** Index of the step in progress. */
		current?: number;
		orientation?: 'horizontal' | 'vertical';
		/** Lets the user jump back to a completed step. */
		navigable?: boolean;
		label?: string;
		class?: string;
		onnavigate?: (index: number) => void;
	}

	let {
		steps,
		current = $bindable(0),
		orientation = 'horizontal',
		navigable = false,
		label = 'Progress',
		class: klass,
		onnavigate
	}: Props = $props();

	function status(i: number) {
		return i < current ? 'complete' : i === current ? 'current' : 'upcoming';
	}

	function go(i: number) {
		if (!navigable || i > current) return;
		current = i;
		onnavigate?.(i);
	}
</script>

<nav aria-label={label} class={klass}>
	<ol
		class={cn(
			'flex',
			orientation === 'vertical' ? 'flex-col' : 'flex-col gap-4 sm:flex-row sm:items-start'
		)}
	>
		{#each steps as step, i (step.id)}
			{@const state = status(i)}
			<li
				class={cn(
					'relative flex gap-3',
					orientation === 'vertical' ? 'pb-7 last:pb-0' : 'flex-1 items-start'
				)}
			>
				{#if orientation === 'vertical' && i < steps.length - 1}
					<span
						aria-hidden="true"
						class={cn(
							'absolute top-9 bottom-1 left-[0.9375rem] w-px',
							i < current ? 'bg-accent' : 'bg-border'
						)}
					></span>
				{/if}

				{#snippet body()}
					<span
						aria-hidden="true"
						class={cn(
							'flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
							state === 'complete' && 'border-accent bg-accent text-accent-fg',
							state === 'current' && 'border-accent text-accent',
							state === 'upcoming' && 'border-border text-faint'
						)}
					>
						{#if state === 'complete'}
							<Icon name="check" class="size-4" strokeWidth={2.5} />
						{:else}
							{i + 1}
						{/if}
					</span>

					<span class="flex min-w-0 flex-col gap-0.5 pt-1">
						<span
							class={cn('text-sm font-medium', state === 'upcoming' ? 'text-faint' : 'text-fg')}
							aria-current={state === 'current' ? 'step' : undefined}
						>
							{step.label}
							<span class="sr-only">
								— {state === 'complete'
									? 'completed'
									: state === 'current'
										? 'current step'
										: 'not started'}
							</span>
						</span>
						{#if step.description}
							<span class="text-xs text-muted">{step.description}</span>
						{/if}
					</span>
				{/snippet}

				{#if navigable && i <= current}
					<button
						type="button"
						onclick={() => go(i)}
						class={cn(
							'flex shrink-0 cursor-pointer items-start gap-3 rounded-md text-left focus-visible:ring-focus',
							orientation === 'horizontal' && 'flex-1'
						)}
					>
						{@render body()}
					</button>
				{:else}
					<span
						class={cn('flex shrink-0 items-start gap-3', orientation === 'horizontal' && 'flex-1')}
					>
						{@render body()}
					</span>
				{/if}

				{#if orientation === 'horizontal' && i < steps.length - 1}
					<span
						aria-hidden="true"
						class={cn('mt-4 hidden h-px flex-1 sm:block', i < current ? 'bg-accent' : 'bg-border')}
					></span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
