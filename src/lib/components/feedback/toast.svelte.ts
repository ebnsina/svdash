export type ToastTone = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
	id: string;
	tone: ToastTone;
	title: string;
	description?: string;
	/** Milliseconds; 0 keeps it until dismissed. */
	duration?: number;
	action?: { label: string; onclick: () => void };
}

let seq = 0;

export function createToaster() {
	let toasts = $state<Toast[]>([]);

	const timers = new Map<string, ReturnType<typeof setTimeout>>();

	function arm(id: string, duration: number) {
		if (duration <= 0) return;
		timers.set(
			id,
			setTimeout(() => dismiss(id), duration)
		);
	}

	function push(toast: Omit<Toast, 'id'>) {
		const id = `toast-${(seq += 1)}`;
		const next = { id, duration: 5000, ...toast };
		toasts = [...toasts, next];
		arm(id, next.duration ?? 5000);
		return id;
	}

	function dismiss(id: string) {
		clearTimeout(timers.get(id));
		timers.delete(id);
		toasts = toasts.filter((t) => t.id !== id);
	}

	/** Hold every toast open while the stack is hovered or focused. */
	function hold() {
		for (const timer of timers.values()) clearTimeout(timer);
		timers.clear();
	}

	function resume() {
		for (const toast of toasts) {
			if (!timers.has(toast.id)) arm(toast.id, toast.duration ?? 5000);
		}
	}

	return {
		get toasts() {
			return toasts;
		},
		push,
		dismiss,
		hold,
		resume,
		clear: () => {
			hold();
			toasts = [];
		},
		info: (title: string, description?: string) => push({ tone: 'info', title, description }),
		success: (title: string, description?: string) => push({ tone: 'success', title, description }),
		warning: (title: string, description?: string) => push({ tone: 'warning', title, description }),
		error: (title: string, description?: string) =>
			push({ tone: 'error', title, description, duration: 0 })
	};
}

export type Toaster = ReturnType<typeof createToaster>;
