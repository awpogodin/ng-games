import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameModel} from '../../models/game.model';
import {RestApiService} from '../../shared/services/rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {Unsubscribable} from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, OnDestroy {

  games: GameModel[] = [];
  private search: string;

  private subscription: Unsubscribable;

  constructor(public restApiService: RestApiService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParamMap.subscribe(params => {
      this.search = params.get('search') || '';
      this.loadGames(this.search);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteGame(id: string): void {
    this.restApiService.deleteGame(id).subscribe(() => {
      this.loadGames(this.search);
    });
  }

  private loadGames(search: string = ''): void {
    this.restApiService.getGames().subscribe(games => {
      this.games = games.filter(game => {
        return game.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });
    });
  }
}
