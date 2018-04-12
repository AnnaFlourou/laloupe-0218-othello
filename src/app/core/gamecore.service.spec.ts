import { TestBed, inject } from '@angular/core/testing';

import { GamecoreService } from './gamecore.service';

describe('GamecoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamecoreService]
    });
  });

  it('should be created', inject([GamecoreService], (service: GamecoreService) => {
    expect(service).toBeTruthy();
  }));
});
