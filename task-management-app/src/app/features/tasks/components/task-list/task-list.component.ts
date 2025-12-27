// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-task-list',
//   templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.scss']
// })
// export class TaskListComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Task, TaskStatus, TaskPriority, TaskFilter } from '../../../../shared/models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskStateService } from '../../services/task-state.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SUCCESS_MESSAGES } from '../../../../utils/constants/app.constants';

/**
 * Task List Component
 * Displays tasks in a table with filtering, sorting, and pagination
 */
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Table configuration
  displayedColumns: string[] = ['title', 'status', 'priority', 'assignedTo', 'dueDate', 'actions'];
  dataSource!: MatTableDataSource<Task>;

  // Loading state
  loading = false;

  // Filter
  currentFilter: TaskFilter = {};

  // Enums for template
  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private taskStateService: TaskStateService,
    private notificationService: NotificationService,
    private logger: LoggerService,
    private router: Router,
    private dialog: MatDialog
  ) {
    // Initialize data source
    this.dataSource = new MatTableDataSource<Task>([]);
  }

  ngOnInit(): void {
    // Load tasks
    this.loadTasks();

    // Subscribe to filter changes
    this.taskStateService.filter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filter => {
        this.currentFilter = filter;
        this.applyFilter();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load tasks from API
   */
  loadTasks(): void {
    this.loading = true;

    this.taskService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.logger.debug('Tasks loaded', 'TaskListComponent', { count: tasks.length });
          this.taskStateService.setTasks(tasks);
          this.dataSource.data = tasks;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        },
        error: (error) => {
          this.logger.error('Failed to load tasks', 'TaskListComponent', error);
          this.loading = false;
          this.notificationService.error('Failed to load tasks');
        }
      });
  }

  /**
   * Apply filter to data source
   */
  applyFilter(): void {
    if (Object.keys(this.currentFilter).length === 0) {
      // No filter, show all tasks
      this.dataSource.data = this.taskStateService.tasks;
    } else {
      // Apply filter
      const filteredTasks = this.taskStateService.filterTasks(this.currentFilter);
      this.dataSource.data = filteredTasks;
    }
  }

  /**
   * Apply search filter
   */
  applySearch(searchText: string): void {
    this.dataSource.filter = searchText.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Navigate to task detail
   */
  viewTask(task: Task): void {
    this.router.navigate(['/tasks/detail', task.id]);
  }

  /**
   * Navigate to edit task
   */
  editTask(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  /**
   * Delete task
   */
  deleteTask(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Task',
        message: `Are you sure you want to delete "${task.title}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        confirmColor: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDelete(task);
      }
    });
  }

  /**
   * Perform task deletion
   */
  private performDelete(task: Task): void {
    this.taskService.deleteTask(task.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.logger.info('Task deleted', 'TaskListComponent', { taskId: task.id });
          this.taskStateService.removeTask(task.id);
          this.dataSource.data = this.taskStateService.tasks;
          this.notificationService.success(SUCCESS_MESSAGES.TASK_DELETED);
        },
        error: (error) => {
          this.logger.error('Failed to delete task', 'TaskListComponent', error);
          this.notificationService.error('Failed to delete task');
        }
      });
  }

  /**
   * Navigate to create task
   */
  createTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  /**
   * Refresh task list
   */
  refreshTasks(): void {
    this.loadTasks();
  }

  /**
   * Get status badge color
   */
  getStatusColor(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TODO:
        return 'primary';
      case TaskStatus.IN_PROGRESS:
        return 'accent';
      case TaskStatus.DONE:
        return 'success';
      default:
        return '';
    }
  }

  /**
   * Get priority badge color
   */
  getPriorityColor(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.LOW:
        return 'success';
      case TaskPriority.MEDIUM:
        return 'primary';
      case TaskPriority.HIGH:
        return 'warn';
      case TaskPriority.URGENT:
        return 'danger';
      default:
        return '';
    }
  }

  /**
   * Format status for display
   */
  formatStatus(status: TaskStatus): string {
    return status.replace('_', ' ');
  }

  /**
   * Check if task is overdue
   */
  isOverdue(task: Task): boolean {
    if (!task.dueDate || task.status === TaskStatus.DONE) {
      return false;
    }
    return new Date(task.dueDate) < new Date();
  }
}
