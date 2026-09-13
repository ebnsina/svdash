/**
 * Emits llms.txt and llms-full.txt from the source of truth, so the design rules an
 * LLM reads can never drift from the tokens and components that actually ship.
 * Run with `pnpm llms`.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const REPO = 'https://github.com/ebnsina/svdash';
const RAW = 'https://raw.githubusercontent.com/ebnsina/svdash/main';

const tokens = readFileSync('src/lib/tokens.css', 'utf8');

/** Pull `--name: value;` pairs out of a named block. */
function block(selector) {
	const at = tokens.indexOf(selector);
	if (at === -1) return [];
	const body = tokens.slice(tokens.indexOf('{', at) + 1, tokens.indexOf('\n}', at));
	return [...body.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)].map((m) => [
		m[1],
		m[2].replace(/\s+/g, ' ').trim()
	]);
}

const light = block(':root {');
const dark = block('.dark {');
const theme = block('@theme inline {');

const pick = (pairs, prefix) => pairs.filter(([k]) => k.startsWith(prefix));
const table = (rows, headers) =>
	[`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows].join('\n');

const darkOf = Object.fromEntries(dark);
const colourRows = pick(light, '--c-').map(
	([k, v]) => `| \`${k}\` | \`${v}\` | \`${darkOf[k] ?? '—'}\` |`
);

const CATEGORIES = {
	layout: 'Application shell',
	navigation: 'Navigation',
	'data-display': 'Data display',
	forms: 'Forms',
	feedback: 'Overlays and feedback',
	buttons: 'Buttons',
	settings: 'Settings and account',
	auth: 'Authentication screens'
};

const inventory = Object.entries(CATEGORIES).map(([dir, label]) => {
	const names = readdirSync(join('src/lib/components', dir))
		.filter((f) => f.endsWith('.svelte') && !f.includes('.stories.'))
		.map((f) => f.replace('.svelte', ''))
		.sort();
	return `- **${label}** (\`src/lib/components/${dir}\`): ${names.join(', ')}`;
});

const componentCount = Object.keys(CATEGORIES).reduce(
	(n, dir) =>
		n +
		readdirSync(join('src/lib/components', dir)).filter(
			(f) => f.endsWith('.svelte') && !f.includes('.stories.')
		).length,
	0
);

const full = `# Svdash — design system reference for LLMs

> An accessible SaaS dashboard component library for Svelte 5, TypeScript and Tailwind
> CSS v4. This file is the complete design contract: read it before generating any UI
> intended to match this system. It is generated from the source, so every value below
> is what actually ships.

Source: ${REPO}

## Non-negotiables

1. **Never hardcode a colour, radius, shadow or font size.** Use the semantic tokens
   below. A raw hex, \`rgb()\`, or arbitrary value like \`bg-[#f5f5f5]\` is always wrong.
2. **Never write a \`dark:\` variant.** Both themes are defined once in
   \`src/lib/tokens.css\`; a component that writes \`dark:bg-…\` has broken the system.
3. **Every interactive component follows its WAI-ARIA APG pattern.** Not "adds some
   aria attributes" — implements the documented keyboard interaction in full.
4. **No UI kit, no headless library, no chart library, no icon package at runtime.**
   Allowed runtime dependencies are Svelte, TanStack Table and TanStack Virtual.
5. **Components hold no business logic and make no network calls.** Sample data lives
   in \`mock.ts\` next to each category and is used only by stories.

## Stack

- Svelte 5 with runes (\`$props\`, \`$state\`, \`$derived\`, \`$effect\`) — never Svelte 4 stores or \`export let\`
- TypeScript, with an explicit \`interface Props\` on every component
- Tailwind CSS v4, configured CSS-first via \`@theme inline\` — there is no \`tailwind.config.js\`
- Storybook 10 with \`@storybook/addon-svelte-csf\`
- Icons: Lucide via \`unplugin-icons\`, inlined at build time
- Fonts: Mona Sans (UI) and Geist Mono (numerics), self-hosted variable woff2

## Colour tokens

Defined as CSS custom properties for light and dark, exposed to Tailwind as
\`--color-*\`. Use them as \`bg-surface\`, \`text-muted\`, \`border-border\`, \`text-accent\`.

${table(colourRows, ['Token', 'Light', 'Dark'])}

### How to choose

- \`canvas\` is the page; \`surface\` is a card sitting on it; \`subtle\` is a fill inside a card.
- \`fg\` → \`muted\` → \`faint\` is the text hierarchy. Never use \`faint\` for body copy.
- \`accent\` is sea green and means "primary action or current location", nothing else.
- \`field\` is **only** for the outline of a control identified by its outline —
  checkbox, radio, switch track, text input. It is darker than \`border\` on purpose.
- \`border\` is a decorative hairline: row separators, outline buttons. Use it at
  \`/60\` opacity for separators inside a card.
- \`on-solid\` is the text colour on a filled status chip; it flips between themes so
  solid badges stay legible in dark mode. Never use \`text-white\` on a status fill.
- \`chart-1\`…\`chart-5\` stay raw custom properties so SVG \`fill\`/\`stroke\` can read them.

## Radius

${table(
	pick(theme, '--radius-').map(
		([k, v]) => `| \`${k.replace('--radius-', 'rounded-')}\` | \`${v}\` |`
	),
	['Utility', 'Value']
)}

