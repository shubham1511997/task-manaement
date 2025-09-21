import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
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
import { AuthService } from '../../services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog';

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
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
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);
  statusFilter: 'all' | 'pending' | 'completed' = 'all';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.apiService.get('api/tasks').subscribe((tasks) => {
      this.dataSource.data = tasks;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applyFilter(); // apply current filter
    });
  }

  applyFilter() {
    if (this.statusFilter === 'all') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = this.statusFilter.trim().toLowerCase();
    }
  }

  openTaskDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task ? { ...task } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadTasks();
    });
  }

  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Task',
        message: `Are you sure you want to delete "${task.title}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.delete(task._id!, 'api/tasks').subscribe(() => {
          this.loadTasks(); // refresh task list
        });
      }
    });
  }

  // task-page.component.ts
  logout() {
    this.authService.logout();
  }
}
