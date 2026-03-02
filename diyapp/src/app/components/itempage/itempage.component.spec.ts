import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPageComponent } from './itempage.component';

describe('ItemPageComponent', () => {
  let component: ItemPageComponent;
  let fixture: ComponentFixture<ItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
