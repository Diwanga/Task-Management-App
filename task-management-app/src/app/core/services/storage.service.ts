import { Injectable } from '@angular/core';

/**
 * Storage Service
 * Handles all local storage and session storage operations
 * Provides type-safe storage with JSON serialization
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Save data to local storage
   * @param key Storage key
   * @param value Value to store (will be JSON stringified)
   */
  setLocal<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage:`, error);
    }
  }

  /**
   * Get data from local storage
   * @param key Storage key
   * @returns Parsed value or null if not found
   */
  getLocal<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return null;
    }
  }

  /**
   * Remove item from local storage
   * @param key Storage key
   */
  removeLocal(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
    }
  }

  /**
   * Clear all local storage
   */
  clearLocal(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
    }
  }

  /**
   * Save data to session storage
   * @param key Storage key
   * @param value Value to store (will be JSON stringified)
   */
  setSession<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to sessionStorage:`, error);
    }
  }

  /**
   * Get data from session storage
   * @param key Storage key
   * @returns Parsed value or null if not found
   */
  getSession<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from sessionStorage:`, error);
      return null;
    }
  }

  /**
   * Remove item from session storage
   * @param key Storage key
   */
  removeSession(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from sessionStorage:`, error);
    }
  }

  /**
   * Clear all session storage
   */
  clearSession(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error(`Error clearing sessionStorage:`, error);
    }
  }

  /**
   * Check if local storage is available
   * @returns True if localStorage is available
   */
  isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if session storage is available
   * @returns True if sessionStorage is available
   */
  isSessionStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      sessionStorage.setItem(testKey, 'test');
      sessionStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get all keys from local storage
   * @returns Array of all keys
   */
  getAllLocalKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Get storage size in bytes (approximate)
   * @returns Size in bytes
   */
  getLocalStorageSize(): number {
    let size = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        size += key.length + (value?.length || 0);
      }
    }
    return size;
  }

  /**
   * Check if a key exists in local storage
   * @param key Storage key
   * @returns True if key exists
   */
  hasLocal(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Check if a key exists in session storage
   * @param key Storage key
   * @returns True if key exists
   */
  hasSession(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}
