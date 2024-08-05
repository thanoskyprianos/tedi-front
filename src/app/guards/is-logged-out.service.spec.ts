import { TestBed } from '@angular/core/testing';

import { IsLoggedOutService } from './is-logged-out.service';

describe('IsLoggedOutService', () => {
  let service: IsLoggedOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsLoggedOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
