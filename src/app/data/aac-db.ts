// src/app/data/aac-db.ts
import Dexie, { Table } from 'dexie';

export interface Card {
  id?: number;        // autoincremental
  title: string;      // título visible en la tarjeta
  text: string;       // lo que se va a reproducir (TTS)
  icon?: string;      // emoji, URL de imagen o nombre de clase/icono
  pictogramId?: string; // <— NUEVO: referencia al pictograma (p.ej. "openmoji:1F44B")
  sort?: number;
}

export interface Setting {
  key: string;                 // clave única (p. ej. "ui.colorMode")
  value: unknown;              // cualquier JSON serializable
  updatedAt?: number;          // epoch ms
}

export class AacDB extends Dexie {
  cards!: Table<Card, number>;
  settings!: Table<Setting, string>;

  constructor() {
    super('aac-db');
    this.version(2).stores({
      cards: '++id,title,text,icon,pictogramId,sort',
      settings: 'key, updatedAt'
    })
    this.cards = this.table('cards');
    this.settings = this.table('settings');
  }
}

export const db = new AacDB();
