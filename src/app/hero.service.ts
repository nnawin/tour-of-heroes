import { fromEventPattern, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient
  ) { }

  private heroesUrl = 'api/heroes'; // URL to web api

  httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions)
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id = ${id}`)),
        catchError(this.handleError<Hero>(`getHero id = ${id}`))
      );
  }

  getHeroes(): Observable<Hero[]> {
    this.log('fetched heroes');
    return this.httpClient
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  log(message: string) {
    this.messageService.add(`HeroService : ${message}`);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
