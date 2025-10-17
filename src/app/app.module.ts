import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { CardsAddComponent } from './cards/cards-add/cards-add.component';
import { CardsListComponent } from './cards/cards-list/cards-list.component';
import { LongPressDirective } from './directives/long-press.directive';
import { UnplashComponent } from './shared/unplash/unplash.component';
import { CardsSettingsComponent } from './cards/cards-settings/cards-settings.component';

// Primeng
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { SliderModule } from 'primeng/slider';
import { DoubleTapDirective } from './directives/double-tap.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CardsAddComponent,
    CardsListComponent,
    LongPressDirective,
    UnplashComponent,
    CardsSettingsComponent,
    DoubleTapDirective 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Primeng
    InputTextModule,
    AvatarModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule,
    SidebarModule,
    DialogModule,
    ToggleButtonModule,
    DividerModule,
    SliderModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
