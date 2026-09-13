import type { Member } from './TeamMemberList.svelte';
import type { SettingsSection } from './SettingsLayout.svelte';
import type { DangerAction } from './DangerZone.svelte';

export const sections: SettingsSection[] = [
	{ id: 'profile', label: 'Profile', icon: 'user', description: 'How you appear to your team.' },
	{
		id: 'workspace',
		label: 'Workspace',
		icon: 'building',
		description: 'Name, region and defaults.'
	},
	{ id: 'team', label: 'Team', icon: 'users', description: 'Who can access this workspace.' },
	{
		id: 'billing',
		label: 'Billing',
		icon: 'credit-card',
		description: 'Plan, usage and invoices.'
	},
	{ id: 'api', label: 'API keys', icon: 'key', description: 'Keys used by your integrations.' },
	{
		id: 'danger',
		label: 'Danger zone',
		icon: 'alert-triangle',
		description: 'Irreversible actions.'
	}
];

export const members: Member[] = [
	{
		id: 'm1',
		name: 'Amina Rahman',
		email: 'amina@acme.com',
		role: 'owner',
		lastActiveAt: '2026-09-13T08:00:00Z'
	},
	{
		id: 'm2',
		name: 'Deniz Yilmaz',
		email: 'deniz@acme.com',
		role: 'admin',
		lastActiveAt: '2026-09-12T17:20:00Z'
	},
	{
		id: 'm3',
		name: 'Farhan Chowdhury',
		email: 'farhan@acme.com',
		role: 'member',
		lastActiveAt: '2026-09-10T09:45:00Z'
	},
	{ id: 'm4', name: 'Leyla Kaya', email: 'leyla@acme.com', role: 'viewer', pending: true },
	{
		id: 'm5',
		name: 'Noor Haque',
		email: 'noor@acme.com',
		role: 'member',
		lastActiveAt: '2026-08-29T12:00:00Z'
	}
];

export const dangerActions: DangerAction[] = [
	{
		id: 'transfer',
		title: 'Transfer ownership',
		description: 'Hand this workspace to another admin. You keep admin access.',
		actionLabel: 'Transfer'
	},
	{
		id: 'reset',
		title: 'Reset all API keys',
		description: 'Every integration using the current keys stops working immediately.',
		actionLabel: 'Reset keys'
	},
	{
		id: 'delete',
		title: 'Delete this workspace',
		description: 'All data, invoices and members are removed. There is no recovery.',
		actionLabel: 'Delete workspace',
		disabled: true,
		disabledReason: 'Settle the outstanding invoice before deleting.'
	}
];

export const usage = [
	{ label: 'API requests', used: 842_000, limit: 1_000_000 },
	{ label: 'Team seats', used: 5, limit: 10, unit: 'seats' },
	{ label: 'Storage', used: 46, limit: 50, unit: 'GB' }
];
