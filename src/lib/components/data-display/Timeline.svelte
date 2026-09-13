<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';
	import { formatRelative, formatDate } from '#lib/utils/format.js';
	import Avatar from './Avatar.svelte';

	export interface TimelineEvent {
		id: string;
		title: string;
		description?: string;
		/** ISO timestamp. */
		at: string;
		icon?: IconName;
		tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
		actor?: { name: string; src?: string };
	}

	interface Props {
		events: TimelineEvent[];
		class?: string;
	}

	let { events, class: klass }: Props = $props();

	const tones = {
		neutral: 'bg-subtle text-muted ring-border',
		accent: 'bg-accent-soft text-accent ring-accent/30',
		success: 'bg-success-soft text-success ring-success/30',
		warning: 'bg-warn-soft text-warn ring-warn/30',
		danger: 'bg-danger-soft text-danger ring-danger/30'
	};
</script>

<ol class={cn('flex flex-col', klass)}>
	{#each events as event, i (event.id)}
		<li class="relative flex gap-3.5 pb-6 last:pb-0">
			{#if i < events.length - 1}
				<span aria-hidden="true" class="absolute top-8 bottom-0 left-4 w-px bg-border"></span>
			{/if}

			{#if event.actor}
				<Avatar name={event.actor.name} src={event.actor.src} size="sm" class="z-10" />
			{:else}
				<span
					class={cn(
						'z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-1',
						tones[event.tone ?? 'neutral']
					)}
				>
					<Icon name={event.icon ?? 'clock'} class="size-4" />
				</span>
			{/if}

			<div class="flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5">
				<p class="text-sm text-fg">{event.title}</p>
				{#if event.description}
					<p class="text-sm text-muted">{event.description}</p>
				{/if}
				<time
					datetime={event.at}
					title={formatDate(event.at, { dateStyle: 'full', timeStyle: 'short' })}
					class="text-xs text-faint"
				>
					{formatRelative(event.at)}
				</time>
			</div>
		</li>
	{/each}
</ol>
