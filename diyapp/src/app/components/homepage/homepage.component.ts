import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Category } from '../../models/category';
import { AsyncPipe } from '@angular/common';
import { Item } from '../../models/item';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadCategories } from '../../store/category/category.action';
import { selectCategoryList } from '../../store/category/category.selector';
import { selectItemList } from '../../store/item/item.selector';
import { loadItemsFromCategories } from '../../store/item/item.action';

@Component({
  selector: 'homepage',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatGridListModule,
    MatListModule
],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomePageComponent implements OnInit {

  categories$: Observable<Category[]> = of([]);
  items$: Observable<Item[]> = of([]);
  combined$: Observable<{ categories: Category[]; items: Item[]; }> = of();

  selectedValues: number[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.select(selectCategoryList);

    this.items$ = this.store.select(selectItemList);

    this.combined$ = combineLatest([
      this.categories$,
      this.items$
    ]).pipe(
      map(([categories, items]) => ({ categories, items }))
    )
  }

  onFilterSelection(list: MatSelectionList): void {
    this.selectedValues = list.selectedOptions.selected.map(o => o.value);
  }

  onApplyFilter(): void {
    this.store.dispatch(loadItemsFromCategories({ categoryIds: this.selectedValues }));
  }

}
