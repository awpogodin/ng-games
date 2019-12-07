import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GamesComponent} from './games/games.component';
import {GameFormComponent} from './game-form/game-form.component';
import {FormsModule} from '@angular/forms';
import {GamesFilterPipe} from './shared/games-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameFormComponent,
    GamesFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
