import { TestBed } from '@angular/core/testing';

import { UserFetcherService } from '../app/services/user-fetcher.service';

describe('UserFetcherService', () => {
  let service: UserFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
