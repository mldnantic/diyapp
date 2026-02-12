import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { PropertiesService } from '../../../../services/properties.service';
import { addCategory } from '../../../../store/category/category.action';
import { Observable, of } from 'rxjs';
import { Category } from '../../../../models/category';
import { Property } from '../../../../models/property';
import { DialogData } from '../../adminpanel.component';
import { RenameDialogComponent } from '../../../renamedialog/renamedialog.component';
import { DeleteDialogComponent } from '../../../deletedialog/deletedialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'categoryoptions',
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
    MatListModule
  ],
  providers: [Store],
  templateUrl: './categoryoptions.component.html',
  styleUrl: './categoryoptions.component.scss',
})
export class CategoryOptionsComponent {

  displayedColumns: string[] = ['name', 'delete'];
  readonly dialogDependency = inject(MatDialog);

  name: string = '';
  propertyName: string = '';

  categoryId: number = 0;

  @Input() categories: Category[] = [];
  properties$: Observable<Property[]> = of([]);

  constructor(private store: Store<AppState>, private propService: PropertiesService) { }

  addCategory(): void {
    if (this.name == '')
      return;
    this.store.dispatch(addCategory({ categoryName: this.name }));
  }

  onSelectionChange(event: any) {
    this.categoryId = event.value;
    this.properties$ = this.propService.getProperties(this.categoryId);
  }

  openDialog(dialogType: string, data: DialogData): void {
    let component: any;

    switch (dialogType) {
      case 'rename':
        component = RenameDialogComponent;
        break;
      case 'delete':
        component = DeleteDialogComponent;
        break;
      default:
        console.error("Unknown dialog type!");
        return;
    }

    const dialog = this.dialogDependency.open(component, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data
    });

    dialog.afterClosed().subscribe(result => {
      if (dialogType == 'rename' && result) {
        console.log(result);
      }

      if (dialogType == 'delete' && result === true) {
        console.log(data.id);
      }
    });
  }
}
