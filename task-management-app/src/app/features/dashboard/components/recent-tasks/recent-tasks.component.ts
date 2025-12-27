// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-recent-tasks',
//   templateUrl: './recent-tasks.component.html',
//   styleUrls: ['./recent-tasks.component.scss']
// })
// export class RecentTasksComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskStatus, TaskPriority } from '../../../../shared/models/task.model';

/**
 * Recent Tasks Component
 * Displays a list of recent tasks
 */
@Component({
  selector: 'app-recent-tasks',
  templateUrl: './recent-tasks.component.html',
  styleUrls: ['./recent-tasks.component.scss']
})
export class RecentTasksComponent {

  @Input() tasks: Task[] = [];
  @Input() loading = false;
  @Output() taskClick = new EventEmitter<Task>();

  constructor() { }

  /**
   * Handle task click
   */
  onTaskClick(task: Task): void {
    this.taskClick.emit(task);
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

  /**
   * Get status icon
   */
  getStatusIcon(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TODO:
        return 'radio_button_unchecked';
      case TaskStatus.IN_PROGRESS:
        return 'timelapse';
      case TaskStatus.DONE:
        return 'check_circle';
      default:
        return 'help_outline';
    }
  }

  /**
   * Get priority color class
   */
  getPriorityClass(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.LOW:
        return 'priority-low';
      case TaskPriority.MEDIUM:
        return 'priority-medium';
      case TaskPriority.HIGH:
        return 'priority-high';
      case TaskPriority.URGENT:
        return 'priority-urgent';
      default:
        return '';
    }
  }
}
