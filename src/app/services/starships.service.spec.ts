/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StarshipsService } from './starships.service';

describe('Service: Starships', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarshipsService]
    });
  });

  it('should ...', inject([StarshipsService], (service: StarshipsService) => {
    expect(service).toBeTruthy();
  }));
});
