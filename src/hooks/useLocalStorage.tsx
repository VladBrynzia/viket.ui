import { useState, useEffect } from 'react';

declare global {
	interface WindowEventMap {
		onLocalStorageChange: CustomEvent;
	}
}

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T | undefined, (value: T) => void] {
	const [storedValue, setStoredValue] = useState();

	useEffect(() => {
		function eventHandler() {
			const item = window.localStorage.getItem(key);

			setStoredValue(item ? JSON.parse(item) : initialValue);
		}
		eventHandler();
		window.addEventListener('onLocalStorageChange', eventHandler);

		return () => window.removeEventListener('onLocalStorageChange', eventHandler);
	}, []);

	const setValue = (value: T) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
}
