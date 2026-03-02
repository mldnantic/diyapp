import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, of, take } from 'rxjs';
import { Property } from '../../models/property';
import { Value } from '../../models/value';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item';
import { selectItemById } from '../../store/item/item.selector';
import { AsyncPipe } from '@angular/common';
import { loadProperties } from '../../store/property/property.action';
import { loadValues } from '../../store/value/value.action';
import { selectPropertyList } from '../../store/property/property.selector';
import { selectValueList } from '../../store/value/value.selector';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'itemedit',
  imports: [AsyncPipe, MatCardModule],
  providers: [Store],
  templateUrl: './itemedit.component.html',
  styleUrl: './itemedit.component.scss',
})
export class ItemEditComponent implements OnInit {

  item$: Observable<Item | undefined> = of();
  properties$: Observable<Property[]> = of([]);
  values$: Observable<Value[]> = of([]);
  combined$: Observable<{ properties: Property[]; values: Value[]; }> = of();

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
      }
    })
  }

}
