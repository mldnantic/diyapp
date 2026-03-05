import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { combineLatest, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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

@Component({
  selector: 'app-itempage.component',
  imports: [AsyncPipe, MatCardModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './itempage.component.html',
  styleUrl: './itempage.component.scss',
})
export class ItemPageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'value', 'options'];

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
                propertyId: val.propertyId,
                propertyName: p?.name ?? '',
                value: val.value,
                valueId: val.id
              };
            }).sort((a, b) => a.propertyId - b.propertyId)
          )).subscribe(data => {
            this.tableData.data = data;
          })

      }
    })
  }

}
