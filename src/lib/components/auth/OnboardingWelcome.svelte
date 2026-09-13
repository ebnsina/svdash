<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import Button from '#lib/components/buttons/Button.svelte';
	import ProgressBar from '#lib/components/data-display/ProgressBar.svelte';

	export interface OnboardingTask {
		id: string;
		label: string;
		description?: string;
		icon: IconName;
		done?: boolean;
	}

	interface Props {
		name: string;
		productName?: string;
		tasks: OnboardingTask[];
		onstart?: (id: string) => void;
		onskip?: () => void;
	}

	let { name, productName = 'Svdash', tasks, onstart, onskip }: Props = $props();

	let done = $derived(tasks.filter((t) => t.done).length);
	let next = $derived(tasks.find((t) => !t.done));
</script>

<div class="flex min-h-dvh items-center justify-center bg-canvas px-4 py-10">
	<div class="w-full max-w-xl">
		<div class="mb-6 flex flex-col gap-2 text-center">
			<span
				class="mx-auto flex size-11 items-center justify-center rounded-xl bg-accent text-accent-fg"
			>
				<Icon name="brain" class="size-6" />
			</span>
			<h1 class="text-2xl font-semibold tracking-tight font-display text-fg">Welcome, {name}</h1>
			<p class="text-sm text-muted">
				A few short steps and your {productName} workspace is ready.
			</p>
		</div>

		<div class="rounded-xl bg-surface p-5 shadow-md sm:p-6">
			<ProgressBar
				label="Setup progress"
				value={done}
				max={tasks.length}
				valueText="{done} of {tasks.length} done"
				size="sm"
				class="mb-5"
			/>

			<ul class="flex flex-col gap-2">
				{#each tasks as task (task.id)}
					<li>
						<button
							type="button"
							onclick={() => onstart?.(task.id)}
							class="flex w-full items-center gap-3.5 rounded-xl bg-subtle/60 px-4 py-3 text-left transition-colors hover:bg-subtle focus-visible:ring-focus"
						>
							<span
								class="flex size-9 shrink-0 items-center justify-center rounded-full {task.done
									? 'bg-success-soft text-success'
									: 'bg-subtle text-muted'}"
							>
								<Icon name={task.done ? 'check' : task.icon} class="size-4.5" />
							</span>
							<span class="flex min-w-0 flex-1 flex-col gap-0.5">
								<span
									class="text-sm font-medium {task.done ? 'text-muted line-through' : 'text-fg'}"
								>
									{task.label}
								</span>
								{#if task.description}
									<span class="text-xs text-muted">{task.description}</span>
								{/if}
							</span>
							<Icon name="chevron-right" class="size-4 shrink-0 text-faint" />
							<span class="sr-only">{task.done ? 'Completed' : 'Not started'}</span>
						</button>
					</li>
				{/each}
			</ul>

			<div class="mt-5 flex flex-col gap-2 sm:flex-row">
				<Button fullWidth onclick={() => next && onstart?.(next.id)} disabled={!next}>
					{next ? `Continue: ${next.label}` : 'All set'}
				</Button>
				<Button fullWidth variant="ghost" onclick={onskip}>Skip for now</Button>
			</div>
		</div>
	</div>
</div>
