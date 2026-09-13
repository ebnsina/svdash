/** Join conditional class names. No clsx, no tailwind-merge — order your classes. */
export function cn(...parts: (string | false | null | undefined)[]): string {
	return parts.filter(Boolean).join(' ');
}
