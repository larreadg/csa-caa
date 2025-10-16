// src/app/data/card.service.ts
import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, Card } from '../data/aac-db';
import { seedCards } from '../data/seed';

@Injectable({ providedIn: 'root' })
export class CardService {
  // Crear
  add(card: Omit<Card, 'id'>) {
    return db.cards.add(card);
  }

  // Leer
  get(id: number) {
    return db.cards.get(id);
  }

  list() {
    return db.cards.orderBy('title').toArray();
  }

  async listSortedEs() {
    const rows = await db.cards.toArray();
    return rows.sort((a, b) =>
      a.title.localeCompare(b.title, 'es', { sensitivity: 'base', numeric: true })
    );
  }
  
  // Observable reactivo (opcional) para usar con async pipe
  watchAll() {
    return liveQuery(() => db.cards.orderBy('title').toArray());
  }

  // Actualizar
  update(id: number, changes: Partial<Card>) {
    return db.cards.update(id, changes);
  }

  // Borrar
  remove(id: number) {
    return db.cards.delete(id);
  }

  async resequence(cardsInOrder: Card[]) {
    await Promise.all(cardsInOrder.map((c, i) =>
      db.cards.update(c.id!, { sort: (i + 1) * 1000 })
    ));
  }

  async seedDatabase() {
    // 1. Verificar si ya se ejecutó el seed previamente
    const seedFlag = await db.settings.get('seed');
  
    if (seedFlag?.value === true) {
      console.log('Seed ya aplicado previamente. No se insertan datos.');
      return;
    }
  
    // 2. Insertar los registros iniciales en la tabla cards
    await db.cards.bulkAdd(seedCards);
    console.log('Seed cargado con éxito.');
  
    // 3. Guardar la bandera en settings para no volver a ejecutar
    await db.settings.put({
      key: 'seed',
      value: true,
      updatedAt: Date.now()
    });
  
    console.log('Bandera seed registrada en settings.');
  }
}
