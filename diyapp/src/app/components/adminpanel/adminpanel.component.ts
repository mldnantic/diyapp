import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
import { addItem, loadItemsFromCategories } from '../../store/item/item.action';
import { selectItemList } from '../../store/item/item.selector';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemComponent } from '../item/item.component';
import { MatListModule } from '@angular/material/list';
import { Property } from '../../models/property';
import { PropertiesService } from '../../services/properties.service';
import { MatDialog } from '@angular/material/dialog';
import { RenameDialogComponent } from '../renamedialog/renamedialog.component';
import { DeleteDialogComponent } from '../deletedialog/deletedialog.component';
import { CategoryOptionsComponent } from "./tabs/categoryoptions/categoryoptions.component";
import { ItemOptionsComponent } from './tabs/itemoptions/itemoptions.component';

@Component({
  selector: 'adminpanel',
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
    MatListModule,
    CategoryOptionsComponent,
    ItemOptionsComponent
],
  providers: [Store],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss',
})
export class AdminPanelComponent implements OnInit {

  categories$: Observable<Category[]> = of([]);
  items$: Observable<Item[]> = of([]);
  combined$: Observable<{ categories: Category[]; items: Item[]; }> = of();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.select(selectCategoryList);
    this.store.dispatch(loadItemsFromCategories());
    this.items$ = this.store.select(selectItemList);

    this.combined$ = combineLatest([
      this.categories$,
      this.items$
    ]).pipe(
      map(([categories, items]) => ({ categories, items }))
    )
  }
}

export interface DialogData {
  entity: string;
  name: string;
  id: number;
}