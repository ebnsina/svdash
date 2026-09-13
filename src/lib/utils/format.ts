/** All formatting goes through Intl. No hand-rolled formatters. */
export const formatNumber = (n: number, opts: Intl.NumberFormatOptions = {}, locale = 'en-US') =>
	new Intl.NumberFormat(locale, opts).format(n);

export const formatCurrency = (n: number, currency = 'USD', locale = 'en-US') =>
	new Intl.NumberFormat(locale, { style: 'currency', currency }).format(n);

export const formatCompact = (n: number, locale = 'en-US') =>
	new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(n);

export const formatPercent = (n: number, locale = 'en-US') =>
	new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }).format(n);

export const formatDate = (
	d: Date | string,
	opts: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
	locale = 'en-US'
) => new Intl.DateTimeFormat(locale, opts).format(typeof d === 'string' ? new Date(d) : d);

const rtf = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
	['year', 31536000],
	['month', 2592000],
	['week', 604800],
	['day', 86400],
	['hour', 3600],
	['minute', 60],
	['second', 1]
];

export function formatRelative(d: Date | string, now = new Date()): string {
	const date = typeof d === 'string' ? new Date(d) : d;
	const seconds = (date.getTime() - now.getTime()) / 1000;
	for (const [unit, size] of UNITS) {
		if (Math.abs(seconds) >= size || unit === 'second') {
			return rtf.format(Math.round(seconds / size), unit);
		}
	}
	return rtf.format(0, 'second');
}

export const formatList = (items: string[], locale = 'en-US') =>
	new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items);
