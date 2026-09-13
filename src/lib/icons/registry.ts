/**
 * Icons come from Lucide via unplugin-icons: real SVG inlined at build time,
 * so there is no icon library in the runtime bundle. Add a name here and it is
 * available everywhere as <Icon name="…" />.
 */
import AlertCircle from '~icons/lucide/circle-alert';
import AlertTriangle from '~icons/lucide/triangle-alert';
import ArrowDown from '~icons/lucide/arrow-down';
import ArrowUp from '~icons/lucide/arrow-up';
import BarChart from '~icons/lucide/chart-column';
import Bell from '~icons/lucide/bell';
import Brain from '~icons/lucide/brain';
import Building from '~icons/lucide/building-2';
import Calendar from '~icons/lucide/calendar';
import Check from '~icons/lucide/check';
import CheckCircle from '~icons/lucide/circle-check';
import ChevronDown from '~icons/lucide/chevron-down';
import ChevronLeft from '~icons/lucide/chevron-left';
import ChevronRight from '~icons/lucide/chevron-right';
import ChevronUp from '~icons/lucide/chevron-up';
import ChevronsUpDown from '~icons/lucide/chevrons-up-down';
import Clock from '~icons/lucide/clock';
import Columns from '~icons/lucide/columns-3';
import Copy from '~icons/lucide/copy';
import CreditCard from '~icons/lucide/credit-card';
import Download from '~icons/lucide/download';
import Edit from '~icons/lucide/pencil';
import ExternalLink from '~icons/lucide/external-link';
import Eye from '~icons/lucide/eye';
import EyeOff from '~icons/lucide/eye-off';
import File from '~icons/lucide/file-text';
import Filter from '~icons/lucide/funnel';
import Folder from '~icons/lucide/folder';
import Home from '~icons/lucide/house';
import Inbox from '~icons/lucide/inbox';
import Info from '~icons/lucide/info';
import Key from '~icons/lucide/key';
import LayoutGrid from '~icons/lucide/layout-grid';
import Loader from '~icons/lucide/loader';
import LogOut from '~icons/lucide/log-out';
import Mail from '~icons/lucide/mail';
import Menu from '~icons/lucide/menu';
import Moon from '~icons/lucide/moon';
import PanelLeft from '~icons/lucide/panel-left';
import PanelLeftClose from '~icons/lucide/panel-left-close';
import MoreHorizontal from '~icons/lucide/ellipsis';
import MoreVertical from '~icons/lucide/ellipsis-vertical';
import Plus from '~icons/lucide/plus';
import Refresh from '~icons/lucide/refresh-cw';
import Search from '~icons/lucide/search';
import Settings from '~icons/lucide/settings';
import Shield from '~icons/lucide/shield';
import Star from '~icons/lucide/star';
import Sun from '~icons/lucide/sun';
import Trash from '~icons/lucide/trash-2';
import Upload from '~icons/lucide/upload';
import User from '~icons/lucide/user';
import Users from '~icons/lucide/users';
import X from '~icons/lucide/x';
import XCircle from '~icons/lucide/circle-x';

export const icons = {
	'alert-circle': AlertCircle,
	'alert-triangle': AlertTriangle,
	'arrow-down': ArrowDown,
	'arrow-up': ArrowUp,
	'bar-chart': BarChart,
	bell: Bell,
	brain: Brain,
	building: Building,
	calendar: Calendar,
	check: Check,
	'check-circle': CheckCircle,
	'chevron-down': ChevronDown,
	'chevron-left': ChevronLeft,
	'chevron-right': ChevronRight,
	'chevron-up': ChevronUp,
	'chevrons-up-down': ChevronsUpDown,
	clock: Clock,
	columns: Columns,
	copy: Copy,
	'credit-card': CreditCard,
	download: Download,
	edit: Edit,
	'external-link': ExternalLink,
	eye: Eye,
	'eye-off': EyeOff,
	file: File,
	filter: Filter,
	folder: Folder,
	home: Home,
	inbox: Inbox,
	info: Info,
	key: Key,
	'layout-grid': LayoutGrid,
	loader: Loader,
	'log-out': LogOut,
	mail: Mail,
	menu: Menu,
	moon: Moon,
	'panel-left': PanelLeft,
	'panel-left-close': PanelLeftClose,
	'more-horizontal': MoreHorizontal,
	'more-vertical': MoreVertical,
	plus: Plus,
	refresh: Refresh,
	search: Search,
	settings: Settings,
	shield: Shield,
	star: Star,
	sun: Sun,
	trash: Trash,
	upload: Upload,
	user: User,
	users: Users,
	x: X,
	'x-circle': XCircle
} as const;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons).sort() as IconName[];
