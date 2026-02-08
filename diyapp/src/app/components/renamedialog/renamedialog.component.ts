import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { DialogData } from '../adminpanel/adminpanel.component';

@Component({
  selector: 'renamedialog',
  templateUrl: './renamedialog.component.html',
  styleUrl: './renamedialog.component.scss',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, MatFormFieldModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameDialogComponent {
  newName: string = '';
  readonly dialogRef = inject(MatDialogRef<RenameDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}
