import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from '../../../shared/models/task.model';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoggerService } from '../../../core/services/logger.service';

/**
 * Task Resolver
 * Pre-fetches task data before route activation
 * Useful for task detail pages
 */
@Injectable({
  providedIn: 'root'
})
export class TaskResolver implements Resolve<Task | null> {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task | null> {
    const id = route.paramMap.get('id');

    if (!id) {
      this.logger.warn('No task ID provided in route', 'TaskResolver');
      this.router.navigate(['/tasks']);
      return of(null);
    }

    this.logger.debug('Resolving task data', 'TaskResolver', { id });

    return this.taskService.getTaskById(id).pipe(
      tap(task => {
        this.logger.debug('Task resolved successfully', 'TaskResolver', { taskId: task.id });
      }),
      catchError(error => {
        this.logger.error('Failed to resolve task', 'TaskResolver', error);
        this.notificationService.error('Task not found');
        this.router.navigate(['/tasks']);
        return of(null);
      })
    );
  }
}
