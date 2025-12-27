import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  TaskFilter,
  TaskStats
} from '../../../shared/models/task.model';
import { ApiResponse, PaginatedResponse, PaginationParams } from '../../../shared/models/api-response.model';
import { TASK_ENDPOINTS } from '../../../utils/constants/api.constants';
import { LoggerService } from '../../../core/services/logger.service';

/**
 * Task Service
 * Handles all task-related HTTP operations
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  /**
   * Get all tasks with optional pagination and filters
   */
  getTasks(pagination?: PaginationParams, filter?: TaskFilter): Observable<Task[]> {
    let params = new HttpParams();

    // Add pagination params
    if (pagination) {
      if (pagination.page) params = params.set('page', pagination.page.toString());
      if (pagination.pageSize) params = params.set('pageSize', pagination.pageSize.toString());
      if (pagination.sortBy) params = params.set('sortBy', pagination.sortBy);
      if (pagination.sortOrder) params = params.set('sortOrder', pagination.sortOrder);
    }

    // Add filter params
    if (filter) {
      if (filter.status && filter.status.length > 0) {
        params = params.set('status', filter.status.join(','));
      }
      if (filter.priority && filter.priority.length > 0) {
        params = params.set('priority', filter.priority.join(','));
      }
      if (filter.assignedTo) {
        params = params.set('assignedTo', filter.assignedTo);
      }
      if (filter.searchText) {
        params = params.set('search', filter.searchText);
      }
    }

    this.logger.debug('Fetching tasks', 'TaskService', { params: params.toString() });

    return this.http.get<Task[]>(TASK_ENDPOINTS.BASE, { params }).pipe(
      tap(tasks => this.logger.debug(`Fetched ${tasks.length} tasks`, 'TaskService')),
      catchError(error => {
        this.logger.error('Failed to fetch tasks', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get task by ID
   */
  getTaskById(id: string): Observable<Task> {
    this.logger.debug('Fetching task by ID', 'TaskService', { id });

    return this.http.get<Task>(TASK_ENDPOINTS.BY_ID(id)).pipe(
      tap(task => this.logger.debug('Task fetched successfully', 'TaskService', { taskId: task.id })),
      catchError(error => {
        this.logger.error('Failed to fetch task', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Create new task
   */
  createTask(taskData: CreateTaskDto): Observable<Task> {
    this.logger.debug('Creating new task', 'TaskService', taskData);

    return this.http.post<Task>(TASK_ENDPOINTS.BASE, taskData).pipe(
      tap(task => this.logger.info('Task created successfully', 'TaskService', { taskId: task.id })),
      catchError(error => {
        this.logger.error('Failed to create task', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Update existing task
   */
  updateTask(id: string, taskData: UpdateTaskDto): Observable<Task> {
    this.logger.debug('Updating task', 'TaskService', { id, ...taskData });

    return this.http.put<Task>(TASK_ENDPOINTS.BY_ID(id), taskData).pipe(
      tap(task => this.logger.info('Task updated successfully', 'TaskService', { taskId: task.id })),
      catchError(error => {
        this.logger.error('Failed to update task', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Delete task
   */
  deleteTask(id: string): Observable<void> {
    this.logger.debug('Deleting task', 'TaskService', { id });

    return this.http.delete<void>(TASK_ENDPOINTS.BY_ID(id)).pipe(
      tap(() => this.logger.info('Task deleted successfully', 'TaskService', { taskId: id })),
      catchError(error => {
        this.logger.error('Failed to delete task', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get tasks by status
   */
  getTasksByStatus(status: string): Observable<Task[]> {
    this.logger.debug('Fetching tasks by status', 'TaskService', { status });

    return this.http.get<Task[]>(TASK_ENDPOINTS.BY_STATUS(status)).pipe(
      tap(tasks => this.logger.debug(`Fetched ${tasks.length} tasks with status ${status}`, 'TaskService')),
      catchError(error => {
        this.logger.error('Failed to fetch tasks by status', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get tasks assigned to user
   */
  getTasksByUser(userId: string): Observable<Task[]> {
    this.logger.debug('Fetching tasks by user', 'TaskService', { userId });

    return this.http.get<Task[]>(TASK_ENDPOINTS.BY_USER(userId)).pipe(
      tap(tasks => this.logger.debug(`Fetched ${tasks.length} tasks for user ${userId}`, 'TaskService')),
      catchError(error => {
        this.logger.error('Failed to fetch tasks by user', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get task statistics
   */
  getTaskStats(): Observable<TaskStats> {
    this.logger.debug('Fetching task statistics', 'TaskService');

    return this.http.get<TaskStats>(TASK_ENDPOINTS.STATS).pipe(
      tap(stats => this.logger.debug('Task stats fetched', 'TaskService', stats)),
      catchError(error => {
        this.logger.error('Failed to fetch task stats', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get recent tasks
   */
  getRecentTasks(limit: number = 5): Observable<Task[]> {
    this.logger.debug('Fetching recent tasks', 'TaskService', { limit });

    const params = new HttpParams().set('limit', limit.toString());

    return this.http.get<Task[]>(TASK_ENDPOINTS.RECENT, { params }).pipe(
      tap(tasks => this.logger.debug(`Fetched ${tasks.length} recent tasks`, 'TaskService')),
      catchError(error => {
        this.logger.error('Failed to fetch recent tasks', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get overdue tasks
   */
  getOverdueTasks(): Observable<Task[]> {
    this.logger.debug('Fetching overdue tasks', 'TaskService');

    return this.http.get<Task[]>(TASK_ENDPOINTS.OVERDUE).pipe(
      tap(tasks => this.logger.debug(`Fetched ${tasks.length} overdue tasks`, 'TaskService')),
      catchError(error => {
        this.logger.error('Failed to fetch overdue tasks', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get tasks due today
   */
  getTasksDueToday(): Observable<Task[]> {
    this.logger.debug('Fetching tasks due today', 'TaskService');

    return this.http.get<Task[]>(TASK_ENDPOINTS.DUE_TODAY).pipe(
      tap(tasks => this.logger.debug(`Fetched ${tasks.length} tasks due today`, 'TaskService')),
      catchError(error => {
        this.logger.error('Failed to fetch tasks due today', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Search tasks
   */
  searchTasks(searchText: string): Observable<Task[]> {
    this.logger.debug('Searching tasks', 'TaskService', { searchText });

    const params = new HttpParams().set('q', searchText);

    return this.http.get<Task[]>(TASK_ENDPOINTS.SEARCH, { params }).pipe(
      tap(tasks => this.logger.debug(`Found ${tasks.length} tasks matching search`, 'TaskService')),
      catchError(error => {
        this.logger.error('Failed to search tasks', 'TaskService', error);
        return throwError(() => error);
      })
    );
  }
}
