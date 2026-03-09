import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { combineLatest, map, Observable, of, take, tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PropVal } from '../../models/propval';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ActivatedRoute } from '@angular/router';
import { selectItemById } from '../../store/item/item.selector';
import { loadProperties } from '../../store/property/property.action';
import { loadValues } from '../../store/value/value.action';
import { selectPropertyList } from '../../store/property/property.selector';
import { selectValueList } from '../../store/value/value.selector';
import { Property } from '../../models/property';
import { Value } from '../../models/value';
import { environment } from '../../../environments/environment';
import { loadItem } from '../../store/item/item.action';
import { Comment } from '../../models/comment';
import { addComment, loadCommentsFromItem, reportComment } from '../../store/comments/comment.action';
import { selectCommentList } from '../../store/comments/comment.selector';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-itempage.component',
  imports: [AsyncPipe, DatePipe, MatCardModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './itempage.component.html',
  styleUrl: './itempage.component.scss',
})
export class ItemPageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'value', 'options'];
  api: string = environment.APIURL;
  itemId: number = 0;
  userId: number = 0;

  comment: string = '';

  item$: Observable<Item | undefined> = of();
  properties$: Observable<Property[]> = of([]);
  values$: Observable<Value[]> = of([]);
  tableData$: Observable<PropVal[]> = of([]);
  comments$: Observable<Comment[]> = of([]);
  loggedIn$: Observable<boolean> = of();

  constructor(private authService: AuthService, private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));

    this.item$ = this.store.select(selectItemById(this.itemId)).pipe(
      tap(item => {
        if (!item) {
          this.store.dispatch(loadItem({ itemId: this.itemId }));
        } else {
          this.store.dispatch(loadProperties({ categoryId: item.categoryId }));
          this.store.dispatch(loadValues({ itemId: item.id }));
          this.store.dispatch(loadCommentsFromItem({ itemId: this.itemId }));
        }
      })
    );

    this.mapTableData();

    this.comments$ = this.store.select(selectCommentList);

    this.loggedIn$ = this.authService.validateToken().pipe(
      tap(response => {
        if (response.valid) {
          this.userId = response.payload.id;
        }
      }),
      map(response => response.valid)
    );

  }

  mapTableData() {
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

  addComment() {
    this.store.dispatch(addComment({ userId: this.userId, content: this.comment, itemId: this.itemId }));
    this.comment = '';
  }

  reportComment(id: number) {
    this.store.dispatch(reportComment({ commentId: id }));
  }
}
