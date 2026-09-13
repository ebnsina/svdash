<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '#lib/icons/Icon.svelte';
	import { cn } from '#lib/utils/cn.js';
	import { formatRelative } from '#lib/utils/format.js';
	import IconButton from '#lib/components/buttons/IconButton.svelte';
	import DropdownMenu from '#lib/components/feedback/DropdownMenu.svelte';
	import Popover from '#lib/components/feedback/Popover.svelte';
	import Avatar from '#lib/components/data-display/Avatar.svelte';
	import type { MenuItem } from '#lib/components/feedback/DropdownMenu.svelte';
	import Breadcrumbs, { type Crumb } from '#lib/components/navigation/Breadcrumbs.svelte';

	export interface Notification {
		id: string;
		title: string;
		description?: string;
		at: string;
		unread?: boolean;
	}

	interface Props {
		user: { name: string; email: string; src?: string };
		/** Shown next to the sidebar toggle; the page keeps its own <h1>. */
		breadcrumbs?: Crumb[];
		notifications?: Notification[];
		userMenu?: MenuItem[];
		/** Label on the control that opens the command palette. */
		searchLabel?: string;
		/** Shows the hamburger below `lg`. */
		showMenuButton?: boolean;
		/** Drives the sidebar toggle that sits before the search field. */
		sidebarCollapsed?: boolean;
		onsidebartoggle?: () => void;
		theme?: 'light' | 'dark';
		class?: string;
		onmenu?: () => void;
		onsearch?: () => void;
		onthemetoggle?: () => void;
		actions?: Snippet;
	}

	let {
		user,
		breadcrumbs,
		notifications = [],
		userMenu = [
			{ label: 'Profile', icon: 'user' },
			{ label: 'Settings', icon: 'settings' },
			{ label: 'Sign out', icon: 'log-out', separatorBefore: true }
		],
		searchLabel = 'Search',
		showMenuButton = true,
		sidebarCollapsed = false,
		theme = 'light',
		class: klass,
		onmenu,
		onsearch,
		onthemetoggle,
		onsidebartoggle,
		actions
	}: Props = $props();

	let unread = $derived(notifications.filter((n) => n.unread).length);
</script>

<header
	class={cn(
		'@container sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 bg-chrome px-3 backdrop-blur-xl sm:gap-3 sm:px-4',
		klass
	)}
>
	{#if showMenuButton}
		<IconButton icon="menu" label="Open navigation" class="lg:hidden" onclick={onmenu} />
	{/if}

	{#if onsidebartoggle}
		<IconButton
			icon={sidebarCollapsed ? 'panel-left' : 'panel-left-close'}
			label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
			expanded={!sidebarCollapsed}
			class="hidden lg:inline-flex"
			onclick={onsidebartoggle}
		/>
	{/if}

	{#if breadcrumbs}
		<Breadcrumbs items={breadcrumbs} class="hidden min-w-0 md:block" />
	{/if}

	<div class="ml-auto flex items-center gap-1 sm:gap-2">
		<!-- A button, not an input: typing here would open the palette and lose the
		     keystrokes. This says what it does and hands over cleanly. -->
		<button
			type="button"
			onclick={onsearch}
			aria-haspopup="dialog"
			aria-label={searchLabel}
			class="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-subtle pr-2 pl-3 text-sm text-faint transition-colors hover:border-border-strong focus-visible:ring-focus"
		>
			<Icon name="search" class="size-4" />
			<span class="hidden @lg:inline">{searchLabel}</span>
			<kbd
				class="hidden rounded-xs bg-surface px-1.5 py-0.5 font-mono text-2xs text-muted @lg:block"
			>
				⌘K
			</kbd>
		</button>

		{#if actions}
			{@render actions()}
		{/if}

		<IconButton
			icon={theme === 'dark' ? 'sun' : 'moon'}
			label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
			onclick={onthemetoggle}
		/>

		<Popover label="Notifications" align="end" width="w-80">
			{#snippet trigger({ props })}
				<span class="relative inline-flex">
					<IconButton
						icon="bell"
						label="Notifications{unread ? `, ${unread} unread` : ''}"
						{...props}
					/>
					{#if unread > 0}
						<span
							aria-hidden="true"
							class="pointer-events-none absolute top-1.5 right-1.5 size-2 rounded-full bg-danger ring-2 ring-surface"
						></span>
					{/if}
				</span>
			{/snippet}
			{#snippet children()}
				<div class="flex items-center justify-between gap-2 pb-2">
					<p class="text-sm font-semibold text-fg">Notifications</p>
					{#if unread > 0}
						<span class="text-xs text-muted">{unread} unread</span>
					{/if}
				</div>
				{#if notifications.length === 0}
					<p class="py-6 text-center text-sm text-muted">You are all caught up.</p>
				{:else}
					<ul class="-mx-2 max-h-72 overflow-y-auto">
						{#each notifications as item (item.id)}
							<li class="flex gap-2.5 rounded-md px-2 py-2 hover:bg-subtle">
								<span
									aria-hidden="true"
									class={cn(
										'mt-1.5 size-1.5 shrink-0 rounded-full',
										item.unread ? 'bg-accent' : 'bg-transparent'
									)}
								></span>
								<span class="flex min-w-0 flex-col gap-0.5">
									<span class="text-sm text-fg">{item.title}</span>
									{#if item.description}
										<span class="text-xs text-muted">{item.description}</span>
									{/if}
									<time datetime={item.at} class="text-2xs text-faint"
										>{formatRelative(item.at)}</time
									>
								</span>
							</li>
						{/each}
					</ul>
				{/if}
			{/snippet}
		</Popover>

		<DropdownMenu label="Account menu" items={userMenu}>
			{#snippet trigger({ props })}
				<button
					type="button"
					{...props}
					class="flex items-center gap-2 rounded-md p-1 pr-1.5 text-left hover:bg-subtle focus-visible:ring-focus"
				>
					<Avatar name={user.name} src={user.src} size="sm" />
					<span class="hidden min-w-0 flex-col leading-tight @2xl:flex">
						<span class="truncate text-xs font-medium text-fg">{user.name}</span>
						<span class="truncate text-2xs text-muted">{user.email}</span>
					</span>
					<Icon name="chevron-down" class="hidden size-3.5 text-faint @2xl:block" />
				</button>
			{/snippet}
		</DropdownMenu>
	</div>
</header>
