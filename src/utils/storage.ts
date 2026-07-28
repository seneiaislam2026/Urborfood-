export const safeGetItem = (key: string): string | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch (e) {
    console.warn('localStorage is not available', e);
  }
  return null;
};

export const safeSetItem = (key: string, value: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn('localStorage is not available', e);
  }
};

export const safeRemoveItem = (key: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  } catch (e) {
    console.warn('localStorage is not available', e);
  }
};

export const safeSessionGetItem = (key: string): string | null => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem(key);
    }
  } catch (e) {
    console.warn('sessionStorage is not available', e);
  }
  return null;
};

export const safeSessionSetItem = (key: string, value: string): void => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn('sessionStorage is not available', e);
  }
};
