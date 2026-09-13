# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- 69 components across layout, navigation, data display, forms, feedback, buttons,
  settings and auth, each with a Storybook file covering its default, loading, empty,
  error and disabled states — 311 stories in total.
- Design tokens in `src/lib/tokens.css`: semantic colour, radius, shadow and type,
  defined once for light and again for dark, exposed to Tailwind via `@theme inline`.
- Sea green brand palette. Neutrals are a near-zero-chroma ladder — whites in light,
  onyx in dark — with no colour cast in either direction.
- `DataTable` on TanStack Table v9: sorting, debounced global filter, row selection,
  column visibility and pagination, with a `virtualize` mode for large sets (measured:
  5,000 rows, 39 in the DOM). `VirtualList` does the same for non-tabular content.
- Hand-rolled SVG line, bar, donut and sparkline charts, and a hand-rolled calendar
  grid. No chart library.
- Lucide icons inlined at build time by `unplugin-icons`, so no icon package reaches
  the runtime bundle.
- Self-hosted variable fonts: Mona Sans for UI, Geist Mono for numerics.
- Apple HIG accommodations: Reduce Motion, Increase Contrast, 44pt touch targets,
  safe-area insets, translucent chrome, and a layout verified at 200% text size.

- `llms.txt` and `llms-full.txt`: a machine-readable design contract covering tokens,
  radius and shadow rules, the type scale, the accessibility requirements and the
  component API conventions. Generated from `tokens.css` and the component tree by
  `pnpm llms`, with `pnpm check` failing when they are stale, so the reference cannot
  drift from what ships.

### Security

- Sample API keys use a clearly fictional `svd_live_` / `svd_test_` prefix rather than
  imitating a real provider's key format, so fixtures cannot be mistaken for — or
  flagged as — live credentials.

### Accessibility

- Every interactive component follows its WAI-ARIA APG pattern — dialog, alertdialog,
  menu button, tabs with roving tabindex, editable combobox, listbox, tooltip and
  date-picker grid. Focus is trapped in overlays and restored to the trigger on close.
- All 311 stories are rendered in Chromium and asserted against axe, with violations
  configured as hard failures rather than warnings.
- Every text pair in both themes clears WCAG AA (4.5:1), and control boundaries clear
  the 3:1 of WCAG 1.4.11 via a dedicated `--c-field` token. Ratios are computed from
  the oklch values, since axe does not test 1.4.11 on custom controls.
- The type scale is tuned to Mona Sans' x-height without overriding the root font
  size, so user text scaling and touch-target sizes are unaffected.
