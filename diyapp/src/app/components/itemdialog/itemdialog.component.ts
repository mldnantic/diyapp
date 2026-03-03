import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RenameDialogComponent } from '../renamedialog/renamedialog.component';
import { ItemDialogData } from '../itemedit/itemedit.component';

@Component({
  selector: 'itemdialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './itemdialog.component.html',
  styleUrl: './itemdialog.component.scss',
})
export class ItemDialogComponent {
  newValue: string = '';
  readonly dialogRef = inject(MatDialogRef<RenameDialogComponent>);
  readonly data = inject<ItemDialogData>(MAT_DIALOG_DATA);
}
