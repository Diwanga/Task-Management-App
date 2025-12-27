// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-loading-spinner',
//   templateUrl: './loading-spinner.component.html',
//   styleUrls: ['./loading-spinner.component.scss']
// })
// export class LoadingSpinnerComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }
import { Component, Input } from '@angular/core';

/**
 * Loading Spinner Component
 * Displays a loading spinner with optional message
 * Usage: <app-loading-spinner [message]="'Loading data...'"></app-loading-spinner>
 */
@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  /**
   * Loading message to display below spinner
   */
  @Input() message: string = 'Loading...';

  /**
   * Spinner size: 'small' | 'medium' | 'large'
   */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Spinner color
   */
  @Input() color: string = 'primary';

  /**
   * Whether to show overlay (full screen dimmed background)
   */
  @Input() overlay: boolean = false;

  constructor() { }

  /**
   * Get spinner diameter based on size
   */
  getSpinnerDiameter(): number {
    switch (this.size) {
      case 'small':
        return 30;
      case 'medium':
        return 50;
      case 'large':
        return 80;
      default:
        return 50;
    }
  }
}
