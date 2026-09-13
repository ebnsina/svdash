/** Reads `get` but only republishes after it stops changing for `delay` ms. */
export function debounced<T>(get: () => T, delay = 200) {
	let current = $state(get());
	let timer: ReturnType<typeof setTimeout>;

	$effect(() => {
		const next = get();
		clearTimeout(timer);
		timer = setTimeout(() => (current = next), delay);
		return () => clearTimeout(timer);
	});

	return {
		get current() {
			return current;
		}
	};
}
