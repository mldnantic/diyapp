import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Category } from '../../models/category';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { addCategory, loadCategories } from '../../store/category/category.action';
import { selectCategoryList } from '../../store/category/category.selector';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Item } from '../../models/item';
import { addItem, loadItems } from '../../store/item/item.action';
import { selectItemList } from '../../store/item/item.selector';
import {MatGridListModule} from '@angular/material/grid-list';
import { ItemComponent } from '../item/item.component';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'adminpanel',
  imports: [
    AsyncPipe,
    ItemComponent,
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
  providers: [Store],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss',
})
export class AdminPanelComponent implements OnInit {

  displayedColumns: string[] = ['name', 'delete'];

  name: string = '';

  categoryId: number = 0;
  itemName: string = '';
  itemPrice: number = 0;

  categories$: Observable<Category[]> = of([]);
  items$: Observable<Item[]> = of([]);
  combined$: Observable<{ categories: Category[]; items: Item[]; }> = of();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.select(selectCategoryList);
    this.store.dispatch(loadItems());
    this.items$ = this.store.select(selectItemList);

    this.combined$ = combineLatest([
      this.categories$,
      this.items$
    ]).pipe(
      map(([categories, items]) => ({categories, items}))
    )
  }

  addCategory(): void {
    if(this.name == '')
      return;
    this.store.dispatch(addCategory({ categoryName: this.name }));
    this.categories$ = this.store.select(selectCategoryList);
  }

  onSelectionChange(event: any) {
    this.categoryId = event.value;
    console.log(this.categoryId);
  }

  addItem(): void {
    this.store.dispatch(addItem({
      name: this.itemName,
      price: this.itemPrice,
      categoryId: this.categoryId
    }));
    this.items$ = this.store.select(selectItemList);
  }
}
