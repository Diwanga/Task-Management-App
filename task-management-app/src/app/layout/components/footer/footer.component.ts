// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-footer',
//   templateUrl: './footer.component.html',
//   styleUrls: ['./footer.component.scss']
// })
// export class FooterComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }
import { Component } from '@angular/core';

/**
 * Footer Component
 * Application footer with copyright and links
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  currentYear: number = new Date().getFullYear();

  constructor() { }

  /**
   * Open external link
   */
  openLink(url: string): void {
    window.open(url, '_blank');
  }
}
