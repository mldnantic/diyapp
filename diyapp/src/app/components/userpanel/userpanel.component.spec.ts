import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelComponent } from './userpanel.component';

describe('UserpanelComponent', () => {
  let component: UserPanelComponent;
  let fixture: ComponentFixture<UserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
