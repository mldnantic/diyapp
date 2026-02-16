import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDialogComponent } from './itemdialog.component';

describe('ItemdialogComponent', () => {
  let component: ItemDialogComponent;
  let fixture: ComponentFixture<ItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
