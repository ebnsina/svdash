<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from '#lib/icons/Icon.svelte';
	import { iconNames } from '#lib/icons/registry.js';

	const { Story } = defineMeta({
		title: 'Design Tokens/Overview',
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' }
	});

	const scale: [string, string][] = [
		['text-3xl', '28px'],
		['text-2xl', '22px'],
		['text-xl', '19px'],
		['text-lg', '17px'],
		['text-base', '15px'],
		['text-sm', '13px'],
		['text-xs', '11px'],
		['text-2xs', '10px']
	];

	const surfaces = ['canvas', 'surface', 'subtle', 'border', 'border-strong'];
	const text = ['fg', 'muted', 'faint'];
	const accents = ['accent', 'accent-hover', 'accent-soft', 'accent-fg'];
	const statuses = [
		'success',
		'success-soft',
		'warn',
		'warn-soft',
		'danger',
		'danger-soft',
		'info',
		'info-soft'
	];
	const radii = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
	const shadows = ['xs', 'sm', 'md', 'lg'];
</script>

{#snippet swatch(name: string)}
	<div class="flex flex-col gap-1.5">
		<div
			class="h-14 rounded-md border border-border"
			style:background-color="var(--c-{name})"
		></div>
		<code class="font-mono text-2xs text-muted">{name}</code>
	</div>
{/snippet}

<Story name="Colours">
	{#snippet template()}
		<div class="flex flex-col gap-8 bg-canvas p-6">
			<section>
				<h2 class="mb-3 text-sm font-semibold text-fg">Surfaces</h2>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
					{#each surfaces as name (name)}{@render swatch(name)}{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-3 text-sm font-semibold text-fg">Text</h2>
				<div class="flex flex-col gap-1">
					{#each text as name (name)}
						<p class="text-sm" style:color="var(--c-{name})">
							The quick brown fox — <code class="font-mono text-2xs">text-{name}</code>
						</p>
					{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-3 text-sm font-semibold text-fg">Accent</h2>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{#each accents as name (name)}{@render swatch(name)}{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-3 text-sm font-semibold text-fg">Status</h2>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{#each statuses as name (name)}{@render swatch(name)}{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-3 text-sm font-semibold text-fg">Charts</h2>
				<p class="mb-3 text-xs text-muted">
					Chart colours are CSS custom properties (<code class="font-mono">--c-chart-1…5</code>) so
					SVG can read them directly and they follow the theme.
				</p>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
					{#each [1, 2, 3, 4, 5] as i (i)}
						<div class="flex flex-col gap-1.5">
							<div class="h-14 rounded-md" style:background-color="var(--c-chart-{i})"></div>
							<code class="font-mono text-2xs text-muted">--c-chart-{i}</code>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/snippet}
</Story>

<Story name="Radius and shadow">
	{#snippet template()}
		<div class="flex flex-col gap-8 bg-canvas p-6">
			<section>
				<h2 class="mb-3 text-sm font-semibold text-fg">Radius</h2>
				<div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
					{#each radii as r (r)}
						<div class="flex flex-col gap-1.5">
							<div
								class="h-16 border border-border bg-surface"
								style:border-radius="var(--radius-{r})"
							></div>
							<code class="font-mono text-2xs text-muted">rounded-{r}</code>
						</div>
					{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-3 text-sm font-semibold text-fg">Shadow</h2>
				<div class="grid grid-cols-2 gap-5 sm:grid-cols-4">
					{#each shadows as s (s)}
						<div class="flex flex-col gap-1.5">
							<div class="h-16 rounded-md bg-surface" style:box-shadow="var(--s-{s})"></div>
							<code class="font-mono text-2xs text-muted">shadow-{s}</code>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/snippet}
</Story>

<Story name="Typography">
	{#snippet template()}
		<div class="flex flex-col gap-8 bg-canvas p-6">
			<section class="flex flex-col gap-4">
				<p class="text-2xs font-semibold tracking-wide text-faint uppercase">
					Display — Mona Sans, tracked tight
				</p>
				<p class="text-4xl font-semibold tracking-tight font-display text-fg">
					Monthly recurring revenue
				</p>
				<p class="text-xl font-semibold font-display text-fg">Section heading</p>
			</section>

			<section class="flex flex-col gap-3">
				<p class="text-2xs font-semibold tracking-wide text-faint uppercase">
					Body and UI — Mona Sans
				</p>
				<p class="max-w-2xl text-base text-fg">
					Mona Sans carries every heading, label, button and paragraph. One family, with hierarchy
					coming from weight and size rather than a second face.
				</p>
				<p class="max-w-2xl text-sm text-muted">
					Secondary — supporting detail and helper text sit one step down in colour, not in size, so
					the rhythm of a form stays even.
				</p>
				<p class="text-xs text-faint">Meta — timestamps, counts, captions.</p>
				<div class="flex flex-wrap gap-4 pt-1">
					{#each [400, 500, 600, 700] as weight (weight)}
						<span class="text-lg text-fg" style:font-weight={weight}>Mona Sans {weight}</span>
					{/each}
				</div>
			</section>

			<section class="flex flex-col gap-3">
				<p class="text-2xs font-semibold tracking-wide text-faint uppercase">
					Numeric — Geist Mono
				</p>
				<p class="font-mono text-2xl font-semibold text-fg tabular-nums">$25,100.00</p>
				<p class="font-mono text-sm text-muted tabular-nums">1,284,905 · INV-1049 · 2026-09-13</p>
			</section>

			<section class="flex flex-col gap-2">
				<p class="text-2xs font-semibold tracking-wide text-faint uppercase">
					Scale — tuned to Mona Sans
				</p>
				{#each scale as [cls, px] (cls)}
					<p class="flex items-baseline gap-4">
						<span class="w-28 shrink-0 font-mono text-2xs text-faint">{cls} · {px}</span>
						<span class="{cls} text-fg">Outstanding invoices</span>
					</p>
				{/each}
			</section>

			<section class="flex flex-col gap-2">
				<p class="text-2xs font-semibold tracking-wide text-faint uppercase">Pairing in context</p>
				<div class="max-w-md rounded-xl bg-surface p-5 shadow-xs">
					<p class="text-lg font-semibold font-display text-fg">Outstanding balance</p>
					<p class="mt-1 text-sm text-muted">Across every unpaid invoice this quarter.</p>
					<p class="mt-3 font-mono text-3xl font-semibold text-fg tabular-nums">$18,420</p>
				</div>
			</section>
		</div>
	{/snippet}
</Story>

<Story name="Icons">
	{#snippet template()}
		<div class="bg-canvas p-6">
			<p class="mb-4 text-sm text-muted">
				Lucide, inlined at build time by unplugin-icons — no icon package in the runtime bundle.
			</p>
			<ul class="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
				{#each iconNames as name (name)}
					<li
						class="flex flex-col items-center gap-2 rounded-md border border-border bg-surface p-3"
					>
						<Icon {name} class="size-5 text-fg" />
						<code class="w-full truncate text-center font-mono text-2xs text-muted">{name}</code>
					</li>
				{/each}
			</ul>
		</div>
	{/snippet}
</Story>
