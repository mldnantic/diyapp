import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Project } from '../../models/project';
import { Observable, of } from 'rxjs';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { loadProjectsFromUser } from '../../store/project/project.action';
import { selectProjectList } from '../../store/project/project.selector';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'projectdialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule, AsyncPipe],
  templateUrl: './projectdialog.component.html',
  styleUrl: './projectdialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDialogComponent implements OnInit {
  projectId: number = 0;
  quantity: number = 1;
  readonly dialogRef = inject(MatDialogRef<ProjectDialogComponent>);
  readonly data = inject<{userId: number}>(MAT_DIALOG_DATA);

  projects$: Observable<Project[]> = of([]);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadProjectsFromUser({userId: this.data.userId}));
    this.projects$ = this.store.select(selectProjectList);
  }

  onSelectProject(event: any) {
    this.projectId = event.value;
  }
}
