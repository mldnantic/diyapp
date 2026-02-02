import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Wood'},
  {position: 2, name: 'Tools'},
  {position: 3, name: 'Metal'},
  {position: 4, name: 'Decoration'}
];

@Component({
  selector: 'app-adminpanel.component',
  imports: [MatButtonModule, MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatTableModule],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss',
})
export class AdminPanelComponent {

  displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;

}
 