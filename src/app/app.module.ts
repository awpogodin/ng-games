import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GameCardComponent} from './components/game-card/game-card.component';
import {GamesAddComponent} from './components/games-add/games-add.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {GamesListComponent} from './components/games-list/games-list.component';
import {HeaderComponent} from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {GameEditComponent} from './components/game-edit/game-edit.component';
import {GamesSearchComponent} from './components/games-search/games-search.component';

const routes: Routes = [
  {
    path: 'games/add',
    component: GamesAddComponent
  },
  {
    path: 'games/:id',
    component: GameEditComponent
  },
  {
    path: 'games',
    component: GamesListComponent
  },
  {
    path: '**',
    redirectTo: '/games'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GameCardComponent,
    GamesAddComponent,
    GamesListComponent,
    HeaderComponent,
    GameEditComponent,
    GamesSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
