import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Property } from '../../models/property';
import { Value } from '../../models/value';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item';
import { selectItemById } from '../../store/item/item.selector';
import { AsyncPipe } from '@angular/common';
import { loadProperties } from '../../store/property/property.action';
import { loadValues, updateValue } from '../../store/value/value.action';
import { selectPropertyList } from '../../store/property/property.selector';
import { selectValueList } from '../../store/value/value.selector';
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PropVal } from '../../models/propval';
import { MatDialog } from '@angular/material/dialog';
import { updateItem } from '../../store/item/item.action';
import { ItemDialogComponent } from '../itemdialog/itemdialog.component';

@Component({
  selector: 'itemedit',
  imports: [AsyncPipe, MatCardModule, MatTableModule, MatButtonModule],
  providers: [Store],
  templateUrl: './itemedit.component.html',
  styleUrl: './itemedit.component.scss',
})
export class ItemEditComponent implements OnInit {

  displayedColumns: string[] = ['name', 'value', 'options'];
  readonly dialogDependency = inject(MatDialog);

  item$: Observable<Item | undefined> = of();
  properties$: Observable<Property[]> = of([]);
  values$: Observable<Value[]> = of([]);
  tableData = new MatTableDataSource<PropVal>();

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.item$ = this.store.select(selectItemById(itemId));
    this.item$.subscribe(i => {
      if (i) {
        this.store.dispatch(loadProperties({ categoryId: i.categoryId }));
        this.store.dispatch(loadValues({ itemId: i.id }))
        this.properties$ = this.store.select(selectPropertyList);
        this.values$ = this.store.select(selectValueList);

        combineLatest([this.properties$, this.values$]).pipe(
          map(([props, vals]) =>
            vals.map(val => {
              const p = props.find(x => x.id == val.propertyId);
              return {
                propertyName: p?.name ?? '',
                value: val.value,
                valueId: val.id
              };
            })
          )).subscribe(data => {
            this.tableData.data = data;
          })

      }
    })
  }

  openItemDialog(data: ItemDialogData): void {

    let component = ItemDialogComponent;

    const dialog = this.dialogDependency.open(component, {
      width: '400px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        if (data.fieldName == 'name') {
          this.store.dispatch(updateItem({ itemId: data.id, changes: { name: result } }));
        }
        if (data.fieldName == 'price') {
          this.store.dispatch(updateItem({ itemId: data.id, changes: { price: result } }));
        }
        if (data.fieldName == 'value') {
          this.store.dispatch(updateValue({ valueId: data.id, value: result }));
        }
      }
    });
  }
}

export interface ItemDialogData {
  fieldName: string;
  id: number;
  name: string;
}
