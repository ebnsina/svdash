export const controlBase =
	'block w-full border bg-surface text-sm text-fg placeholder:text-faint transition-colors focus-visible:ring-focus disabled:cursor-not-allowed disabled:bg-subtle disabled:text-faint read-only:bg-subtle';

export type ControlVariant = 'outline' | 'filled';

export const controlTone = (invalid: boolean, variant: ControlVariant = 'outline') => {
	if (invalid) return 'border-danger hover:border-danger';
	// Filled search: the fill alone is only ~1.1:1 against a card, so it keeps a soft
	// hairline to stay visible — quieter than the 3:1 outline a form field needs.
	return variant === 'filled'
		? 'border-border bg-subtle hover:border-border-strong'
		: 'border-field hover:border-fg/40';
};

export type ControlSize = 'sm' | 'md' | 'lg';

export const controlSizes: Record<ControlSize, string> = {
	sm: 'h-8 rounded-sm px-2.5 text-xs',
	md: 'h-9.5 rounded-md px-3',
	lg: 'h-11 rounded-md px-3.5'
};
