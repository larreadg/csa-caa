// emoji-index.service.ts
import { Injectable } from '@angular/core';

export interface EmojiEsEntry {
  hexcode: string;       // "1F44B"
  label: string;         // "mano saludando"
  keywords: string[];    // ["hola","saludo","mano",...]
}

function normalize(s: string) {
  return s.toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

@Injectable({ providedIn: 'root' })
export class EmojiIndexService {
  private es: EmojiEsEntry[] = [];

  async load() {
    const r = await fetch('assets/emojibase/es/compact.json');
    const data = await r.json(); // trae label/tags en español
    this.es = data.map((d: any) => ({
      hexcode: d.hexcode,
      label: d.label,
      keywords: Array.from(new Set([d.label, ...(d.tags || [])])).map(normalize),
    }));
  }

  async search(term: string, limit = 12) {
    await this.load();
    const q = normalize(term);
    // ranking simple: empieza con, incluye, o por palabras
    const score = (e: EmojiEsEntry) => {
      const hay = [e.label, ...e.keywords];
      if (hay.some(k => k.startsWith(q))) return 3;
      if (hay.some(k => k.includes(q)))   return 2;
      // match por palabra
      const parts = q.split(' ');
      if (parts.every(p => hay.some(k => k.includes(p)))) return 1;
      return 0;
    };
    return this.es
      .map(e => ({ e, s: score(e) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, limit)
      .map(x => x.e);
  }

  openmojiUrl(hex: string | undefined, style: 'color'|'black' = 'color') {
    if(!hex) return ''
    return `assets/openmoji/${style}/svg/${hex.toUpperCase()}.svg`;
  }
}
