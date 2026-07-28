import { doc, getDocs, setDoc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'store_data';
const SYNC_KEYS = [
  'mega_products',
  'mega_categories',
  'mega_orders',
  'urbor_custom_categories',
  'urbor_staff_list',
  'urbor_staff_attendance',
  'mega_dues',
  'mega_campaigns',
  'mega_coupons',
  'urbor_hero_banner',
  'urbor_logo_url'
];

export const syncFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    querySnapshot.forEach((doc) => {
      const key = doc.id;
      const data = doc.data();
      if (data && data.value) {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(key, data.value);
          }
        } catch(e) {}
      }
    });
    return true;
  } catch (e) {
    console.error("Firebase sync failed", e);
    return false;
  }
};

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
  
  if (SYNC_KEYS.includes(key) || key.startsWith('mega_') || key.startsWith('urbor_')) {
    setDoc(doc(db, COLLECTION_NAME, key), { value }).catch(e => {
      console.error("Firebase save failed for key", key, e);
    });
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
  
  if (SYNC_KEYS.includes(key) || key.startsWith('mega_') || key.startsWith('urbor_')) {
    deleteDoc(doc(db, COLLECTION_NAME, key)).catch(e => {
      console.error("Firebase remove failed for key", key, e);
    });
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
