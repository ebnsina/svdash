import type { SelectOption } from './Select.svelte';

export const countries: SelectOption[] = [
	{ value: 'bd', label: 'Bangladesh' },
	{ value: 'tr', label: 'Türkiye' },
	{ value: 'my', label: 'Malaysia' },
	{ value: 'ae', label: 'United Arab Emirates' },
	{ value: 'de', label: 'Germany' },
	{ value: 'jp', label: 'Japan' },
	{ value: 'br', label: 'Brazil' },
	{ value: 'ca', label: 'Canada' }
];

export const plans: SelectOption[] = [
	{ value: 'free', label: 'Free', group: 'Self-serve' },
	{ value: 'starter', label: 'Starter — $19/mo', group: 'Self-serve' },
	{ value: 'growth', label: 'Growth — $79/mo', group: 'Self-serve' },
	{ value: 'enterprise', label: 'Enterprise', group: 'Sales-assisted' },
	{ value: 'legacy', label: 'Legacy (closed)', group: 'Sales-assisted', disabled: true }
];

export const teammates = [
	{ value: 'amina', label: 'Amina Rahman', description: 'Engineering' },
	{ value: 'deniz', label: 'Deniz Yilmaz', description: 'Design' },
	{ value: 'farhan', label: 'Farhan Chowdhury', description: 'Support' },
	{ value: 'leyla', label: 'Leyla Kaya', description: 'Finance' },
	{ value: 'noor', label: 'Noor Haque', description: 'Engineering' },
	{ value: 'omar', label: 'Omar Siddiq', description: 'On leave', disabled: true }
];
