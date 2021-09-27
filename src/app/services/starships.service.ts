import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Starship } from '../models/Starship';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class StarshipsService {

  public endpoint = 'starships';
  public endpoint2 = 'starship';

constructor(
  private http: HttpClient
) { }

public getStarship(): Observable<Starship[]> {
  return this.http
    .get<Starship[]>(environment.api + this.endpoint)
    .pipe(take(1));
}

public getStarshipPage(page: number): Observable<Starship[]> {
  return this.http
    .get<Starship[]>(`${environment.api + this.endpoint}/?page=${page}`)
    .pipe(take(1));
}

public getStarshipById(id: number,): Observable<Starship> {
  return this.http
    .get<Starship>(`${environment.api + this.endpoint}/${id}`)
    .pipe(take(1));
}
public postStarship(starship: Starship): Observable<Starship> {
  return this.http
    .post<Starship>(environment.api + 'save/' + this.endpoint2, starship)
    .pipe(take(1));
}

public putStarship(starship: Starship): Observable<Starship> {
  return this.http
    .put<Starship>(environment.api + 'update/' + this.endpoint2, starship)
    .pipe(take(1));
}

public deleteStarship(starship: Starship): Observable<any> {
  return this.http
    .delete(`${environment.api + 'delete/' + this.endpoint2, starship}`)
    .pipe(take(1));
}

public deleteStarshipById(id: number): Observable<any> {
  return this.http
    .delete(`${environment.api + 'delete/starship/'}${id}`)
    .pipe(take(1));
}

}
