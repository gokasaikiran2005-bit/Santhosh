
const DB_NAME = 'portfolioDB';
const STORE_NAME = 'portfolioStore';
const DB_VERSION = 1;

let db: IDBDatabase;

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(true);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
      reject(false);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(true);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

export const set = <T>(key: string, value: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      initDB().then(() => set(key, value).then(resolve).catch(reject));
      return;
    }
    try {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(value, key);

        request.onsuccess = () => {
        resolve(value);
        };

        request.onerror = () => {
        console.error('Error setting data in IndexedDB:', request.error);
        reject(request.error);
        };
    } catch(e) {
        reject(e);
    }
  });
};

export const get = <T>(key: string): Promise<T | undefined> => {
  return new Promise((resolve, reject) => {
    if (!db) {
        initDB().then(() => get(key).then(res => resolve(res as T)).catch(reject));
        return;
    }
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => {
      resolve(request.result as T | undefined);
    };

    request.onerror = () => {
      console.error('Error getting data from IndexedDB:', request.error);
      reject(request.error);
    };
  });
};

export const remove = (key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!db) {
            initDB().then(() => remove(key).then(resolve).catch(reject));
            return;
        }
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(key);

        request.onsuccess = () => {
            resolve();
        };
        
        request.onerror = () => {
            console.error('Error removing data from IndexedDB:', request.error);
            reject(request.error);
        };
    });
};