One rule, applied everywhere:

- Containers — cards, dialogs, menus, sheets, popovers — are \`rounded-xl\`.
- Every pressable control is \`rounded-md\` **regardless of size**, so a small button and
  a small input in the same toolbar agree. Small bare icon affordances are \`rounded-md\` too.
- Chips, badges and avatars are \`rounded-full\`.
- Rows flush to a container edge use the **concentric** radius: inner = outer − padding.
  A \`p-1\` menu at \`rounded-xl\` holds \`rounded-lg\` items. Never mismatch these.

## Shadow and border

- Elevation replaces outline. Cards are \`shadow-xs\` with **no border**; floating panels
  (date pickers, popovers) are \`shadow-md\`; overlays (modals, drawers, menus, command
  palette) are \`shadow-lg\`.
- Every shadow is two layers: a 1–2px contact edge plus a wide, low-opacity ambient pass.
- Filled buttons (primary, secondary, destructive) carry **no** border — the fill is the
  boundary. Only outline buttons keep one.
- Borders that survive: control outlines (\`border-field\`), row separators
  (\`border-border/60\`), outline buttons, and the dashed empty-state and drop zone.

## Type

- \`--font-sans\`: Mona Sans. \`--font-mono\`: Geist Mono, used for every number, currency
  value, identifier and code string, always with \`tabular-nums\`.
- The scale sits ~7% below Tailwind's default because Mona Sans has an x-height of 52.5
  per 100em where most UI sans sit nearer 49 — on a stock scale it renders visibly
  larger than its nominal size.

${table(
	pick(theme, '--text-')
		.filter(([k]) => !k.includes('line-height'))
		.map(([k, v]) => `| \`${k.replace('--text-', 'text-')}\` | \`${v}\` |`),
	['Utility', 'Value']
)}

