// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-task-form',
//   templateUrl: './task-form.component.html',
//   styleUrls: ['./task-form.component.scss']
// })
// export class TaskFormComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Task, TaskStatus, TaskPriority, CreateTaskDto, UpdateTaskDto } from '../../../../shared/models/task.model';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../../../utils/constants/app.constants';
import { CanComponentDeactivate } from '../../../../core/guards/can-deactivate.guard';

/**
 * Task Form Component
 * Create or edit task
 */
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  taskForm!: FormGroup;
  loading = false;
  isEditMode = false;
  taskId: string | null = null;
  originalFormValue: any;

  // Enums for template
  statuses = Object.values(TaskStatus);
  priorities = Object.values(TaskPriority);

  // Tags
  tags: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Can deactivate guard implementation
   */
  canDeactivate(): boolean {
    if (this.hasUnsavedChanges()) {
      return confirm('You have unsaved changes. Do you want to leave this page?');
    }
    return true;
  }

  /**
   * Check if form has unsaved changes
   */
  private hasUnsavedChanges(): boolean {
    if (!this.originalFormValue) {
      return false;
    }
    return JSON.stringify(this.taskForm.value) !== JSON.stringify(this.originalFormValue);
  }

  /**
   * Initialize form
   */
  private initializeForm(): void {
    const currentUser = this.authService.currentUserValue;

    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: [TaskStatus.TODO, Validators.required],
      priority: [TaskPriority.MEDIUM, Validators.required],
      assignedTo: [''],
      dueDate: [''],
      estimatedHours: ['', [Validators.min(0)]],
      tags: [[]]
    });
  }

  /**
   * Check if in edit mode and load task
   */
  private checkEditMode(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');

    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask(this.taskId);
    } else {
      // Store original form value for new task
      this.originalFormValue = this.taskForm.value;
    }
  }

  /**
   * Load task for editing
   */
  private loadTask(id: string): void {
    this.loading = true;

    this.taskService.getTaskById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task) => {
          this.populateForm(task);
          this.loading = false;
          // Store original form value
          this.originalFormValue = this.taskForm.value;
        },
        error: (error) => {
          this.logger.error('Failed to load task', 'TaskFormComponent', error);
          this.notificationService.error('Failed to load task');
          this.router.navigate(['/tasks']);
        }
      });
  }

  /**
   * Populate form with task data
   */
  private populateForm(task: Task): void {
    this.tags = task.tags || [];

    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo || '',
      dueDate: task.dueDate || '',
      estimatedHours: task.estimatedHours || '',
      tags: this.tags
    });
  }

  /**
   * Get form controls for easy access in template
   */
  get f() {
    return this.taskForm.controls;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    if (this.taskForm.invalid) {
      Object.keys(this.taskForm.controls).forEach(key => {
        this.taskForm.get(key)?.markAsTouched();
      });
      this.notificationService.error(ERROR_MESSAGES.VALIDATION_ERROR);
      return;
    }

    this.loading = true;

    if (this.isEditMode && this.taskId) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  /**
   * Create new task
   */
  private createTask(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.notificationService.error('User not authenticated');
      this.loading = false;
      return;
    }

    const taskData: CreateTaskDto = {
      ...this.taskForm.value,
      tags: this.tags
    };

    this.taskService.createTask(taskData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task) => {
          this.logger.info('Task created', 'TaskFormComponent', { taskId: task.id });
          this.notificationService.success(SUCCESS_MESSAGES.TASK_CREATED);
          this.originalFormValue = this.taskForm.value; // Reset to avoid unsaved changes warning
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.loading = false;
          this.logger.error('Failed to create task', 'TaskFormComponent', error);
          const errorMessage = error?.error?.message || ERROR_MESSAGES.SERVER_ERROR;
          this.notificationService.error(errorMessage);
        }
      });
  }

  /**
   * Update existing task
   */
  private updateTask(): void {
    if (!this.taskId) return;

    const taskData: UpdateTaskDto = {
      ...this.taskForm.value,
      tags: this.tags
    };

    this.taskService.updateTask(this.taskId, taskData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task) => {
          this.logger.info('Task updated', 'TaskFormComponent', { taskId: task.id });
          this.notificationService.success(SUCCESS_MESSAGES.TASK_UPDATED);
          this.originalFormValue = this.taskForm.value; // Reset to avoid unsaved changes warning
          this.router.navigate(['/tasks/detail', task.id]);
        },
        error: (error) => {
          this.loading = false;
          this.logger.error('Failed to update task', 'TaskFormComponent', error);
          const errorMessage = error?.error?.message || ERROR_MESSAGES.SERVER_ERROR;
          this.notificationService.error(errorMessage);
        }
      });
  }

  /**
   * Add tag
   */
  addTag(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const tag = value.trim();
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
        this.taskForm.patchValue({ tags: this.tags });
      }
    }

    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove tag
   */
  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.taskForm.patchValue({ tags: this.tags });
    }
  }

  /**
   * Cancel and go back
   */
  cancel(): void {
    if (this.hasUnsavedChanges()) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        this.goBack();
      }
    } else {
      this.goBack();
    }
  }

  /**
   * Navigate back
   */
  private goBack(): void {
    if (this.isEditMode && this.taskId) {
      this.router.navigate(['/tasks/detail', this.taskId]);
    } else {
      this.router.navigate(['/tasks']);
    }
  }

  /**
   * Format status for display
   */
  formatStatus(status: string): string {
    return status.replace('_', ' ');
  }
}
