<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CommandPalette from './CommandPalette.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	const commands = [
		{
			id: 'go-dashboard',
			label: 'Go to dashboard',
			group: 'Navigation',
			icon: 'home' as const,
			shortcut: 'G D'
		},
		{
			id: 'go-invoices',
			label: 'Go to invoices',
			group: 'Navigation',
			icon: 'file' as const,
			shortcut: 'G I'
		},
		{
			id: 'go-team',
			label: 'Go to team',
			group: 'Navigation',
			icon: 'users' as const,
			shortcut: 'G T'
		},
		{
			id: 'new-invoice',
			label: 'Create invoice',
			group: 'Actions',
			icon: 'plus' as const,
			shortcut: '⌘N'
		},
		{ id: 'new-key', label: 'Create API key', group: 'Actions', icon: 'key' as const },
		{
			id: 'export',
			label: 'Export invoices as CSV',
			group: 'Actions',
			icon: 'download' as const,
			keywords: 'csv download'
		},
		{ id: 'theme', label: 'Toggle dark mode', group: 'Preferences', icon: 'moon' as const },
		{ id: 'logout', label: 'Sign out', group: 'Preferences', icon: 'log-out' as const }
	];

	const { Story } = defineMeta({
		title: 'Navigation/CommandPalette',
		component: CommandPalette,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { commands }
	});
</script>

<script lang="ts">
	let open = $state(false);
	let openEmpty = $state(true);
</script>

<Story name="Closed">
	{#snippet template()}
		<div class="flex flex-col items-start gap-3">
			<p class="text-sm text-muted">
				Press <kbd class="font-mono">⌘K</kbd> / <kbd class="font-mono">Ctrl K</kbd>, or use the
				button.
			</p>
			<Button variant="outline" iconLeft="search" onclick={() => (open = true)}
				>Open command palette</Button
			>
		</div>
		<CommandPalette bind:open {commands} />
	{/snippet}
</Story>

<Story name="Open">
	{#snippet template()}
		<p class="text-sm text-muted">Arrow keys move, Enter runs, Escape closes.</p>
		<CommandPalette open {commands} hotkey={false} />
	{/snippet}
</Story>

<Story name="No results">
	{#snippet template()}
		<p class="text-sm text-muted">An empty command set shows the fallback message.</p>
		<CommandPalette
			bind:open={openEmpty}
			commands={[]}
			hotkey={false}
			emptyMessage="Nothing matches that search."
		/>
	{/snippet}
</Story>
