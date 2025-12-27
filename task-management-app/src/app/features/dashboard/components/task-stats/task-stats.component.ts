// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-task-stats',
//   templateUrl: './task-stats.component.html',
//   styleUrls: ['./task-stats.component.scss']
// })
// export class TaskStatsComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStats } from '../../../../shared/models/task.model';

/**
 * Task Stats Component
 * Displays task statistics in cards
 */
@Component({
  selector: 'app-task-stats',
  templateUrl: './task-stats.component.html',
  styleUrls: ['./task-stats.component.scss']
})
export class TaskStatsComponent {

  @Input() stats: TaskStats | null = null;
  @Input() loading = false;

  constructor(private router: Router) { }

  /**
   * Navigate to tasks with filter
   */
  navigateToTasks(filter?: any): void {
    this.router.navigate(['/tasks'], { queryParams: filter });
  }
}
