import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {GameModel} from '../../models/game.model';

const API = '/api/games/';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // Http Options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  // CRUD
  getGames(): Observable<GameModel[]> {
    return this.httpClient.get<GameModel[]>(API)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getGame(id: string): Observable<GameModel> {
    return this.httpClient.get<GameModel>(API + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  addGame(game: GameModel): Observable<GameModel> {
    return this.httpClient.post<GameModel>(API, JSON.stringify(game), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateGame(id: string, game: GameModel): Observable<GameModel> {
    return this.httpClient.patch<GameModel>(API + id, JSON.stringify(game), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteGame(id: string): Observable<GameModel> {
    return this.httpClient.delete<GameModel>(API + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Handle errors
  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      // Throw client-side error
      return throwError(error.error.message);
    } else {
      // Throw server-side error
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }
  }
}
