import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOptionsComponent } from './categoryoptions.component';

describe('CategoryOptionsComponent', () => {
  let component: CategoryOptionsComponent;
  let fixture: ComponentFixture<CategoryOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryOptionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
