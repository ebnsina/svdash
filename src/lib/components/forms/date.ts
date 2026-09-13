export const toISO = (d: Date) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const fromISO = (s: string) => {
	const [y, m, d] = s.split('-').map(Number);
	return new Date(y, m - 1, d);
};

export const addDays = (d: Date, n: number) =>
	new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export const addMonths = (d: Date, n: number) =>
	new Date(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), 28));

export const isSameDay = (a: Date, b: Date) => toISO(a) === toISO(b);

/** Six-week grid starting on Monday, so the popup never changes height. */
export function monthGrid(month: Date): Date[][] {
	const first = new Date(month.getFullYear(), month.getMonth(), 1);
	const offset = (first.getDay() + 6) % 7;
	const start = addDays(first, -offset);
	return Array.from({ length: 6 }, (_, w) =>
		Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d))
	);
}

const dayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
export const weekdayLabels = Array.from({ length: 7 }, (_, i) =>
	dayFmt.format(new Date(2024, 0, 1 + i))
);

export const monthLabel = (d: Date) =>
	new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(d);

export const fullDateLabel = (d: Date) =>
	new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(d);
