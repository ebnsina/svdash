<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './Tooltip.svelte';
	import IconButton from '#lib/components/buttons/IconButton.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		argTypes: {
			placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] }
		},
		args: { content: 'Copy the API key to your clipboard', placement: 'top' }
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="p-10">
			<Tooltip {...args}>
				{#snippet children({ describedBy })}
					<span aria-describedby={describedBy} class="contents">
						<IconButton icon="copy" label="Copy API key" variant="outline" />
					</span>
				{/snippet}
			</Tooltip>
		</div>
	{/snippet}
</Story>

<Story name="Placements">
	{#snippet template()}
		<div class="grid grid-cols-2 gap-10 p-16">
			{#each ['top', 'bottom', 'left', 'right'] as const as placement (placement)}
				<Tooltip content="Placed {placement}" {placement}>
					{#snippet children({ describedBy })}
						<span aria-describedby={describedBy} class="contents">
							<Button variant="outline" size="sm">{placement}</Button>
						</span>
					{/snippet}
				</Tooltip>
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="Long content">
	{#snippet template()}
		<div class="p-16">
			<Tooltip
				content="Rotating a key invalidates the old one immediately. Update every integration before you rotate."
			>
				{#snippet children({ describedBy })}
					<span aria-describedby={describedBy} class="contents">
						<Button variant="outline">Rotate key</Button>
					</span>
				{/snippet}
			</Tooltip>
		</div>
	{/snippet}
</Story>
