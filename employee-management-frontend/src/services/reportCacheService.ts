import type { ReportResult, ReportFilters } from './reportService';

export interface CachedReportEntry {
  key: string;
  filters: ReportFilters;
  records: ReportResult[];
  recordCount: number;
  cachedAt: string;
}

const DB_NAME = 'EmployeePortalDB';
const DB_VERSION = 1;
const STORE_NAME = 'report_cache';

/**
 * Lightweight, Promise-based IndexedDB service for caching large report datasets on the client
 * without blocking localStorage or storing any sensitive authentication information.
 */
class ReportCacheService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return reject(new Error('IndexedDB is not supported in this browser environment'));
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to open IndexedDB'));
      };
    });

    return this.dbPromise;
  }

  /**
   * Caches a report dataset by query key.
   */
  public async setReport(
    key: string,
    filters: ReportFilters,
    records: ReportResult[]
  ): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const entry: CachedReportEntry = {
        key,
        filters,
        records,
        recordCount: records.length,
        cachedAt: new Date().toISOString(),
      };

      const req = store.put(entry);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Retrieves a cached report dataset.
   */
  public async getReport(key: string): Promise<CachedReportEntry | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        resolve(req.result || null);
      };
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Deletes a cached report entry.
   */
  public async deleteReport(key: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Clears all cached reports.
   */
  public async clearAll(): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Lists all cached report metadata (without full payload).
   */
  public async listCaches(): Promise<Array<Omit<CachedReportEntry, 'records'>>> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const results: CachedReportEntry[] = req.result || [];
        const summaries = results.map(({ key, filters, recordCount, cachedAt }) => ({
          key,
          filters,
          recordCount,
          cachedAt,
        }));
        resolve(summaries);
      };
      req.onerror = () => reject(req.error);
    });
  }
}

export const reportCacheService = new ReportCacheService();
