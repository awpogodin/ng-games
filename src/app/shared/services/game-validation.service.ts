import {FormControl, ValidationErrors} from '@angular/forms';
import {RestApiService} from './rest-api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameValidationService {

  constructor(private restApiService: RestApiService) {

  }

  validateName(control: FormControl, initName: string): Observable<ValidationErrors> {
    const newName = control.value;
    return new Observable<ValidationErrors>(observer => {
      if (newName === initName) {
        observer.next(null);
        observer.complete();
      } else {
        this.restApiService.getGameByName(newName).subscribe(games => {
          if (games.length) {
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
