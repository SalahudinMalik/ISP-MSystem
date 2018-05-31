import { TestBed, inject } from '@angular/core/testing';

import { DealersService } from './dealers.service';

describe('DealersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealersService]
    });
  });

  it('should be created', inject([DealersService], (service: DealersService) => {
    expect(service).toBeTruthy();
  }));
});
