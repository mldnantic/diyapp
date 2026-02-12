import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOptionsComponent } from './itemoptions.component';

describe('ItemOptionsComponent', () => {
  let component: ItemOptionsComponent;
  let fixture: ComponentFixture<ItemOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemOptionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
