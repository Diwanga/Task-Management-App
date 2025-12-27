/**
 * Storage Helper Functions
 * Additional utility functions for storage operations
 */

/**
 * Safely stringify object for storage
 * @param obj Object to stringify
 * @returns Stringified object or null
 */
export function safeStringify(obj: any): string | null {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    console.error('Error stringifying object:', error);
    return null;
  }
}

/**
 * Safely parse JSON string
 * @param str String to parse
 * @returns Parsed object or null
 */
export function safeParse<T>(str: string): T | null {
  try {
    return JSON.parse(str) as T;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
}

/**
 * Get storage size in MB
 * @param storage Storage object (localStorage or sessionStorage)
 * @returns Size in MB
 */
export function getStorageSize(storage: Storage): number {
  let size = 0;
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key) {
      const value = storage.getItem(key);
      size += key.length + (value?.length || 0);
    }
  }
  // Convert bytes to MB
  return size / (1024 * 1024);
}

/**
 * Check if storage quota is exceeded
 * @param storage Storage object
 * @param dataToStore Data to store
 * @returns True if would exceed quota
 */
export function wouldExceedQuota(storage: Storage, dataToStore: string): boolean {
  const testKey = '__quota_test__';
  try {
    storage.setItem(testKey, dataToStore);
    storage.removeItem(testKey);
    return false;
  } catch (error) {
    return true;
  }
}

/**
 * Get all storage keys matching a prefix
 * @param storage Storage object
 * @param prefix Prefix to match
 * @returns Array of matching keys
 */
export function getKeysByPrefix(storage: Storage, prefix: string): string[] {
  const keys: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key && key.startsWith(prefix)) {
      keys.push(key);
    }
  }
  return keys;
}

/**
 * Remove all keys matching a prefix
 * @param storage Storage object
 * @param prefix Prefix to match
 */
export function removeKeysByPrefix(storage: Storage, prefix: string): void {
  const keys = getKeysByPrefix(storage, prefix);
  keys.forEach(key => storage.removeItem(key));
}

/**
 * Export storage data to JSON
 * @param storage Storage object
 * @returns JSON string of all storage data
 */
export function exportStorage(storage: Storage): string {
  const data: { [key: string]: any } = {};
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key) {
      const value = storage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    }
  }
  return JSON.stringify(data, null, 2);
}

/**
 * Import storage data from JSON
 * @param storage Storage object
 * @param jsonData JSON string of storage data
 */
export function importStorage(storage: Storage, jsonData: string): void {
  try {
    const data = JSON.parse(jsonData);
    Object.keys(data).forEach(key => {
      const value = typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]);
      storage.setItem(key, value);
    });
  } catch (error) {
    console.error('Error importing storage data:', error);
  }
}

/**
 * Copy data from one storage to another
 * @param from Source storage
 * @param to Destination storage
 * @param keys Optional array of specific keys to copy
 */
export function copyStorage(from: Storage, to: Storage, keys?: string[]): void {
  const keysToCopy = keys || getAllKeys(from);
  keysToCopy.forEach(key => {
    const value = from.getItem(key);
    if (value) {
      to.setItem(key, value);
    }
  });
}

/**
 * Get all keys from storage
 * @param storage Storage object
 * @returns Array of all keys
 */
export function getAllKeys(storage: Storage): string[] {
  const keys: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key) {
      keys.push(key);
    }
  }
  return keys;
}

/**
 * Compress string using simple run-length encoding (for storage optimization)
 * @param str String to compress
 * @returns Compressed string
 */
export function compressString(str: string): string {
  // Simple compression - can be replaced with better algorithm
  return str.replace(/(.)\1+/g, (match, char) => `${char}${match.length}`);
}

/**
 * Decompress string from run-length encoding
 * @param str Compressed string
 * @returns Decompressed string
 */
export function decompressString(str: string): string {
  // Simple decompression
  return str.replace(/(.)\d+/g, (match, char) => {
    const count = parseInt(match.slice(1));
    return char.repeat(count);
  });
}
