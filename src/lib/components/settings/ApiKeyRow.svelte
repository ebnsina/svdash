<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import { formatDate, formatRelative } from '#lib/utils/format.js';
	import Badge from '#lib/components/data-display/Badge.svelte';
	import IconButton from '#lib/components/buttons/IconButton.svelte';
	import DropdownMenu from '#lib/components/feedback/DropdownMenu.svelte';

	interface Props {
		name: string;
		/** The full secret; only shown when revealed. */
		value: string;
		/** Always-visible prefix, e.g. `svd_live_`. Keep sample keys clearly fictional:
		 * a fixture shaped like a real provider's key trips secret scanners. */
		prefix?: string;
		environment?: 'live' | 'test';
		createdAt?: string;
		lastUsedAt?: string;
		revealed?: boolean;
		class?: string;
		onregenerate?: () => void;
		onrevoke?: () => void;
	}

	let {
		name,
		value,
		prefix = 'svd_live_',
		environment = 'live',
		createdAt,
		lastUsedAt,
		revealed = $bindable(false),
		class: klass,
		onregenerate,
		onrevoke
	}: Props = $props();

	const id = uid('apikey');
	let announcement = $state('');
	let masked = $derived(`${prefix}${'•'.repeat(24)}`);

	async function copy() {
		try {
			await navigator.clipboard.writeText(value);
			announcement = `${name} copied to clipboard`;
		} catch {
			announcement = 'Could not copy — copy it manually instead';
		}
		setTimeout(() => (announcement = ''), 4000);
	}
</script>

<div
	class={cn(
		'flex flex-col gap-3 border-b border-border/60 px-4 py-3.5 last:border-0 sm:flex-row sm:items-center sm:gap-4',
		klass
	)}
>
	<div class="flex min-w-0 flex-1 flex-col gap-1.5">
		<div class="flex flex-wrap items-center gap-2">
			<span class="text-sm font-medium text-fg">{name}</span>
			<Badge tone={environment === 'live' ? 'success' : 'neutral'} size="sm">{environment}</Badge>
		</div>

		<code
			id="{id}-value"
			class="block truncate rounded-xs bg-subtle px-2 py-1 font-mono text-xs text-muted"
		>
			{revealed ? value : masked}
		</code>

		<p class="flex flex-wrap gap-x-3 text-2xs text-faint">
			{#if createdAt}
				<span>Created {formatDate(createdAt)}</span>
			{/if}
			{#if lastUsedAt}
				<span>Last used {formatRelative(lastUsedAt)}</span>
			{:else}
				<span>Never used</span>
			{/if}
		</p>
	</div>

	<div class="flex shrink-0 items-center gap-1">
		<IconButton
			icon={revealed ? 'eye-off' : 'eye'}
			label={revealed ? `Hide ${name}` : `Reveal ${name}`}
			size="sm"
			pressed={revealed}
			controls="{id}-value"
			onclick={() => {
				revealed = !revealed;
				announcement = revealed ? `${name} revealed` : `${name} hidden`;
			}}
		/>
		<IconButton icon="copy" label="Copy {name}" size="sm" onclick={copy} />
		<DropdownMenu
			label="Options for {name}"
			items={[
				{ label: 'Regenerate key', icon: 'refresh', onselect: onregenerate },
				{
					label: 'Revoke key',
					icon: 'trash',
					destructive: true,
					separatorBefore: true,
					onselect: onrevoke
				}
			]}
		>
			{#snippet trigger({ props })}
				<IconButton icon="more-horizontal" label="Options for {name}" size="sm" {...props} />
			{/snippet}
		</DropdownMenu>
	</div>

	<span class="sr-only" role="status" aria-live="polite">{announcement}</span>
</div>
