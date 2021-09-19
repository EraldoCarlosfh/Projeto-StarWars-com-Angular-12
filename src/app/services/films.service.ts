import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Films } from '../models/Films';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class FilmsService {

  public endpoint = 'api/films';

  constructor(
    private http: HttpClient
  ) { }

  public getFilms(): Observable<Films[]> {
    return this.http
      .get<Films[]>(environment.api3 + this.endpoint)
      .pipe(take(1));
  }

  public getFilmsById(id: number,): Observable<Films> {
    return this.http
      .get<Films>(`${environment.api3 + this.endpoint}/${id}`)
      .pipe(take(1));
  }

  }
