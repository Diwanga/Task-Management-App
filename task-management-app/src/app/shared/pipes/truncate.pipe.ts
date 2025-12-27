import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncate Pipe
 * Truncates text to specified length and adds ellipsis
 */
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  /**
   * Truncate text
   * @param value Text to truncate
   * @param limit Maximum length (default: 50)
   * @param completeWords Whether to preserve complete words (default: true)
   * @param ellipsis Ellipsis string (default: '...')
   * @returns Truncated text
   */
  transform(
    value: string,
    limit: number = 50,
    completeWords: boolean = true,
    ellipsis: string = '...'
  ): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    if (completeWords) {
      // Truncate at last complete word
      let truncated = value.substr(0, limit);
      const lastSpace = truncated.lastIndexOf(' ');

      if (lastSpace > 0) {
        truncated = truncated.substr(0, lastSpace);
      }

      return truncated + ellipsis;
    } else {
      // Simple truncate at character limit
      return value.substr(0, limit) + ellipsis;
    }
  }
}
