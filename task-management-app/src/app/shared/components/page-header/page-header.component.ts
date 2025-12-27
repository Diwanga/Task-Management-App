
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Page Header Component
 * Reusable page header with title, subtitle, and action buttons
 * Usage:
 * <app-page-header
 *   [title]="'Tasks'"
 *   [subtitle]="'Manage your tasks'"
 *   [showBackButton]="true"
 *   (backClick)="goBack()">
 *   <button mat-raised-button color="primary">Add Task</button>
 * </app-page-header>
 */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  /**
   * Page title
   */
  @Input() title: string = '';

  /**
   * Page subtitle
   */
  @Input() subtitle: string = '';

  /**
   * Show back button
   */
  @Input() showBackButton: boolean = false;

  /**
   * Back button icon
   */
  @Input() backIcon: string = 'arrow_back';

  /**
   * Back button click event
   */
  @Output() backClick = new EventEmitter<void>();

  constructor() { }

  /**
   * Handle back button click
   */
  onBackClick(): void {
    this.backClick.emit();
  }
}
