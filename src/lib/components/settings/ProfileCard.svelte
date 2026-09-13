<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import Avatar from '#lib/components/data-display/Avatar.svelte';
	import Badge from '#lib/components/data-display/Badge.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	interface Props {
		name: string;
		email: string;
		role?: string;
		src?: string;
		joinedAt?: string;
		class?: string;
		onedit?: () => void;
		onchangephoto?: () => void;
	}

	let { name, email, role, src, joinedAt, class: klass, onedit, onchangephoto }: Props = $props();

	let joined = $derived(
		joinedAt
			? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
					new Date(joinedAt)
				)
			: undefined
	);
</script>

<section class={cn('rounded-xl bg-surface p-5 shadow-xs', klass)}>
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex items-center gap-4">
			<Avatar {name} {src} size="xl" />
			<div class="flex min-w-0 flex-col gap-1">
				<div class="flex flex-wrap items-center gap-2">
					<h3 class="truncate text-base font-semibold text-fg">{name}</h3>
					{#if role}
						<Badge tone="accent">{role}</Badge>
					{/if}
				</div>
				<p class="truncate text-sm text-muted">{email}</p>
				{#if joined}
					<p class="text-xs text-faint">Member since {joined}</p>
				{/if}
			</div>
		</div>

		<div class="flex shrink-0 flex-wrap gap-2">
			<Button variant="outline" size="sm" onclick={onchangephoto}>Change photo</Button>
			<Button variant="secondary" size="sm" iconLeft="edit" onclick={onedit}>Edit profile</Button>
		</div>
	</div>
</section>
