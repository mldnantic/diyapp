import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'createdialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './createdialog.component.html',
  styleUrl: './createdialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDialogComponent {
  projectName: string = '';
  readonly dialogRef = inject(MatDialogRef<CreateDialogComponent>);
}
