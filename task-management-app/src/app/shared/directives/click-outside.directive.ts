import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Click Outside Directive
 * Emits event when user clicks outside the element
 * Useful for dropdowns, modals, etc.
 * Usage: <div (clickOutside)="closeDropdown()">Content</div>
 */
@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  /**
   * Listen for document clicks
   */
  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

  /**
   * Prevent clicks on the element itself from closing
   */
  @HostListener('click', ['$event'])
  public onClickInside(event: Event): void {
    event.stopPropagation();
  }
}
