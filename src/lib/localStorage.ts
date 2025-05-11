export function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    const serializedState = JSON.stringify(value);

    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.warn(`Error saving ${key} to localStorage:`, error);
  }
}

export function loadFromLocalStorage<T>(key: string): T | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) return;

    return JSON.parse(serializedState) as T;
  } catch (error) {
    console.warn(`Error loading ${key} from localStorage:`, error);

    return;
  }
}
