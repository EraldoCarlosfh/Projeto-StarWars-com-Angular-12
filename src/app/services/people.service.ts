import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { People } from '../models/People';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class PeopleService {

  public endpoint = 'people';

  constructor(
    private http: HttpClient
  ) { }

  public getPeople(): Observable<People[]> {
    return this.http
      .get<People[]>(environment.api + this.endpoint)
      .pipe(take(1));
  }

  public getPeopleById(id: number,): Observable<People> {
    return this.http
      .get<People>(`${environment.api + this.endpoint}/${id}`)
      .pipe(take(1));
  }

  }
