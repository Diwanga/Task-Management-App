import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskFilter } from '../../../shared/models/task.model';

/**
 * Task State Service
 * Manages task state across components
 * Simple state management without external libraries
 */
@Injectable({
  providedIn: 'root'
})
export class TaskStateService {

  // Tasks state
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  // Selected task state
  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);
  public selectedTask$: Observable<Task | null> = this.selectedTaskSubject.asObservable();

  // Loading state
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  // Filter state
  private filterSubject = new BehaviorSubject<TaskFilter>({});
  public filter$: Observable<TaskFilter> = this.filterSubject.asObservable();

  constructor() { }

  /**
   * Set tasks
   */
  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  /**
   * Get current tasks value
   */
  get tasks(): Task[] {
    return this.tasksSubject.value;
  }

  /**
   * Add task to state
   */
  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([task, ...currentTasks]);
  }

  /**
   * Update task in state
   */
  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksSubject.value;
    const index = currentTasks.findIndex(t => t.id === updatedTask.id);

    if (index !== -1) {
      const newTasks = [...currentTasks];
      newTasks[index] = updatedTask;
      this.tasksSubject.next(newTasks);
    }
  }

  /**
   * Remove task from state
   */
  removeTask(taskId: string): void {
    const currentTasks = this.tasksSubject.value;
    const filteredTasks = currentTasks.filter(t => t.id !== taskId);
    this.tasksSubject.next(filteredTasks);
  }

  /**
   * Set selected task
   */
  setSelectedTask(task: Task | null): void {
    this.selectedTaskSubject.next(task);
  }

  /**
   * Get current selected task value
   */
  get selectedTask(): Task | null {
    return this.selectedTaskSubject.value;
  }

  /**
   * Set loading state
   */
  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  /**
   * Get current loading state
   */
  get isLoading(): boolean {
    return this.loadingSubject.value;
  }

  /**
   * Set filter
   */
  setFilter(filter: TaskFilter): void {
    this.filterSubject.next(filter);
  }

  /**
   * Get current filter value
   */
  get currentFilter(): TaskFilter {
    return this.filterSubject.value;
  }

  /**
   * Clear filter
   */
  clearFilter(): void {
    this.filterSubject.next({});
  }

  /**
   * Clear all state
   */
  clearState(): void {
    this.tasksSubject.next([]);
    this.selectedTaskSubject.next(null);
    this.loadingSubject.next(false);
    this.filterSubject.next({});
  }

  /**
   * Get task by ID from state
   */
  getTaskById(id: string): Task | undefined {
    return this.tasksSubject.value.find(t => t.id === id);
  }

  /**
   * Filter tasks by criteria
   */
  filterTasks(filter: TaskFilter): Task[] {
    let filteredTasks = this.tasksSubject.value;

    // Filter by status
    if (filter.status && filter.status.length > 0) {
      filteredTasks = filteredTasks.filter(t => filter.status!.includes(t.status));
    }

    // Filter by priority
    if (filter.priority && filter.priority.length > 0) {
      filteredTasks = filteredTasks.filter(t => filter.priority!.includes(t.priority));
    }

    // Filter by assignedTo
    if (filter.assignedTo) {
      filteredTasks = filteredTasks.filter(t => t.assignedTo === filter.assignedTo);
    }

    // Filter by createdBy
    if (filter.createdBy) {
      filteredTasks = filteredTasks.filter(t => t.createdBy === filter.createdBy);
    }

    // Filter by search text
    if (filter.searchText) {
      const searchLower = filter.searchText.toLowerCase();
      filteredTasks = filteredTasks.filter(t =>
        t.title.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by due date range
    if (filter.dueDateFrom) {
      const fromDate = new Date(filter.dueDateFrom);
      filteredTasks = filteredTasks.filter(t =>
        t.dueDate && new Date(t.dueDate) >= fromDate
      );
    }

    if (filter.dueDateTo) {
      const toDate = new Date(filter.dueDateTo);
      filteredTasks = filteredTasks.filter(t =>
        t.dueDate && new Date(t.dueDate) <= toDate
      );
    }

    // Filter by tags
    if (filter.tags && filter.tags.length > 0) {
      filteredTasks = filteredTasks.filter(t =>
        t.tags && t.tags.some(tag => filter.tags!.includes(tag))
      );
    }

    return filteredTasks;
  }

  /**
   * Sort tasks
   */
  sortTasks(tasks: Task[], sortBy: string, sortOrder: 'asc' | 'desc' = 'asc'): Task[] {
    const sorted = [...tasks].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'priority':
          const priorityOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'URGENT': 4 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'status':
          const statusOrder = { 'TODO': 1, 'IN_PROGRESS': 2, 'DONE': 3 };
          aValue = statusOrder[a.status];
          bValue = statusOrder[b.status];
          break;
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate).getTime() : 0;
          bValue = b.dueDate ? new Date(b.dueDate).getTime() : 0;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }
}
