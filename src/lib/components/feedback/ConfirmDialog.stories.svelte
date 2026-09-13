<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ConfirmDialog from './ConfirmDialog.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/ConfirmDialog',
		component: ConfirmDialog,
		tags: ['autodocs'],
		args: { title: 'Discard changes?', message: 'Your edits will be lost.' }
	});
</script>

<script lang="ts">
	let plain = $state(false);
	let destructive = $state(false);
	let typed = $state(false);
	let busy = $state(false);
</script>

<Story name="Default">
	{#snippet template()}
		<Button variant="secondary" onclick={() => (plain = true)}>Discard changes</Button>
		<ConfirmDialog
			bind:open={plain}
			title="Discard changes?"
			message="Your edits to this invoice will be lost. This cannot be undone."
			confirmLabel="Discard"
		/>
	{/snippet}
</Story>

<Story name="Destructive">
	{#snippet template()}
		<Button variant="destructive" onclick={() => (destructive = true)}>Delete project</Button>
		<ConfirmDialog
			bind:open={destructive}
			destructive
			title="Delete this project?"
			message="All deployments, logs and environment variables are removed immediately."
			confirmLabel="Delete project"
		/>
	{/snippet}
</Story>

<Story name="Type to confirm">
	{#snippet template()}
		<Button variant="destructive" onclick={() => (typed = true)}>Delete workspace</Button>
		<ConfirmDialog
			bind:open={typed}
			destructive
			confirmPhrase="acme-production"
			title="Delete acme-production?"
			message="Everything in this workspace is deleted for every member. There is no recovery."
			confirmLabel="Delete forever"
		/>
	{/snippet}
</Story>

<Story name="Loading">
	{#snippet template()}
		<Button variant="destructive" onclick={() => (busy = true)}>Revoke all keys</Button>
		<ConfirmDialog
			bind:open={busy}
			destructive
			loading
			title="Revoke all API keys?"
			message="Any integration using these keys stops working straight away."
			confirmLabel="Revoking"
		/>
	{/snippet}
</Story>
