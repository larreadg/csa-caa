import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { appName } from 'src/app/data/constants';
import { EmojiIndexService } from 'src/app/services/emoji-index.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-cards-settings',
  templateUrl: './cards-settings.component.html',
  styleUrls: ['./cards-settings.component.scss']
})
export class CardsSettingsComponent implements OnInit {

  constructor(public idx: EmojiIndexService, private settingsService: SettingsService, private messageService: MessageService){}

  color: boolean = true
  colorStyle: 'color' | 'black' = 'color'
  opacity: number = 100

  async ngOnInit() {
    const colorSetting = await this.settingsService.get('color') 
    if(typeof colorSetting === 'boolean') {
      this.color = colorSetting
      this.colorStyle = this.color ? 'color':'black'
    }   
    const opacitySetting = await this.settingsService.get('opacity')
    if(typeof opacitySetting === 'number') {
      this.opacity = opacitySetting
    }    
  }

  async updateSettings(key: string, value: unknown) {
    await this.settingsService.set(key, value)
  }

  async updateColor(e:any) {
    this.colorStyle = e ? 'color' : 'black'
  }

  async save() {
    await this.updateSettings('color', this.color)
    await this.updateSettings('opacity', this.opacity)
    this.messageService.add({ severity: 'success', summary: appName, detail: 'Cambios guardados' });
  }
}
