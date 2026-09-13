import type { IconName } from '#lib/icons/registry.js';

export interface NavItem {
	id: string;
	label: string;
	icon: IconName;
	href?: string;
	badge?: string | number;
	disabled?: boolean;
}

export interface NavGroup {
	label?: string;
	items: NavItem[];
}
