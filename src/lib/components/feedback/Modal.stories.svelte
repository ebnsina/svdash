<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from './Modal.svelte';
	import Button from '#lib/components/buttons/Button.svelte';
	import Input from '#lib/components/forms/Input.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Modal',
		component: Modal,
		tags: ['autodocs'],
		parameters: { layout: 'centered' },
		argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] } },
		args: { title: 'Rename workspace', size: 'md' }
	});
</script>

<script lang="ts">
	let open = $state(false);
	let openForm = $state(false);
	let openLong = $state(false);
	let openLocked = $state(false);
</script>

<Story name="Default">
	{#snippet template()}
		<Button onclick={() => (open = true)}>Open dialog</Button>
		<Modal
			bind:open
			title="Rename workspace"
			description="This name is visible to everyone on your team."
		>
			<p>
				Focus is trapped inside the dialog and returns to the trigger when it closes. Escape
				dismisses it.
			</p>
			{#snippet footer()}
				<Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
				<Button onclick={() => (open = false)}>Save</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="With form">
	{#snippet template()}
		<Button onclick={() => (openForm = true)}>Invite teammate</Button>
		<Modal bind:open={openForm} title="Invite a teammate" size="sm">
			<div class="flex flex-col gap-4">
				<Input label="Email address" type="email" placeholder="name@company.com" />
				<Input
					label="Job title"
					placeholder="Support lead"
					helper="Optional — helps teammates find each other."
				/>
			</div>
			{#snippet footer()}
				<Button variant="secondary" onclick={() => (openForm = false)}>Cancel</Button>
				<Button onclick={() => (openForm = false)}>Send invite</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="Scrolling content">
	{#snippet template()}
		<Button onclick={() => (openLong = true)}>Read the changelog</Button>
		<Modal bind:open={openLong} title="Changelog" size="lg">
			<div class="flex flex-col gap-4">
				{#each { length: 14 } as _, i (i)}
					<p class="text-muted">
						<span class="font-medium text-fg">Release 2.{14 - i}.0</span> — the body scrolls while the
						header and footer stay put, so the close control is always reachable.
					</p>
				{/each}
			</div>
			{#snippet footer()}
				<Button onclick={() => (openLong = false)}>Close</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="Not dismissible">
	{#snippet template()}
		<Button onclick={() => (openLocked = true)}>Finish setup</Button>
		<Modal bind:open={openLocked} title="Finish setting up billing" dismissible={false} size="sm">
			<p>Escape and backdrop clicks are ignored — the only way out is an explicit choice.</p>
			{#snippet footer()}
				<Button onclick={() => (openLocked = false)}>Got it</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>
