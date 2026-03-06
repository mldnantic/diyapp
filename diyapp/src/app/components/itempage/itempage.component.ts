import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { combineLatest, map, Observable, of, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PropVal } from '../../models/propval';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { selectItemById } from '../../store/item/item.selector';
import { loadProperties } from '../../store/property/property.action';
import { loadValues } from '../../store/value/value.action';
import { selectPropertyList } from '../../store/property/property.selector';
import { selectValueList } from '../../store/value/value.selector';
import { Property } from '../../models/property';
import { Value } from '../../models/value';
import { environment } from '../../../environments/environment';
import { loadItem } from '../../store/item/item.action';

@Component({
  selector: 'app-itempage.component',
  imports: [AsyncPipe, MatCardModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './itempage.component.html',
  styleUrl: './itempage.component.scss',
})
export class ItemPageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'value', 'options'];
  api: string = environment.APIURL;

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
}
