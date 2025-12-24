// Custom hook for localStorage management
export const useLocalStorage = (key, initialValue) => {
  const getValue = () => {
    try {
      const item = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from localStorage [${key}]:`, error);
      return initialValue;
    }
  };

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(getValue()) : value;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error writing to localStorage [${key}]:`, error);
    }
  };

  return [getValue(), setValue];
};
