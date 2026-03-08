import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
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
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PropVal } from '../../models/propval';
import { MatDialog } from '@angular/material/dialog';
import { loadItem, updateItem, uploadItemImage } from '../../store/item/item.action';
import { ItemDialogComponent } from '../itemdialog/itemdialog.component';
import { environment } from '../../../environments/environment';
import { ItemDialogData } from '../../models/itemdialogdata';

@Component({
  selector: 'itemedit',
  imports: [AsyncPipe, MatCardModule, MatTableModule, MatButtonModule],
  providers: [Store],
  templateUrl: './itemedit.component.html',
  styleUrl: './itemedit.component.scss',
})
export class ItemEditComponent implements OnInit {

  displayedColumns: string[] = ['name', 'value', 'options'];
  api: string = environment.APIURL;
  readonly dialogDependency = inject(MatDialog);

  selectedFile: File | null = null;

  item$: Observable<Item | undefined> = of();
  properties$: Observable<Property[]> = of([]);
  values$: Observable<Value[]> = of([]);
  tableData$: Observable<PropVal[]> = of([]);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.item$ = this.store.select(selectItemById(itemId)).pipe(
      tap(item => {
        if (!item) {
          this.store.dispatch(loadItem({ itemId }));
        } else {
          this.store.dispatch(loadProperties({ categoryId: item.categoryId }));
          this.store.dispatch(loadValues({ itemId: item.id }));
        }
      })
    );

    this.tableData$ = combineLatest([
      this.store.select(selectPropertyList),
      this.store.select(selectValueList)
    ]).pipe(
      map(([props, vals]) =>
        vals.map(val => {
          const p = props.find(x => x.id === val.propertyId);
          return {
            propertyId: val.propertyId,
            propertyName: p?.name ?? '',
            value: val.value,
            valueId: val.id
          };
        }).sort((a, b) => a.propertyId - b.propertyId)
      )
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const itemId = Number(this.route.snapshot.paramMap.get('id'));
      this.store.dispatch(uploadItemImage({itemId: itemId, image: this.selectedFile}));
    }
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