import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component';
import { TaskStatsComponent } from './components/task-stats/task-stats.component';
import { RecentTasksComponent } from './components/recent-tasks/recent-tasks.component';


@NgModule({
  declarations: [
    DashboardOverviewComponent,
    TaskStatsComponent,
    RecentTasksComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
