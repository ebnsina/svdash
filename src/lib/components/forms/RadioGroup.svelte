<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { uid } from '#lib/utils/uid.js';
	import Radio from './Radio.svelte';

	export interface RadioOption {
		value: string;
		label: string;
		description?: string;
		disabled?: boolean;
	}

	interface Props {
		value?: string;
		options: RadioOption[];
		legend: string;
		hideLegend?: boolean;
		helper?: string;
		error?: string;
		orientation?: 'vertical' | 'horizontal';
		name?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		options,
		legend,
		hideLegend = false,
		helper,
		error,
		orientation = 'vertical',
		name = uid('radiogroup'),
		class: klass
	}: Props = $props();

	let describedBy = $derived(
		[error && `${name}-error`, helper && `${name}-helper`].filter(Boolean).join(' ') || undefined
	);
</script>

<fieldset class={cn('flex flex-col gap-2.5', klass)} aria-describedby={describedBy}>
	<legend class={cn('mb-0.5 text-sm font-medium text-fg', hideLegend && 'sr-only')}>
		{legend}
	</legend>
	<div
		class={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap gap-5')}
	>
		{#each options as option (option.value)}
			<Radio
				bind:group={value}
				{name}
				value={option.value}
				label={option.label}
				description={option.description}
				disabled={option.disabled}
			/>
		{/each}
	</div>
	{#if error}
		<p id="{name}-error" class="text-xs text-danger">{error}</p>
	{/if}
	{#if helper}
		<p id="{name}-helper" class="text-xs text-muted">{helper}</p>
	{/if}
</fieldset>
