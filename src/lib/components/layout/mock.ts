import type { NavGroup } from './nav.js';
import type { Notification } from './Topbar.svelte';

export const navGroups: NavGroup[] = [
	{
		items: [
			{ id: 'overview', label: 'Overview', icon: 'home' },
			{ id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
			{ id: 'invoices', label: 'Invoices', icon: 'file', badge: 14 }
		]
	},
	{
		label: 'Workspace',
		items: [
			{ id: 'customers', label: 'Customers', icon: 'users' },
			{ id: 'products', label: 'Products', icon: 'layout-grid' },
			{ id: 'api-keys', label: 'API keys', icon: 'key' },
			{ id: 'audit', label: 'Audit log', icon: 'clock', disabled: true }
		]
	},
	{
		label: 'Account',
		items: [
			{ id: 'billing', label: 'Billing', icon: 'credit-card' },
			{ id: 'settings', label: 'Settings', icon: 'settings' }
		]
	}
];

export const user = { name: 'Amina Rahman', email: 'amina@acme.com' };

export const notifications: Notification[] = [
	{
		id: 'n1',
		title: 'Invoice INV-1049 was paid',
		description: '$1,890.00 received.',
		at: '2026-09-13T09:10:00Z',
		unread: true
	},
	{
		id: 'n2',
		title: 'Usage at 92% of your plan',
		description: 'Consider upgrading before the reset.',
		at: '2026-09-12T18:00:00Z',
		unread: true
	},
	{ id: 'n3', title: 'Deniz Yilmaz joined the workspace', at: '2026-09-11T14:30:00Z' }
];
