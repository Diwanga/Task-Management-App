import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    LoadingSpinnerComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
