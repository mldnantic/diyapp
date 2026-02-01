import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorpanelComponent } from './moderatorpanel.component';

describe('ModeratorpanelComponent', () => {
  let component: ModeratorpanelComponent;
  let fixture: ComponentFixture<ModeratorpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorpanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorpanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
