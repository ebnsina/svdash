const FOCUSABLE =
	'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function focusables(root: HTMLElement): HTMLElement[] {
	return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
		(el) => el.offsetParent !== null || el === document.activeElement
	);
}

/** Trap Tab within the node and restore focus to the previously focused element on destroy. */
export function trapFocus(node: HTMLElement) {
	const previous = document.activeElement as HTMLElement | null;

	function onKeydown(e: KeyboardEvent) {
		if (e.key !== 'Tab') return;
		const items = focusables(node);
		if (items.length === 0) {
			e.preventDefault();
			return;
		}
		const first = items[0];
		const last = items[items.length - 1];
		const active = document.activeElement;
		if (e.shiftKey && (active === first || !node.contains(active))) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && active === last) {
			e.preventDefault();
			first.focus();
		}
	}

	queueMicrotask(() => (focusables(node)[0] ?? node).focus());
	node.addEventListener('keydown', onKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', onKeydown);
			previous?.focus?.();
		}
	};
}

/** Call back when a pointerdown lands outside the node. */
export function clickOutside(node: HTMLElement, onOutside: () => void) {
	let handler = onOutside;
	function onPointerDown(e: PointerEvent) {
		if (!node.contains(e.target as Node)) handler();
	}
	document.addEventListener('pointerdown', onPointerDown, true);
	return {
		update(next: () => void) {
			handler = next;
		},
		destroy() {
			document.removeEventListener('pointerdown', onPointerDown, true);
		}
	};
}

/** Lock body scroll while mounted (modals, drawers). */
export function lockScroll() {
	const prev = document.body.style.overflow;
	document.body.style.overflow = 'hidden';
	return () => {
		document.body.style.overflow = prev;
	};
}
