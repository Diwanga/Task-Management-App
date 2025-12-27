import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/**
 * Highlight Directive
 * Highlights element on hover with specified color
 * Usage: <div appHighlight [highlightColor]="'yellow'">Text</div>
 */
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() highlightColor: string = '#ffeb3b'; // Default yellow
  @Input() defaultColor: string = 'transparent';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Set default background color
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.defaultColor);
    // Add transition for smooth effect
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s ease');
  }

  /**
   * Mouse enter event - apply highlight
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  /**
   * Mouse leave event - remove highlight
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.defaultColor);
  }

  /**
   * Apply highlight color
   */
  private highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
