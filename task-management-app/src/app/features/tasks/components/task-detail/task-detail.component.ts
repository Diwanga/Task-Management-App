// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-task-detail',
//   templateUrl: './task-detail.component.html',
//   styleUrls: ['./task-detail.component.scss']
// })
// export class TaskDetailComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../../../shared/models/task.model';
import { TaskService } from '../../services/task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SUCCESS_MESSAGES } from '../../../../utils/constants/app.constants';

/**
 * Task Detail Component
 * Displays detailed information about a single task
 */
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {

  task: Task | null = null;
  loading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private notificationService: NotificationService,
    private logger: LoggerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Get task from resolver or route params
    this.route.data
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data['task']) {
          this.task = data['task'];
        } else {
          this.loadTask();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load task by ID from route params
   */
  private loadTask(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/tasks']);
      return;
    }

    this.loading = true;

    this.taskService.getTaskById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task) => {
          this.task = task;
          this.loading = false;
        },
        error: (error) => {
          this.logger.error('Failed to load task', 'TaskDetailComponent', error);
          this.notificationService.error('Failed to load task');
          this.router.navigate(['/tasks']);
        }
      });
  }

  /**
   * Navigate back to task list
   */
  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  /**
   * Navigate to edit task
   */
  editTask(): void {
    if (this.task) {
      this.router.navigate(['/tasks/edit', this.task.id]);
    }
  }

  /**
   * Delete task
   */
  deleteTask(): void {
    if (!this.task) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Task',
        message: `Are you sure you want to delete "${this.task.title}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        confirmColor: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.task) {
        this.performDelete(this.task.id);
      }
    });
  }

  /**
   * Perform task deletion
   */
  private performDelete(taskId: string): void {
    this.taskService.deleteTask(taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.logger.info('Task deleted', 'TaskDetailComponent', { taskId });
          this.notificationService.success(SUCCESS_MESSAGES.TASK_DELETED);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.logger.error('Failed to delete task', 'TaskDetailComponent', error);
          this.notificationService.error('Failed to delete task');
        }
      });
  }

  /**
   * Format status for display
   */
  formatStatus(status: string): string {
    return status.replace('_', ' ');
  }

  /**
   * Check if task is overdue
   */
  isOverdue(): boolean {
    if (!this.task || !this.task.dueDate || this.task.status === 'DONE') {
      return false;
    }
    return new Date(this.task.dueDate) < new Date();
  }
}
