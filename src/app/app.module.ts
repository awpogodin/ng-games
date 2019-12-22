import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GameCardComponent} from './components/game-card/game-card.component';
import {GameFormComponent} from './components/game-form/game-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {GamesListComponent} from './components/games-list/games-list.component';
import {HeaderComponent} from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {GameEditComponent} from './components/game-edit/game-edit.component';
import {GamesSearchComponent} from './components/games-search/games-search.component';

const routes: Routes = [
  {
    path: 'games/add',
    component: GameFormComponent
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
    GameFormComponent,
    GamesListComponent,
    HeaderComponent,
    GameEditComponent,
    GamesSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
