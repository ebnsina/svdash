<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import Button from '#lib/components/buttons/Button.svelte';

	export interface DangerAction {
		id: string;
		title: string;
		description: string;
		actionLabel: string;
		disabled?: boolean;
		/** Explains why the action is unavailable. */
		disabledReason?: string;
	}

	interface Props {
		actions: DangerAction[];
		title?: string;
		description?: string;
		class?: string;
		onaction?: (id: string) => void;
	}

	let {
		actions,
		title = 'Danger zone',
		description = 'These actions are permanent and cannot be undone.',
		class: klass,
		onaction
	}: Props = $props();
</script>

<section class={cn('rounded-xl border border-danger/40 bg-surface shadow-xs', klass)}>
	<header class="flex flex-col gap-1 rounded-t-xl bg-danger-soft px-5 py-4">
		<h3 class="text-sm font-semibold text-danger">{title}</h3>
		<p class="text-sm text-muted">{description}</p>
	</header>

	<ul>
		{#each actions as action (action.id)}
			<li
				class="flex flex-col gap-3 border-b border-border/60 px-5 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
			>
				<div class="flex min-w-0 flex-col gap-0.5">
					<p class="text-sm font-medium text-fg">{action.title}</p>
					<p class="text-sm text-muted">{action.description}</p>
					{#if action.disabled && action.disabledReason}
						<p id="{action.id}-reason" class="text-xs text-faint">{action.disabledReason}</p>
					{/if}
				</div>
				<!-- A blocked action stays focusable and points at its reason; `disabled`
				     would drop it from the tab order with no way to learn why. -->
				<Button
					variant="destructive"
					size="sm"
					aria-disabled={action.disabled || undefined}
					aria-describedby={action.disabled && action.disabledReason
						? `${action.id}-reason`
						: undefined}
					class="shrink-0 self-start sm:self-auto"
					onclick={() => !action.disabled && onaction?.(action.id)}
				>
					{action.actionLabel}
				</Button>
			</li>
		{/each}
	</ul>
</section>
