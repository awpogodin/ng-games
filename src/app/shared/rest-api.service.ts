import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {GameModel} from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // Define API
  private apiURL = 'http://localhost:3000/api/games/';
  private errorMessage: string;

  constructor(private httpClient: HttpClient) {
  }

  // CRUD
  getGames(): Observable<GameModel[]> {
    return this.httpClient.get<GameModel[]>(this.apiURL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getGame(id: string): Observable<GameModel> {
    return this.httpClient.get<GameModel>(this.apiURL + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  addGame(game: GameModel): Observable<GameModel> {
    return this.httpClient.post<GameModel>(this.apiURL, JSON.stringify(game), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateGame(id: string, game: GameModel): Observable<GameModel> {
    return this.httpClient.patch<GameModel>(this.apiURL + id, JSON.stringify(game), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteGame(id: string): Observable<GameModel> {
    return this.httpClient.delete<GameModel>(this.apiURL + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Handle errors
  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      this.errorMessage = error.error.message;
    } else {
      // Get server-side error
      this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(this.errorMessage);
    return throwError(this.errorMessage);
  }
}
