import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus, TaskPriority } from '../models/task.model';

/**
 * Status Color Pipe
 * Returns color class based on task status or priority
 */
@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {

  /**
   * Transform status/priority to color class
   * @param value Task status or priority
   * @param type 'status' or 'priority'
   * @returns CSS class name for color
   */
  transform(value: TaskStatus | TaskPriority, type: 'status' | 'priority' = 'status'): string {
    if (type === 'status') {
      return this.getStatusColor(value as TaskStatus);
    } else {
      return this.getPriorityColor(value as TaskPriority);
    }
  }

  /**
   * Get color class for task status
   */
  private getStatusColor(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TODO:
        return 'status-todo'; // Blue
      case TaskStatus.IN_PROGRESS:
        return 'status-in-progress'; // Orange
      case TaskStatus.DONE:
        return 'status-done'; // Green
      default:
        return 'status-default'; // Gray
    }
  }

  /**
   * Get color class for task priority
   */
  private getPriorityColor(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.LOW:
        return 'priority-low'; // Green
      case TaskPriority.MEDIUM:
        return 'priority-medium'; // Yellow
      case TaskPriority.HIGH:
        return 'priority-high'; // Orange
      case TaskPriority.URGENT:
        return 'priority-urgent'; // Red
      default:
        return 'priority-default'; // Gray
    }
  }
}
