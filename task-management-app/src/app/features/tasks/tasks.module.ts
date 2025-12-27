// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
// import { TasksRoutingModule } from './tasks-routing.module';
// import { TaskListComponent } from './components/task-list/task-list.component';
// import { TaskDetailComponent } from './components/task-detail/task-detail.component';
// import { TaskFormComponent } from './components/task-form/task-form.component';
// import { TaskFilterComponent } from './components/task-filter/task-filter.component';
//
//
// @NgModule({
//   declarations: [
//     TaskListComponent,
//     TaskDetailComponent,
//     TaskFormComponent,
//     TaskFilterComponent
//   ],
//   imports: [
//     CommonModule,
//     TasksRoutingModule
//   ]
// })
// export class TasksModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TextFieldModule } from '@angular/cdk/text-field';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

// Routing
import { TasksRoutingModule } from './tasks-routing.module';

// Components
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';

// Services
import { TaskService } from './services/task.service';
import { TaskStateService } from './services/task-state.service';

// Resolvers
import { TaskResolver } from './resolvers/task.resolver';

/**
 * Tasks Module
 * Contains all task-related functionality
 */
@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailComponent,
    TaskFormComponent,
    TaskFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    SharedModule,

    // Material Modules
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    TextFieldModule
  ],
  providers: [
    TaskService,
    TaskStateService,
    TaskResolver
  ]
})
export class TasksModule { }
