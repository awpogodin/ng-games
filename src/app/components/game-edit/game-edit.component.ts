import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestApiService} from '../../shared/services/rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Unsubscribable} from 'rxjs';
import {GameModel} from '../../models/game.model';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit, OnDestroy {

  game: GameModel;
  name = '';
  developer = '';
  platforms = '';
  error = '';

  private gameId: string;

  private subscription: Unsubscribable;

  constructor(private route: ActivatedRoute, public restApiService: RestApiService, public router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      switchMap(params => this.restApiService.getGame(params.id))
    ).subscribe(game => {
      this.game = game;
      this.name = game.name;
      this.developer = game.developer.toString();
      this.platforms = game.platforms.toString();
      this.gameId = this.route.snapshot.params.id;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
