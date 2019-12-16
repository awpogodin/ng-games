import {Component} from '@angular/core';
import {GameModel} from '../../models/game.model';
import {RestApiService} from '../../shared/services/rest-api.service';
import {Router} from '@angular/router';
import {GameValidator} from '../../shared/validators/game.validator';

@Component({
  selector: 'app-game-form',
  templateUrl: './games-add.component.html',
  styleUrls: ['./games-add.component.scss']
})
export class GamesAddComponent {
  name = '';
  developer = '';
  platforms = '';
  error = '';

  constructor(public restApiService: RestApiService, public router: Router) {
  }

  addGame(): void {
    const game: GameModel = {
      name: this.name,
      developer: this.developer,
      platforms: this.platforms
    };
    if (GameValidator.isValid(game)) {
      this.restApiService.addGame(game).subscribe(() => {
        this.router.navigate(['/games']);
      });
    } else {
      this.error = 'Введены неверные данные';
    }

  }

}
