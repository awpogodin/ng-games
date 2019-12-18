import {FormControl, ValidationErrors} from '@angular/forms';
import {GameModel} from '../../models/game.model';
import {RestApiService} from './rest-api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameValidationService {

  private games: GameModel[];

  constructor(private restApiService: RestApiService) {

  }

  validateName(control: FormControl, startName: string): Observable<ValidationErrors> {
    const newName = control.value;
    return new Observable<ValidationErrors>(observer => {
      if (newName === startName) {
        observer.next(null);
        observer.complete();
      } else {
        this.restApiService.getGames().subscribe(games => {
          this.games = games;
          const nameExist = this.games.find(g => g.name.toLocaleLowerCase() === newName.toLocaleLowerCase());
          if (nameExist) {
            observer.next({
              gameExist: true
            });
            observer.complete();
          } else {
            observer.next(null);
            observer.complete();
          }
        });
      }
    });
  }
}
