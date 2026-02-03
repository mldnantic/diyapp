import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, of } from 'rxjs';
import { Category } from '../../models/category';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { addCategory, loadCategories } from '../../store/category/category.action';
import { selectCategoryList } from '../../store/category/category.selector';
import { AsyncPipe } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-adminpanel.component',
  imports: [AsyncPipe, MatButtonModule, MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatTableModule],
  providers: [CategoriesService, Store],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss',
})
export class AdminPanelComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name'];

  name: string = '';

  categories$: Observable<Category[]> = of([]);
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.dispatch(loadCategories());
    this.categories$ = this.store.select(selectCategoryList);

  }

  addCategory(): void {
    this.store.dispatch(addCategory({ categoryName: this.name }));
    this.categories$ = this.store.select(selectCategoryList);
  }

}
