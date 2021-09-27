import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { People } from '../models/People';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class PeopleService {

  public endpoint = 'pilots';
   public endpoint2 = 'pilot';

  constructor(
    private http: HttpClient
  ) { }

  public getAllPilot(): Observable<People[]> {
    return this.http
      .get<People[]>(environment.api + this.endpoint)
      .pipe(take(1));
  }

  public getPilotPage(page: number): Observable<People[]> {
    return this.http
      .get<People[]>(`${environment.api + this.endpoint}/?page=${page}`)
      .pipe(take(1));
  }

  public getPilotById(id: number,): Observable<People> {
    return this.http
      .get<People>(`${environment.api + this.endpoint2}/${id}`)
      .pipe(take(1));
  }

   public postPilot(pilot: People): Observable<People> {
    return this.http
      .post<People>(environment.api + 'save/' + this.endpoint2, pilot)
      .pipe(take(1));
  }

  public putPilot(pilot: People): Observable<People> {
    return this.http
      .put<People>(environment.api + 'update/' + this.endpoint2, pilot)
      .pipe(take(1));
  }

  public deletePilot(pilot: People): Observable<any> {
    return this.http
      .delete(`${environment.api + 'delete/'}${pilot}`)
      .pipe(take(1));
  }

  public deletePilotById(id: number): Observable<People> {
    return this.http
      .delete<People>(`${environment.api + 'delete/pilot/'}${id}`)
      .pipe(take(1));
  }

  }
