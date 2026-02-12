import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCompatibilityComponent } from './itemcompatibility.component';

describe('ItemCompatibilityComponent', () => {
  let component: ItemCompatibilityComponent;
  let fixture: ComponentFixture<ItemCompatibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCompatibilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCompatibilityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
