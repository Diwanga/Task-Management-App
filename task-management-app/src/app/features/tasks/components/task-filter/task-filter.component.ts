// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-task-filter',
//   templateUrl: './task-filter.component.html',
//   styleUrls: ['./task-filter.component.scss']
// })
// export class TaskFilterComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskStatus, TaskPriority, TaskFilter } from '../../../../shared/models/task.model';
import { TaskStateService } from '../../services/task-state.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * Task Filter Component
 * Provides filtering options for tasks
 */
@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {

  filterForm!: FormGroup;
  showFilters = false;

  // Enum arrays for dropdowns
  statuses = Object.values(TaskStatus);
  priorities = Object.values(TaskPriority);

  constructor(
    private formBuilder: FormBuilder,
    private taskStateService: TaskStateService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  /**
   * Initialize filter form
   */
  private initializeForm(): void {
    this.filterForm = this.formBuilder.group({
      searchText: [''],
      status: [[]],
      priority: [[]],
      dueDateFrom: [''],
      dueDateTo: ['']
    });
  }

  /**
   * Subscribe to form changes and update filter
   */
  private subscribeToFormChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(values => {
        this.applyFilter(values);
      });
  }

  /**
   * Apply filter
   */
  private applyFilter(values: any): void {
    const filter: TaskFilter = {
      searchText: values.searchText || undefined,
      status: values.status && values.status.length > 0 ? values.status : undefined,
      priority: values.priority && values.priority.length > 0 ? values.priority : undefined,
      dueDateFrom: values.dueDateFrom || undefined,
      dueDateTo: values.dueDateTo || undefined
    };

    this.taskStateService.setFilter(filter);
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.filterForm.reset({
      searchText: '',
      status: [],
      priority: [],
      dueDateFrom: '',
      dueDateTo: ''
    });
    this.taskStateService.clearFilter();
  }

  /**
   * Toggle filter panel
   */
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    const values = this.filterForm.value;
    return !!(
      values.searchText ||
      (values.status && values.status.length > 0) ||
      (values.priority && values.priority.length > 0) ||
      values.dueDateFrom ||
      values.dueDateTo
    );
  }
}
