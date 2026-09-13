/** Chart colours live as CSS custom properties so they follow the theme. */
export const chartColor = (i: number) => `var(--c-chart-${(i % 5) + 1})`;

export interface Series {
	name: string;
	values: number[];
	/** Any CSS colour; defaults to the themed chart palette. */
	color?: string;
}

export const niceMax = (max: number) => {
	if (max <= 0) return 1;
	const magnitude = 10 ** Math.floor(Math.log10(max));
	return Math.ceil(max / magnitude) * magnitude;
};

/** Catmull-Rom to cubic Bézier — a readable curve without a charting library. */
export function smoothPath(points: [number, number][]): string {
	if (points.length < 2) return points.length ? `M${points[0][0]},${points[0][1]}` : '';
	let d = `M${points[0][0]},${points[0][1]}`;
	for (let i = 0; i < points.length - 1; i += 1) {
		const p0 = points[i - 1] ?? points[i];
		const p1 = points[i];
		const p2 = points[i + 1];
		const p3 = points[i + 2] ?? p2;
		const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
		const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
		d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
	}
	return d;
}

export function arcPath(
	cx: number,
	cy: number,
	r: number,
	inner: number,
	from: number,
	to: number
) {
	const pt = (radius: number, angle: number) => [
		cx + radius * Math.cos(angle - Math.PI / 2),
		cy + radius * Math.sin(angle - Math.PI / 2)
	];
	const large = to - from > Math.PI ? 1 : 0;
	const [x1, y1] = pt(r, from);
	const [x2, y2] = pt(r, to);
	const [x3, y3] = pt(inner, to);
	const [x4, y4] = pt(inner, from);
	return `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${inner},${inner} 0 ${large} 0 ${x4},${y4} Z`;
}
