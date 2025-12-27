/**
 * Date Helper Functions
 * Utility functions for date operations
 */

/**
 * Format date to string
 * @param date Date to format
 * @param format Format string (default: 'MM/dd/yyyy')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, format: string = 'MM/dd/yyyy'): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return '';
  }

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param date Date to compare
 * @returns Relative time string
 */
export function getTimeAgo(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

/**
 * Check if date is today
 * @param date Date to check
 * @returns True if date is today
 */
export function isToday(date: Date | string): boolean {
  const d = new Date(date);
  const today = new Date();

  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

/**
 * Check if date is in the past
 * @param date Date to check
 * @returns True if date is in the past
 */
export function isPast(date: Date | string): boolean {
  const d = new Date(date);
  const now = new Date();
  return d.getTime() < now.getTime();
}

/**
 * Check if date is in the future
 * @param date Date to check
 * @returns True if date is in the future
 */
export function isFuture(date: Date | string): boolean {
  const d = new Date(date);
  const now = new Date();
  return d.getTime() > now.getTime();
}

/**
 * Add days to date
 * @param date Base date
 * @param days Number of days to add
 * @returns New date
 */
export function addDays(date: Date | string, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Subtract days from date
 * @param date Base date
 * @param days Number of days to subtract
 * @returns New date
 */
export function subtractDays(date: Date | string, days: number): Date {
  return addDays(date, -days);
}

/**
 * Get start of day
 * @param date Date
 * @returns Date at 00:00:00
 */
export function startOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of day
 * @param date Date
 * @returns Date at 23:59:59
 */
export function endOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Get difference between two dates in days
 * @param date1 First date
 * @param date2 Second date
 * @returns Difference in days
 */
export function getDaysDifference(date1: Date | string, date2: Date | string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if date is this week
 * @param date Date to check
 * @returns True if date is this week
 */
export function isThisWeek(date: Date | string): boolean {
  const d = new Date(date);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return d >= startOfWeek && d <= endOfWeek;
}

/**
 * Get month name
 * @param monthNumber Month number (0-11)
 * @returns Month name
 */
export function getMonthName(monthNumber: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthNumber];
}

/**
 * Get day name
 * @param dayNumber Day number (0-6, where 0 is Sunday)
 * @returns Day name
 */
export function getDayName(dayNumber: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber];
}

/**
 * Parse date string safely
 * @param dateString Date string
 * @returns Date or null if invalid
 */
export function parseDate(dateString: string): Date | null {
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Check if two dates are the same day
 * @param date1 First date
 * @param date2 Second date
 * @returns True if same day
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();
}
