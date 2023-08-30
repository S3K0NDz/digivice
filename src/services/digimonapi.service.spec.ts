import { TestBed } from '@angular/core/testing';

import { DigimonapiService } from './digimonapi.service';

describe('DigimonapiService', () => {
  let service: DigimonapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigimonapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
