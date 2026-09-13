<script lang="ts">
	import { cn } from '#lib/utils/cn.js';
	import { formatCurrency, formatDate, formatNumber } from '#lib/utils/format.js';
	import Badge from '#lib/components/data-display/Badge.svelte';
	import ProgressBar from '#lib/components/data-display/ProgressBar.svelte';
	import Button from '#lib/components/buttons/Button.svelte';

	export interface UsageMetric {
		label: string;
		used: number;
		limit: number;
		unit?: string;
	}

	interface Props {
		plan: string;
		price: number;
		interval?: 'month' | 'year';
		currency?: string;
		renewsAt?: string;
		usage?: UsageMetric[];
		status?: 'active' | 'trialing' | 'past_due' | 'canceled';
		class?: string;
		onupgrade?: () => void;
		onmanage?: () => void;
	}

	let {
		plan,
		price,
		interval = 'month',
		currency = 'USD',
		renewsAt,
		usage = [],
		status = 'active',
		class: klass,
		onupgrade,
		onmanage
	}: Props = $props();

	const statusTone = {
		active: 'success',
		trialing: 'info',
		past_due: 'danger',
		canceled: 'neutral'
	} as const;
	const statusLabel = {
		active: 'Active',
		trialing: 'Trial',
		past_due: 'Payment overdue',
		canceled: 'Cancelled'
	};

	function tone(metric: UsageMetric) {
		const ratio = metric.limit > 0 ? metric.used / metric.limit : 0;
		return ratio >= 0.95 ? 'danger' : ratio >= 0.8 ? 'warning' : 'accent';
	}
</script>

<section class={cn('flex flex-col gap-5 rounded-xl bg-surface p-5 shadow-xs', klass)}>
	<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
		<div class="flex flex-col gap-1.5">
			<div class="flex flex-wrap items-center gap-2">
				<h3 class="text-base font-semibold text-fg">{plan}</h3>
				<Badge tone={statusTone[status]} dot>{statusLabel[status]}</Badge>
			</div>
			<p class="font-mono text-2xl font-semibold text-fg tabular-nums">
				{formatCurrency(price, currency)}
				<span class="font-sans text-sm font-normal text-muted">/ {interval}</span>
			</p>
			{#if renewsAt}
				<p class="text-xs text-muted">
					{status === 'canceled' ? 'Access ends' : 'Renews'} on {formatDate(renewsAt)}
				</p>
			{/if}
		</div>

		<div class="flex shrink-0 flex-wrap gap-2">
			<Button variant="outline" size="sm" onclick={onmanage}>Manage billing</Button>
			<Button size="sm" onclick={onupgrade}>Upgrade plan</Button>
		</div>
	</div>

	{#if usage.length > 0}
		<div class="flex flex-col gap-4 border-t border-border/60 pt-4">
			{#each usage as metric (metric.label)}
				<ProgressBar
					label={metric.label}
					value={metric.used}
					max={metric.limit}
					tone={tone(metric)}
					size="sm"
					valueText="{formatNumber(metric.used)} of {formatNumber(metric.limit)}{metric.unit
						? ` ${metric.unit}`
						: ''}"
				/>
			{/each}
		</div>
	{/if}
</section>
