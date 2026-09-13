<script lang="ts">
	import { cn } from '#lib/utils/cn.js';

	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	type Status = 'online' | 'away' | 'offline' | 'busy';

	interface Props {
		name: string;
		src?: string;
		size?: Size;
		shape?: 'circle' | 'square';
		status?: Status;
		class?: string;
	}

	let { name, src, size = 'md', shape = 'circle', status, class: klass }: Props = $props();

	const sizes: Record<Size, string> = {
		xs: 'size-6 text-2xs',
		sm: 'size-8 text-xs',
		md: 'size-10 text-sm',
		lg: 'size-12 text-base',
		xl: 'size-16 text-xl'
	};
	const dotSizes: Record<Size, string> = {
		xs: 'size-1.5',
		sm: 'size-2',
		md: 'size-2.5',
		lg: 'size-3',
		xl: 'size-3.5'
	};
	const statusColors: Record<Status, string> = {
		online: 'bg-success',
		away: 'bg-warn',
		busy: 'bg-danger',
		offline: 'bg-faint'
	};
	const statusLabels: Record<Status, string> = {
		online: 'Online',
		away: 'Away',
		busy: 'Busy',
		offline: 'Offline'
	};

	let initials = $derived(
		name
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase() ?? '')
			.join('')
	);
	let failed = $state(false);
</script>

<span class={cn('relative inline-flex shrink-0', klass)}>
	<span
		class={cn(
			'flex items-center justify-center overflow-hidden bg-subtle font-medium text-muted select-none',
			shape === 'circle' ? 'rounded-full' : 'rounded-md',
			sizes[size]
		)}
	>
		{#if src && !failed}
			<img {src} alt={name} onerror={() => (failed = true)} class="size-full object-cover" />
		{:else}
			<span aria-hidden="true">{initials || '?'}</span>
			<span class="sr-only">{name}</span>
		{/if}
	</span>

	{#if status}
		<span
			class={cn(
				'absolute right-0 bottom-0 rounded-full ring-2 ring-surface',
				dotSizes[size],
				statusColors[status]
			)}
		>
			<span class="sr-only">{statusLabels[status]}</span>
		</span>
	{/if}
</span>
