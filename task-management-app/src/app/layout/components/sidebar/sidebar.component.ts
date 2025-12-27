// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss']
// })
// export class SidebarComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Navigation menu item interface
 */
interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

/**
 * Sidebar Component
 * Side navigation menu
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  activeRoute: string = '';

  /**
   * Navigation menu items
   */
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Tasks',
      icon: 'task',
      route: '/tasks',
      badge: 5
    },
    {
      label: 'Calendar',
      icon: 'calendar_today',
      route: '/calendar'
    },
    {
      label: 'Reports',
      icon: 'assessment',
      route: '/reports'
    },
    {
      label: 'Team',
      icon: 'people',
      route: '/team'
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Set initial active route
    this.activeRoute = this.router.url;

    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.url;
      });
  }

  /**
   * Check if menu item is active
   */
  isActive(route: string): boolean {
    return this.activeRoute.startsWith(route);
  }

  /**
   * Navigate to route
   */
  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
