// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
// import { DashboardRoutingModule } from './dashboard-routing.module';
// import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component';
// import { TaskStatsComponent } from './components/task-stats/task-stats.component';
// import { RecentTasksComponent } from './components/recent-tasks/recent-tasks.component';
//
//
// @NgModule({
//   declarations: [
//     DashboardOverviewComponent,
//     TaskStatsComponent,
//     RecentTasksComponent
//   ],
//   imports: [
//     CommonModule,
//     DashboardRoutingModule
//   ]
// })
// export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

// Routing
import { DashboardRoutingModule } from './dashboard-routing.module';

// Components
import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component';
import { TaskStatsComponent } from './components/task-stats/task-stats.component';
import { RecentTasksComponent } from './components/recent-tasks/recent-tasks.component';

/**
 * Dashboard Module
 * Contains dashboard overview and statistics
 */
@NgModule({
  declarations: [
    DashboardOverviewComponent,
    TaskStatsComponent,
    RecentTasksComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,

    // Material Modules
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule
  ]
})
export class DashboardModule { }
