import { Component, Input } from '@angular/core';
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
import { MatListModule } from '@angular/material/list';
import { Category } from '../../../../models/category';
import { Item } from '../../../../models/item';
import { Observable, of } from 'rxjs';
import { Property } from '../../../../models/property';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { PropertiesService } from '../../../../services/properties.service';
import { addItem } from '../../../../store/item/item.action';

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
export class ItemOptionsComponent {

  categoryId: number = 0;
  itemName: string = '';
  itemPrice: number = 0;

  @Input() categories: Category[] = [];
  @Input() items: Item[] = [];
  properties$: Observable<Property[]> = of([]);

  constructor(private store: Store<AppState>, private propService: PropertiesService) { }

  onSelectionChange(event: any) {
    this.categoryId = event.value;
    this.properties$ = this.propService.getProperties(this.categoryId);
  }

  addItem(): void {
    this.store.dispatch(addItem({
      name: this.itemName,
      price: this.itemPrice,
      categoryId: this.categoryId
    }));
  }

}
