<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte';
	import type { IconName } from '#lib/icons/registry.js';
	import { cn } from '#lib/utils/cn.js';
	import { formatPercent } from '#lib/utils/format.js';
	import Skeleton from '#lib/components/feedback/Skeleton.svelte';
	import Sparkline from './Sparkline.svelte';

	interface Props {
		label: string;
		value: string;
		/** Fractional change, e.g. 0.128 for +12.8%. */
		trend?: number;
		trendLabel?: string;
		/** Which direction is good — spend going down is a win. */
		trendPolarity?: 'up-good' | 'down-good';
		icon?: IconName;
		sparkline?: number[];
		loading?: boolean;
		error?: string;
		class?: string;
	}

	let {
		label,
		value,
		trend,
		trendLabel = 'vs. last month',
		trendPolarity = 'up-good',
		icon,
		sparkline,
		loading = false,
		error,
		class: klass
	}: Props = $props();

	let good = $derived(
		trend === undefined || trend === 0 ? null : trendPolarity === 'up-good' ? trend > 0 : trend < 0
	);
	let trendColor = $derived(good === null ? 'text-muted' : good ? 'text-success' : 'text-danger');
	let sparkColor = $derived(
		good === null ? 'var(--c-accent)' : good ? 'var(--c-success)' : 'var(--c-danger)'
	);
</script>

<div class={cn('flex flex-col gap-3 rounded-xl bg-surface p-4 shadow-xs sm:p-5', klass)}>
	<div class="flex items-start justify-between gap-3">
		<p class="text-sm font-medium text-muted">{label}</p>
		{#if icon}
			<span
				class="flex size-8 shrink-0 items-center justify-center rounded-md bg-subtle text-muted"
			>
				<Icon name={icon} class="size-4" />
			</span>
		{/if}
	</div>

	{#if loading}
		<Skeleton lines={2} class="max-w-40" />
	{:else if error}
		<p class="flex items-center gap-1.5 text-sm text-danger" role="status">
			<Icon name="alert-circle" class="size-4 shrink-0" />
			{error}
		</p>
	{:else}
		<p
			class="font-mono text-2xl font-semibold tracking-tight break-words text-fg tabular-nums sm:text-3xl"
		>
			{value}
		</p>

		<!-- HIG: stack secondary items under the text rather than letting them crowd it. -->
		{#if trend !== undefined}
			<p class="flex flex-wrap items-baseline gap-x-1.5 text-xs">
				<span class={cn('inline-flex items-center gap-0.5 font-medium', trendColor)}>
					<Icon name={trend >= 0 ? 'arrow-up' : 'arrow-down'} class="size-3" strokeWidth={2.5} />
					{formatPercent(Math.abs(trend))}
				</span>
				<span class="text-faint">{trendLabel}</span>
			</p>
		{/if}

		{#if sparkline && sparkline.length > 1}
			<Sparkline values={sparkline} color={sparkColor} class="mt-auto h-8 w-full" />
		{/if}
	{/if}
</div>
