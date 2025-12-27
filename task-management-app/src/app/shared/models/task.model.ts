/**
 * Task Model
 * Represents a task entity in the application
 */

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string; // User ID
  createdBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags?: string[];
  estimatedHours?: number;
  completedAt?: Date;
}

/**
 * DTO for creating a new task
 */
export interface CreateTaskDto {
  title: string;
  description: string;
  status?: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  dueDate?: Date;
  tags?: string[];
  estimatedHours?: number;
}

/**
 * DTO for updating an existing task
 */
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string;
  dueDate?: Date;
  tags?: string[];
  estimatedHours?: number;
}

/**
 * Filter criteria for tasks
 */
export interface TaskFilter {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assignedTo?: string;
  createdBy?: string;
  searchText?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  tags?: string[];
}

/**
 * Task statistics for dashboard
 */
export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
  dueToday: number;
  dueThisWeek: number;
}
