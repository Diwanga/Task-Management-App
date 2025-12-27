import { Pipe, PipeTransform } from '@angular/core';
import { getTimeAgo } from '../../utils/helpers/date.helper';

/**
 * Date Ago Pipe
 * Converts date to relative time string (e.g., "2 hours ago")
 */
@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  /**
   * Transform date to relative time
   * @param value Date value
   * @returns Relative time string
   */
  transform(value: Date | string | null): string {
    if (!value) {
      return '';
    }

    return getTimeAgo(value);
  }
}
