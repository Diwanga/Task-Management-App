// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'task-management-app';
// }

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoggerService } from './core/services/logger.service';
import { LoadingService } from './core/services/loading.service';
import { Observable } from 'rxjs';

/**
 * Root App Component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Task Management System';
  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private logger: LoggerService,
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    // Log navigation events
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.logger.logNavigation(event.urlAfterRedirects, event.url);
      });

    this.logger.info('Application initialized', 'AppComponent');
  }
}
