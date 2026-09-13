<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { formatRelative } from '#lib/utils/format.js';
	import Avatar from '#lib/components/data-display/Avatar.svelte';
	import Badge from '#lib/components/data-display/Badge.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import IconButton from '#lib/components/buttons/IconButton.svelte';
	import DropdownMenu from '#lib/components/feedback/DropdownMenu.svelte';
	import EmptyState from '#lib/components/data-display/EmptyState.svelte';

	export type Role = 'owner' | 'admin' | 'member' | 'viewer';

	export interface Member {
		id: string;
		name: string;
		email: string;
		role: Role;
		src?: string;
		/** Shows the pending-invite treatment. */
		pending?: boolean;
		lastActiveAt?: string;
	}

	interface Props {
		members: Member[];
		/** Hides role editing and removal. */
		readonly?: boolean;
		class?: string;
		onchangerole?: (id: string, role: Role) => void;
		onremove?: (id: string) => void;
		oninvite?: () => void;
	}

	let {
		members,
		readonly = false,
		class: klass,
		onchangerole,
		onremove,
		oninvite
	}: Props = $props();

	const roleTone = {
		owner: 'accent',
		admin: 'info',
		member: 'neutral',
		viewer: 'neutral'
	} as const;
	const roleLabel = { owner: 'Owner', admin: 'Admin', member: 'Member', viewer: 'Viewer' };
	const roles: Role[] = ['admin', 'member', 'viewer'];
</script>

<section class={cn('rounded-xl bg-surface shadow-xs', klass)}>
	<header class="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
		<h3 class="text-sm font-semibold text-fg">
			Team members
			<span class="ml-1 font-normal text-muted">({members.length})</span>
		</h3>
		{#if !readonly}
			<Button size="sm" iconLeft="plus" onclick={oninvite}>Invite</Button>
		{/if}
	</header>

	{#if members.length === 0}
		<EmptyState
			bordered={false}
			size="sm"
			icon="users"
			title="No teammates yet"
			description="Invite someone to share this workspace."
		/>
	{:else}
		<ul>
			{#each members as member (member.id)}
				<li
					class="flex flex-col gap-3 border-b border-border/60 px-4 py-3 last:border-0 sm:flex-row sm:items-center sm:gap-4"
				>
					<Avatar name={member.name} src={member.src} size="md" />

					<div class="flex min-w-0 flex-1 flex-col gap-0.5">
						<div class="flex flex-wrap items-center gap-2">
							<span class="truncate text-sm font-medium text-fg">{member.name}</span>
							{#if member.pending}
								<Badge tone="warning" size="sm">Invite pending</Badge>
							{/if}
						</div>
						<span class="truncate text-xs text-muted">{member.email}</span>
						{#if member.lastActiveAt}
							<span class="text-2xs text-faint">Active {formatRelative(member.lastActiveAt)}</span>
						{/if}
					</div>

					<div class="flex shrink-0 items-center gap-2">
						<Badge tone={roleTone[member.role]}>{roleLabel[member.role]}</Badge>

						{#if !readonly && member.role !== 'owner'}
							<DropdownMenu
								label="Manage {member.name}"
								items={[
									...roles.map((role) => ({
										label: `Make ${roleLabel[role].toLowerCase()}`,
										icon: (member.role === role ? 'check' : 'user') as 'check' | 'user',
										disabled: member.role === role,
										onselect: () => onchangerole?.(member.id, role)
									})),
									{
										label: 'Remove from workspace',
										icon: 'trash' as const,
										destructive: true,
										separatorBefore: true,
										onselect: () => onremove?.(member.id)
									}
								]}
							>
								{#snippet trigger({ props })}
									<IconButton
										icon="more-horizontal"
										label="Manage {member.name}"
										size="sm"
										{...props}
									/>
								{/snippet}
							</DropdownMenu>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</section>
