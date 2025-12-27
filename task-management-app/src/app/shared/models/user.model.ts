/**
 * User Model
 * Represents a user entity in the application
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  department?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

/**
 * Get full name of user
 */
export function getUserFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(user: User): string {
  const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || '';
  const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || '';
  return `${firstInitial}${lastInitial}`;
}

/**
 * Check if user has specific role
 */
export function hasRole(user: User, role: UserRole): boolean {
  return user.role === role;
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User): boolean {
  return user.role === UserRole.ADMIN;
}

/**
 * Check if user is active
 */
export function isActiveUser(user: User): boolean {
  return user.status === UserStatus.ACTIVE;
}

/**
 * DTO for user login
 */
export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * DTO for user registration
 */
export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  department?: string;
}

/**
 * DTO for updating user profile
 */
export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  department?: string;
  avatar?: string;
}

/**
 * Authentication response from server
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number; // seconds
}
