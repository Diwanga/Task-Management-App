// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
// import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
// import { PageHeaderComponent } from './components/page-header/page-header.component';
//
//
//
// @NgModule({
//   declarations: [
//     ConfirmDialogComponent,
//     LoadingSpinnerComponent,
//     PageHeaderComponent
//   ],
//   imports: [
//     CommonModule
//   ]
// })
// export class SharedModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

// Components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

// Directives
import { HighlightDirective } from './directives/highlight.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

// Pipes
import { StatusColorPipe } from './pipes/status-color.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';

/**
 * Shared Module
 * Contains reusable components, directives, pipes, and commonly used modules
 * Import this module in feature modules to access shared functionality
 */
@NgModule({
  declarations: [
    // Components
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,

    // Directives
    HighlightDirective,
    ClickOutsideDirective,

    // Pipes
    StatusColorPipe,
    TruncatePipe,
    DateAgoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material Modules
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTabsModule,
    MatExpansionModule
  ],
  exports: [
    // Angular modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material Modules
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTabsModule,
    MatExpansionModule,

    // Components
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,

    // Directives
    HighlightDirective,
    ClickOutsideDirective,

    // Pipes
    StatusColorPipe,
    TruncatePipe,
    DateAgoPipe
  ]
})
export class SharedModule { }
