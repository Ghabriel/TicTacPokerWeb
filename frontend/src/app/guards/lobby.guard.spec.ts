import { TestBed, async, inject } from '@angular/core/testing';

import { LobbyGuard } from './lobby.guard';

describe('LobbyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LobbyGuard]
    });
  });

  it('should ...', inject([LobbyGuard], (guard: LobbyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
