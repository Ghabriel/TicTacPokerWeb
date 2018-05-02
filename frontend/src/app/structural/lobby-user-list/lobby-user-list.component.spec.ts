import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyUserListComponent } from './lobby-user-list.component';

describe('LobbyUserListComponent', () => {
  let component: LobbyUserListComponent;
  let fixture: ComponentFixture<LobbyUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
