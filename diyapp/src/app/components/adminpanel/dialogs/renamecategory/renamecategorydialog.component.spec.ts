import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenamecategorydialogComponent } from './renamecategorydialog.component';

describe('RenamecategorydialogComponent', () => {
  let component: RenamecategorydialogComponent;
  let fixture: ComponentFixture<RenamecategorydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenamecategorydialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenamecategorydialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
