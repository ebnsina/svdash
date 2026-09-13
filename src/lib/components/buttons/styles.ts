export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const base =
	'relative inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50';

export const variants: Record<ButtonVariant, string> = {
	primary: 'bg-accent text-accent-fg hover:bg-accent-hover shadow-xs',
	secondary: 'bg-subtle text-fg hover:bg-border-strong/50',
	outline: 'border border-border text-fg hover:border-border-strong hover:bg-subtle',
	ghost: 'text-muted hover:bg-subtle hover:text-fg',
	destructive: 'bg-danger text-on-solid hover:bg-danger-hover shadow-xs'
};

export const sizes: Record<ButtonSize, string> = {
	sm: 'h-8 rounded-sm px-3 text-xs',
	md: 'h-9.5 rounded-md px-4 text-sm',
	lg: 'h-11 rounded-md px-5 text-sm'
};

export const iconSizes: Record<ButtonSize, string> = {
	sm: 'size-8 rounded-sm',
	md: 'size-9.5 rounded-md',
	lg: 'size-11 rounded-md'
};

export const glyphSizes: Record<ButtonSize, string> = {
	sm: 'size-3.5',
	md: 'size-4',
	lg: 'size-4.5'
};
