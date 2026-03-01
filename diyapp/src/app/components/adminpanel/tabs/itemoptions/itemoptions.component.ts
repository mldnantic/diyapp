import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import { ItemComponent } from '../../../item/item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { Category } from '../../../../models/category';
import { Item } from '../../../../models/item';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { addItem, loadItemsFromCategories } from '../../../../store/item/item.action';

@Component({
  selector: 'itemoptions',
  imports: [
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
    MatListModule,
  ],
  templateUrl: './itemoptions.component.html',
  styleUrl: './itemoptions.component.scss',
})
export class ItemOptionsComponent implements AfterViewInit {

  categoryId: number = 0;
  itemName: string = '';
  itemPrice: number = 0;

  @Input() categories: Category[] = [];
  @Input() items: Item[] = [];

  appBodyHeight = '300px';
  rowHeight = '150px';

  constructor(private store: Store<AppState>) { }

  @HostListener('window:resize')
  onResize(): void {
    this.updateAppBodyHeight();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateAppBodyHeight());
  }

  private updateAppBodyHeight(): void {
    const appbody = document.querySelector('.app-body') as HTMLElement;
    if (appbody) {
      this.appBodyHeight = appbody.offsetHeight * 0.5 + 'px';
      this.rowHeight = appbody.offsetHeight / 4 + 'px';
    }
  }

  onSelectionChange(event: any): void {
    this.categoryId = event.value;
  }

  onFilterSelection(list: MatSelectionList): void {
    const selectedValues = list.selectedOptions.selected.map(o => o.value);
    this.store.dispatch(loadItemsFromCategories({ categoryIds: selectedValues }));
  }

  addItem(): void {
    if (this.categoryId == 0 || this.itemName == '' || this.itemPrice == 0) {
      return;
    }
    this.store.dispatch(addItem({
      name: this.itemName,
      price: this.itemPrice,
      categoryId: this.categoryId
    }));
    this.itemName = '';
    this.itemPrice = 0;
  }

}
