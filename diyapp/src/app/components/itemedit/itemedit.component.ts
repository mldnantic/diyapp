import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, of, take } from 'rxjs';
import { Property } from '../../models/property';
import { Value } from '../../models/value';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'itemedit',
  imports: [],
  providers: [Store],
  templateUrl: './itemedit.component.html',
  styleUrl: './itemedit.component.scss',
})
export class ItemEditComponent implements OnInit {

  item$: Observable<void> = of();
  properties$: Observable<Property[]> = of([]);
  values$: Observable<Value[]> = of([]);
  combined$: Observable<{ properties: Property[]; values: Value[]; }> = of();

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
  }

}
