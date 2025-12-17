import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { VideoGame, VideoGameDetail } from '../models/Videogame.model';

@Injectable({
  providedIn: 'root',
})
export class VideogamesService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<VideoGame[]> {
    return this.http
      .get<VideoGame[]>(`${this.apiUrl}/games`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getGameById(id: number): Observable<VideoGameDetail> {
    return this.http
      .get<VideoGameDetail>(`${this.apiUrl}/game`, {
        params: { id: id.toString() },
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  getGamesByPlatform(platform: string): Observable<VideoGame[]> {
    return this.http
      .get<VideoGame[]>(`${this.apiUrl}/games`, {
        params: { platform },
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  getGameByCategory(category: string): Observable<VideoGame[]> {
    return this.http
      .get<VideoGame[]>(`${this.apiUrl}/games`, {
        params: { category },
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  getGamesSorted(shortBy: string): Observable<VideoGame[]> {
    return this.http
      .get<VideoGame[]>(`${this.apiUrl}/games`, {
        params: { shortBy },
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown Error';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `code Error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
