import type { Row, Column } from './DataTable.svelte';
import type { TimelineEvent } from './Timeline.svelte';
import type { Series } from './chart.js';

export const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export const revenueSeries: Series[] = [
	{ name: 'Subscriptions', values: [18400, 19900, 21200, 20800, 23400, 25100] },
	{ name: 'One-off', values: [6200, 5400, 7100, 6800, 7900, 8300] }
];

export const trafficSeries: Series[] = [
	{ name: 'Visitors', values: [1240, 1380, 1290, 1620, 1810, 1740, 2050] }
];

export const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const planMix = [
	{ label: 'Starter', value: 412 },
	{ label: 'Growth', value: 268 },
	{ label: 'Scale', value: 96 },
	{ label: 'Enterprise', value: 31 }
];

export const invoiceColumns: Column[] = [
	{ key: 'number', header: 'Invoice', sortable: true, width: 'w-32' },
	{ key: 'customer', header: 'Customer', sortable: true },
	{ key: 'status', header: 'Status', sortable: true, width: 'w-32' },
	{ key: 'issued', header: 'Issued', sortable: true, width: 'w-32' },
	{ key: 'amount', header: 'Amount', sortable: true, align: 'right', width: 'w-32' }
];

export const invoiceRows: Row[] = [
	{
		id: '1',
		number: 'INV-1042',
		customer: 'Amina Rahman',
		status: 'Paid',
		issued: '2026-09-01',
		amount: 1280
	},
	{
		id: '2',
		number: 'INV-1043',
		customer: 'Deniz Yilmaz',
		status: 'Pending',
		issued: '2026-09-03',
		amount: 420
	},
	{
		id: '3',
		number: 'INV-1044',
		customer: 'Farhan Chowdhury',
		status: 'Overdue',
		issued: '2026-08-18',
		amount: 2650
	},
	{
		id: '4',
		number: 'INV-1045',
		customer: 'Leyla Kaya',
		status: 'Paid',
		issued: '2026-09-05',
		amount: 980
	},
	{
		id: '5',
		number: 'INV-1046',
		customer: 'Noor Haque',
		status: 'Draft',
		issued: '2026-09-09',
		amount: 150
	},
	{
		id: '6',
		number: 'INV-1047',
		customer: 'Omar Siddiq',
		status: 'Paid',
		issued: '2026-09-10',
		amount: 3400
	},
	{
		id: '7',
		number: 'INV-1048',
		customer: 'Zara Iqbal',
		status: 'Pending',
		issued: '2026-09-11',
		amount: 720
	},
	{
		id: '8',
		number: 'INV-1049',
		customer: 'Kerem Demir',
		status: 'Paid',
		issued: '2026-09-12',
		amount: 1890
	}
];

export const people = [
	{ name: 'Amina Rahman' },
	{ name: 'Deniz Yilmaz' },
	{ name: 'Farhan Chowdhury' },
	{ name: 'Leyla Kaya' },
	{ name: 'Noor Haque' },
	{ name: 'Omar Siddiq' }
];

export const activity: TimelineEvent[] = [
	{
		id: 'a1',
		title: 'Invoice INV-1049 was paid',
		description: '$1,890.00 received via card ending 4242.',
		at: '2026-09-13T09:10:00Z',
		icon: 'check-circle',
		tone: 'success'
	},
	{
		id: 'a2',
		title: 'Deniz Yilmaz updated the billing address',
		at: '2026-09-12T16:42:00Z',
		actor: { name: 'Deniz Yilmaz' }
	},
	{
		id: 'a3',
		title: 'API key rotated',
		description: 'The previous production key stopped working immediately.',
		at: '2026-09-11T11:05:00Z',
		icon: 'key',
		tone: 'warning'
	},
	{
		id: 'a4',
		title: 'Payment failed for INV-1044',
		description: 'Card declined — insufficient funds.',
		at: '2026-09-08T08:20:00Z',
		icon: 'alert-circle',
		tone: 'danger'
	},
	{
		id: 'a5',
		title: 'Workspace created',
		at: '2026-04-02T10:00:00Z',
		icon: 'brain',
		tone: 'accent'
	}
];

const customers = [
	'Amina Rahman',
	'Deniz Yilmaz',
	'Farhan Chowdhury',
	'Leyla Kaya',
	'Noor Haque',
	'Omar Siddiq',
	'Zara Iqbal',
	'Kerem Demir',
	'Hana Aziz',
	'Tarek Mansour'
];
const statuses = ['Paid', 'Pending', 'Overdue', 'Draft'];

/** Enough rows that pagination and virtualization have something to do. */
export const manyInvoiceRows: Row[] = Array.from({ length: 5000 }, (_, i) => ({
	id: String(i + 1),
	number: `INV-${1042 + i}`,
	customer: customers[i % customers.length],
	status: statuses[i % statuses.length],
	issued: `2026-${String((i % 9) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
	amount: 120 + ((i * 137) % 4800)
}));

export interface FeedItem {
	id: string;
	actor: string;
	action: string;
	at: string;
}

export const feedItems: FeedItem[] = Array.from({ length: 2000 }, (_, i) => ({
	id: `f${i}`,
	actor: customers[i % customers.length],
	action: [
		'paid an invoice',
		'updated their billing address',
		'rotated an API key',
		'invited a teammate'
	][i % 4],
	at: new Date(Date.UTC(2026, 8, 13, 9, 0) - i * 1000 * 60 * 37).toISOString()
}));
