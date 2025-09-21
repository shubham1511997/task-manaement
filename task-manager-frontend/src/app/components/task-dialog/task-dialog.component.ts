import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    TaskDialogComponent,
  ],
  standalone: true,
})
export class TaskDialogComponent {
  task: Task;
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null,
    private apiService: ApiService
  ) {
    this.task = {
      title: data?.title || '',
      description: data?.description || '',
      status: data?.status || 'pending',
      _id: data?._id, // keep id for update
    };
  }

  save(form: NgForm) {
    if (form.invalid) return;

    if (this.task && this.task._id) {
      this.apiService
        .update(this.task._id, this.task, 'api/tasks')
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    } else {
      this.apiService.post(this.task!, 'api/tasks').subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
