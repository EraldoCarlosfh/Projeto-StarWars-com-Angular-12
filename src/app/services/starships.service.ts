import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Starship } from '../models/Starship';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class StarshipsService {

  public endpoint = 'starships';

constructor(
  private http: HttpClient
) { }

public getStarship(): Observable<Starship[]> {
  return this.http
    .get<Starship[]>(environment.api + this.endpoint)
    .pipe(take(1));
}

public getStarshipById(id: number,): Observable<Starship> {
  return this.http
    .get<Starship>(`${environment.api + this.endpoint}/${id}`)
    .pipe(take(1));
}

}
