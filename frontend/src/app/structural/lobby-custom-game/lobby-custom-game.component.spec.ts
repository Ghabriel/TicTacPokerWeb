import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyCustomGameComponent } from './lobby-custom-game.component';

describe('LobbyCustomGameComponent', () => {
  let component: LobbyCustomGameComponent;
  let fixture: ComponentFixture<LobbyCustomGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyCustomGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyCustomGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
