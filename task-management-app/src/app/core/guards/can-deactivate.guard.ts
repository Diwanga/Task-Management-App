import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Component with unsaved changes interface
 * Components that need deactivation guard should implement this
 */
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

/**
 * Can Deactivate Guard
 * Prevents navigation away from component with unsaved changes
 * Usage: Implement CanComponentDeactivate in your component
 */
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  /**
   * Check if component can be deactivated
   * @param component Component instance
   * @returns True if can deactivate, false otherwise
   */
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {

    // If component has canDeactivate method, call it
    if (component && component.canDeactivate) {
      return component.canDeactivate();
    }

    // Allow deactivation by default
    return true;
  }
}
