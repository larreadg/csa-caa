import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/data/aac-db';
import { appName } from 'src/app/data/constants';
import { CardService } from 'src/app/services/card.service';
import { EmojiIndexService } from 'src/app/services/emoji-index.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {

  appName = appName
  cards: Card[] = []
  listToPlay: Card[] = []
  showDelete: boolean = false
  deleteTarget: Card | null = null
  colorStyle: 'color' | 'black' = 'color'
  opacity: number = 100

  constructor(private cardsSvc: CardService, public idx: EmojiIndexService, private settingsService: SettingsService) {}

  async ngOnInit() {
    const colorSetting = await this.settingsService.get('color') 
    if(typeof colorSetting === 'boolean') {
      this.colorStyle = colorSetting ? 'color':'black'
    }
    const opacitySetting = await this.settingsService.get('opacity')
    if(typeof opacitySetting === 'number') {
      this.opacity = opacitySetting
      console.log(this.opacity)
    }    
    this.getCards()
  }
  
  async getCards() {
    this.cards = await this.cardsSvc.listSortedEs()
  }

  speak(text: string, lang = 'es-ES') {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;               // ej: 'es-ES', 'es-MX', 'es-AR'
    window.speechSynthesis.speak(u);
  }
 
  marqueeDur(txt: string) {
    // 0.18s por carácter, entre 6s y 18s
    const s = Math.max(6, Math.min(18, txt.length * 0.18));
    return `${s}s`;
  }

  addToList(card:Card) {
    this.listToPlay.push(card)
  }

  removeLastItem() {
    if (this.listToPlay.length) this.listToPlay.pop()
  }

  play() {
    let textToPlay: string = this.listToPlay.map(el => el.text).join(', ')
    this.speak(textToPlay)
  }

  deleteCard(card:Card) {
    this.deleteTarget = card
    this.showDelete = true
  }

  async confirmDeleteCard() {
    if(this.deleteTarget) {
      await this.cardsSvc.remove(<number> this.deleteTarget.id)
      this.cards = await this.cardsSvc.listSortedEs()
      this.deleteTarget = null
      this.showDelete = false
    }
  }
}
