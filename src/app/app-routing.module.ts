import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsAddComponent } from './cards/cards-add/cards-add.component';
import { CardsListComponent } from './cards/cards-list/cards-list.component';
import { CardsSettingsComponent } from './cards/cards-settings/cards-settings.component';

const routes: Routes = [
  {
    path: 'cards',
    component: CardsListComponent
  },
  {
    path: 'cards/add',
    component: CardsAddComponent
  },
  {
    path: 'cards/settings',
    component: CardsSettingsComponent
  },
  {
    path: '**',
    redirectTo: 'cards'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
