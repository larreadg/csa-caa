import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { appName } from './data/constants';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showSplash: boolean = true;

  constructor(title: Title, private cardService: CardService) {
    title.setTitle(appName)
  }

  ngOnInit(): void {
    // Oculta el splash después de 3 segundos (ajusta según tus necesidades)
    setTimeout(() => {
      this.showSplash = false;
    }, 2000);

    this.cardService.seedDatabase()
  }
}
