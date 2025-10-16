import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { appName } from 'src/app/data/constants';
import { CardService } from 'src/app/services/card.service';
import { EmojiEsEntry, EmojiIndexService } from 'src/app/services/emoji-index.service';

@Component({
  selector: 'app-cards-add',
  templateUrl: './cards-add.component.html',
  styleUrls: ['./cards-add.component.scss']
})
export class CardsAddComponent {
  q = '';
  text = '';
  emoji: EmojiEsEntry | null = null;
  loading: boolean = false;

  results: EmojiEsEntry[] = [];
  constructor(public idx: EmojiIndexService, private cards: CardService, private messageService: MessageService) {}
  async doSearch() { this.results = this.q !== '' ? await this.idx.search(this.q) : [] }
  async pick() {
    if(this.text !== '' && this.emoji !== null) {
      this.loading = true
      await this.cards.add({
        title: this.emoji.label,
        text: this.text,          
        icon: 'openmoji',        
        pictogramId: this.emoji.hexcode,
        sort: 0
      });
      this.messageService.add({ severity: 'success', summary: appName, detail: 'Pictograma guardado' });
      this.text = ''
      this.emoji = null
      this.q = ''
      this.loading = false
    }
  }

  setEmoji(emoji: EmojiEsEntry) {
    this.emoji = emoji
  }

  removeEmoji() {
    this.emoji = null
  }
}
