import { Injectable } from '@angular/core';
import { db, Setting } from '../data/aac-db';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  /**
   * Guarda o actualiza un valor en la tabla settings
   */
  async set<T = unknown>(key: string, value: T): Promise<void> {
    const setting: Setting = {
      key,
      value,
      updatedAt: Date.now()
    };
    await db.settings.put(setting);
  }

  /**
   * Obtiene el valor de un setting por su clave
   * @param key Clave a buscar
   * @param fallback Valor por defecto si no existe
   */
  async get<T = unknown>(key: string, fallback?: T): Promise<T | undefined> {
    const result = await db.settings.get(key);
    return result ? (result.value as T) : fallback;
  }

  /**
   * Elimina un setting por su clave
   */
  async delete(key: string): Promise<void> {
    await db.settings.delete(key);
  }

  /**
   * Obtiene todos los settings en un objeto
   */
  async getAll(): Promise<Record<string, unknown>> {
    const all = await db.settings.toArray();
    return Object.fromEntries(all.map(s => [s.key, s.value]));
  }
}
