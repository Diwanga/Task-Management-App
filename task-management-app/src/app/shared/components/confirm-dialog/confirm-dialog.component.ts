// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-confirm-dialog',
//   templateUrl: './confirm-dialog.component.html',
//   styleUrls: ['./confirm-dialog.component.scss']
// })
// export class ConfirmDialogComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Confirm Dialog Data Interface
 */
export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'accent' | 'warn';
}

/**
 * Confirm Dialog Component
 * Reusable confirmation dialog
 * Usage:
 * const dialogRef = this.dialog.open(ConfirmDialogComponent, {
 *   data: { title: 'Delete Task', message: 'Are you sure?' }
 * });
 * dialogRef.afterClosed().subscribe(result => { ... });
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    // Set defaults
    this.data.confirmText = this.data.confirmText || 'Confirm';
    this.data.cancelText = this.data.cancelText || 'Cancel';
    this.data.confirmColor = this.data.confirmColor || 'primary';
  }

  /**
   * User clicked cancel
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * User clicked confirm
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
