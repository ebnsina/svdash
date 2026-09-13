<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import Avatar from './Avatar.svelte';

	export interface Person {
		name: string;
		src?: string;
	}

	interface Props {
		people: Person[];
		max?: number;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		label?: string;
		class?: string;
	}

	let { people, max = 4, size = 'sm', label = 'Team members', class: klass }: Props = $props();

	let shown = $derived(people.slice(0, max));
	let overflow = $derived(Math.max(0, people.length - max));
	const overflowSizes = {
		xs: 'size-6 text-2xs',
		sm: 'size-8 text-xs',
		md: 'size-10 text-xs',
		lg: 'size-12 text-sm'
	};
</script>

<ul class={cn('flex items-center -space-x-2', klass)} aria-label={label}>
	{#each shown as person (person.name)}
		<li class="rounded-full ring-2 ring-surface">
			<Avatar name={person.name} src={person.src} {size} />
		</li>
	{/each}
	{#if overflow > 0}
		<li
			class={cn(
				'flex items-center justify-center rounded-full bg-subtle font-medium text-muted ring-2 ring-surface',
				overflowSizes[size]
			)}
		>
			<span aria-hidden="true">+{overflow}</span>
			<span class="sr-only">and {overflow} more</span>
		</li>
	{/if}
</ul>
