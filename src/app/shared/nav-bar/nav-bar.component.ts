import { Component } from '@angular/core';
import { appName } from 'src/app/data/constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  appName = appName
  showSidebar: boolean = false
}
