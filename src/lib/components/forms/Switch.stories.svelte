<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switch from './Switch.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Switch',
		component: Switch,
		tags: ['autodocs'],
		argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
		args: { label: 'Two-factor authentication', class: 'w-96 max-w-full' }
	});
</script>

<Story name="Default" />
<Story name="On" args={{ checked: true }} />
<Story
	name="With description"
	args={{ checked: true, description: 'Require a code from your authenticator app at sign in.' }}
/>
<Story name="Small" args={{ size: 'sm' }} />
<Story name="Leading" args={{ leading: true, label: 'Show archived projects' }} />
<Story
	name="Disabled"
	args={{ disabled: true, description: 'Enforced by your workspace owner.' }}
/>
<Story name="Settings list">
	{#snippet template()}
		<div
			class="flex w-96 max-w-full flex-col divide-y divide-border/60 rounded-xl bg-surface shadow-xs"
		>
			<div class="p-4">
				<Switch label="Email notifications" checked description="Deploys, incidents and billing." />
			</div>
			<div class="p-4"><Switch label="Desktop notifications" /></div>
			<div class="p-4"><Switch label="Weekly digest" checked /></div>
		</div>
	{/snippet}
</Story>
