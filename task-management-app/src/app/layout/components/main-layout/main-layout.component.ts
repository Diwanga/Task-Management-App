// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-main-layout',
//   templateUrl: './main-layout.component.html',
//   styleUrls: ['./main-layout.component.scss']
// })
// export class MainLayoutComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

/**
 * Main Layout Component
 * Contains header, sidebar, content area, and footer
 * Responsive layout with collapsible sidebar
 */
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild('drawer') drawer!: MatSidenav;

  /**
   * Check if screen is mobile/tablet
   */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.Tablet
  ]).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  /**
   * Toggle sidebar
   */
  toggleSidebar(): void {
    this.drawer.toggle();
  }
}
