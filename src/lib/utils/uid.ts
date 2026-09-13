let n = 0;
/** Stable-enough unique id for aria wiring. */
export function uid(prefix = 'id'): string {
	return `${prefix}-${(n += 1).toString(36)}`;
}
