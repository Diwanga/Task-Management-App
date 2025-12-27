// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
//
// const routes: Routes = [];
//
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class TasksRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate.guard';
import { TaskResolver } from './resolvers/task.resolver';

/**
 * Tasks Module Routes
 */
const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: TaskFormComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'edit/:id',
    component: TaskFormComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'detail/:id',
    component: TaskDetailComponent,
    canActivate: [AuthGuard],
    resolve: {
      task: TaskResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
