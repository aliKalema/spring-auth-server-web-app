import { TestBed } from '@angular/core/testing';

import { OrgLevelService } from './org-level.service';

describe('OrgLevelService', () => {
  let service: OrgLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
