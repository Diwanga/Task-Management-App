// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-dashboard-overview',
//   templateUrl: './dashboard-overview.component.html',
//   styleUrls: ['./dashboard-overview.component.scss']
// })
// export class DashboardOverviewComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskStats, Task } from '../../../../shared/models/task.model';
import { User } from '../../../../shared/models/user.model';
import { TaskService } from '../../../tasks/services/task.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { NotificationService } from '../../../../core/services/notification.service';

/**
 * Dashboard Overview Component
 * Main dashboard view with stats and recent tasks
 */
@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit, OnDestroy {

  currentUser: User | null = null;
  taskStats: TaskStats | null = null;
  recentTasks: Task[] = [];
  loading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private logger: LoggerService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get current user
    this.currentUser = this.authService.currentUserValue;

    // Load dashboard data
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load dashboard data
   */
  loadDashboardData(): void {
    this.loading = true;

    // Load task stats
    this.taskService.getTaskStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.taskStats = stats;
          this.logger.debug('Task stats loaded', 'DashboardOverviewComponent', stats);
        },
        error: (error) => {
          this.logger.error('Failed to load task stats', 'DashboardOverviewComponent', error);
        }
      });

    // Load recent tasks
    this.taskService.getRecentTasks(5)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.recentTasks = tasks;
          this.loading = false;
          this.logger.debug('Recent tasks loaded', 'DashboardOverviewComponent', { count: tasks.length });
        },
        error: (error) => {
          this.loading = false;
          this.logger.error('Failed to load recent tasks', 'DashboardOverviewComponent', error);
        }
      });
  }

  /**
   * Navigate to tasks page
   */
  goToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  /**
   * Navigate to create task
   */
  createTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  /**
   * Navigate to task detail
   */
  viewTask(task: Task): void {
    this.router.navigate(['/tasks/detail', task.id]);
  }

  /**
   * Refresh dashboard
   */
  refresh(): void {
    this.loadDashboardData();
    this.notificationService.success('Dashboard refreshed');
  }
}