- **Never override the root font size.** Scaling \`html\` shrinks every \`rem\`, including
  the 44pt touch targets. Adjust the scale tokens instead.
- Headings use \`font-display\` (tighter tracking). Weights: Regular, Medium, Semibold,
  Bold only — never a light weight.

## Accessibility contract

This is the part most generated UI gets wrong. All of it is enforced: every story is
rendered in Chromium and asserted against axe with violations as **hard failures**.

- **APG patterns**: dialog and alertdialog (focus trap + restore), menu button (roving
  tabindex, arrows, Home/End, Escape), tabs (roving tabindex, automatic activation),
  editable combobox with list autocomplete (\`aria-activedescendant\`), listbox, tooltip,
  and the date-picker grid (arrows, PageUp/PageDown, Home/End).
- **Contrast**: every text pair clears WCAG AA 4.5:1 in *both* themes. Control outlines
  clear **WCAG 1.4.11** at 3:1 — that is why \`--c-field\` exists separately from
  \`--c-border\`. axe does not test 1.4.11 on custom controls, so verify these by
  computing the ratio, not by running the sweep.
- **Touch targets**: 44×44pt minimum hit region per Apple HIG, which applies to pointers
  too, not only touch. Use the \`hit-area\` utility to extend the region without
  inflating the visible control.
- **Never rely on colour alone.** Status carries a dot, an icon and a text label.
- **Live regions** for anything asynchronous: toasts, copy confirmation, key reveal,
  selection counts, filter results.
- **Scroll containers must be focusable** (\`tabindex="0"\` plus an accessible name) when
  their content has nothing focusable — otherwise they are unreachable by keyboard.
- **Never use a text input that opens an overlay on focus.** It swallows keystrokes.
  Use a button with \`aria-haspopup="dialog"\`.
- **Disabled controls that need explaining** use \`aria-disabled\` plus
  \`aria-describedby\`, not the \`disabled\` attribute, which drops them from the tab order.
- Respect \`prefers-reduced-motion\` and \`prefers-contrast: more\`. Both are handled
  globally in \`tokens.css\`; do not re-implement per component.
- Layout must survive **200% text** without clipping. Use rem-based
  \`grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]\` rather than fixed column counts.

## Component API conventions

\`\`\`svelte
<script lang="ts">
	interface Props {
		/** Required, and documented when the name is not self-evident. */
		label: string;
		variant?: 'primary' | 'secondary';
		/** Two-way state is \`$bindable\`. */
		open?: boolean;
		/** Every component accepts \`class\` for layout overrides from the parent. */
		class?: string;
		/** Content is a Snippet; typed parameters when it needs context. */
		children?: Snippet<[{ id: string }]>;
	}

	let { label, variant = 'primary', open = $bindable(false), class: klass, children }: Props =
		$props();
</script>
\`\`\`

- Components accept \`...rest\` and spread it onto the underlying element when they can be
  used as a trigger — otherwise ARIA wiring passed by a parent is silently dropped.
- Compose with snippets (\`trigger\`, \`actions\`, \`footer\`, \`cell\`, \`row\`), not slots.
- Use \`cn()\` from \`#lib/utils/cn.js\` to join classes; all formatting goes through
  \`Intl\` helpers in \`#lib/utils/format.js\` — never a hand-rolled formatter.
- Comments are one line, two at most, and explain *why*, never *what*.
- Copy is plain language. No jargon, including in error states.

## Component inventory (${componentCount} components)

${inventory.join('\n')}

## Key files

- [\`src/lib/tokens.css\`](${RAW}/src/lib/tokens.css) — every design token, both themes
- [\`src/lib/components/buttons/styles.ts\`](${RAW}/src/lib/components/buttons/styles.ts) — button variants
- [\`src/lib/components/forms/field.ts\`](${RAW}/src/lib/components/forms/field.ts) — shared control styling
- [\`src/lib/utils/actions.ts\`](${RAW}/src/lib/utils/actions.ts) — focus trap, click-outside, scroll lock
- [\`README.md\`](${RAW}/README.md) — rationale behind the decisions above
`;

const index = `# Svdash

> An accessible SaaS dashboard component library for Svelte 5, TypeScript and Tailwind
> CSS v4 — ${componentCount} components, every one matching its WAI-ARIA APG pattern and
> verified against axe. Use llms-full.txt for the complete design contract before
> generating UI meant to match this system.

## Design contract

- [Full design reference](${RAW}/llms-full.txt): tokens, radius and shadow rules, type scale, accessibility contract and component API conventions — everything needed to generate matching UI
- [Design tokens](${RAW}/src/lib/tokens.css): the single source of truth for colour, radius, shadow and type in both themes
- [README](${RAW}/README.md): the reasoning behind each decision

## Code

- [Component source](${REPO}/tree/main/src/lib/components): grouped by layout, navigation, data-display, forms, feedback, buttons, settings, auth
- [Shared utilities](${REPO}/tree/main/src/lib/utils): class joining, focus trap, click-outside, Intl formatters
- [Changelog](${RAW}/CHANGELOG.md)

## Optional

- [Storybook stories](${REPO}/tree/main/src/lib/components): each component's states, co-located as \`*.stories.svelte\`
`;

// `--check` fails instead of writing, so a token change without a regenerate is caught.
if (process.argv.includes('--check')) {
	const stale = [
		['llms.txt', index],
		['llms-full.txt', full]
	].filter(([file, want]) => {
		try {
			return readFileSync(file, 'utf8') !== want;
		} catch {
			return true;
		}
	});
	if (stale.length > 0) {
		console.error(`Stale: ${stale.map(([f]) => f).join(', ')}. Run \`pnpm llms\`.`);
		process.exit(1);
	}
	console.log('llms.txt and llms-full.txt are up to date');
} else {
	writeFileSync('llms-full.txt', full);
	writeFileSync('llms.txt', index);
	console.log(`llms.txt (${index.length}B) and llms-full.txt (${full.length}B) written`);
}
