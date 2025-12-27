import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Task, TaskStatus, TaskPriority, TaskStats } from '../../shared/models/task.model';
import { User, UserRole, UserStatus } from '../../shared/models/user.model';

/**
 * In-Memory Database Service
 * Provides mock data for development and testing
 * Simulates a REST API using angular-in-memory-web-api
 */
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  // Store users and tasks as class properties
  private users: User[] = [];
  private tasks: Task[] = [];

  createDb() {
    // Mock users
    this.users = [
      {
        id: '1',
        email: 'admin@example.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        avatar: 'https://i.pravatar.cc/150?img=1',
        phone: '+1234567890',
        department: 'Management',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        lastLoginAt: new Date()
      },
      {
        id: '2',
        email: 'john.doe@example.com',
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.MANAGER,
        status: UserStatus.ACTIVE,
        avatar: 'https://i.pravatar.cc/150?img=2',
        phone: '+1234567891',
        department: 'Development',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        lastLoginAt: new Date()
      },
      {
        id: '3',
        email: 'jane.smith@example.com',
        username: 'janesmith',
        firstName: 'Jane',
        lastName: 'Smith',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        avatar: 'https://i.pravatar.cc/150?img=3',
        phone: '+1234567892',
        department: 'Development',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
        lastLoginAt: new Date()
      },
      {
        id: '4',
        email: 'bob.johnson@example.com',
        username: 'bobjohnson',
        firstName: 'Bob',
        lastName: 'Johnson',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        avatar: 'https://i.pravatar.cc/150?img=4',
        phone: '+1234567893',
        department: 'Design',
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
        lastLoginAt: new Date()
      }
    ];

    // Mock tasks
    this.tasks = [
      {
        id: '1',
        title: 'Setup project repository',
        description: 'Initialize Git repository and setup project structure',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        assignedTo: '2',
        createdBy: '1',
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-03'),
        dueDate: new Date('2024-12-05'),
        tags: ['setup', 'infrastructure'],
        estimatedHours: 4,
        completedAt: new Date('2024-12-03')
      },
      {
        id: '2',
        title: 'Design database schema',
        description: 'Create ERD and design database tables for the application',
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        assignedTo: '2',
        createdBy: '1',
        createdAt: new Date('2024-12-02'),
        updatedAt: new Date('2024-12-05'),
        dueDate: new Date('2024-12-07'),
        tags: ['database', 'design'],
        estimatedHours: 8,
        completedAt: new Date('2024-12-05')
      },
      {
        id: '3',
        title: 'Implement user authentication',
        description: 'Develop login, logout, and registration functionality',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.URGENT,
        assignedTo: '3',
        createdBy: '1',
        createdAt: new Date('2024-12-05'),
        updatedAt: new Date('2024-12-20'),
        dueDate: new Date('2024-12-28'),
        tags: ['authentication', 'security', 'backend'],
        estimatedHours: 16
      },
      {
        id: '4',
        title: 'Create dashboard UI',
        description: 'Design and implement the main dashboard interface',
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        assignedTo: '4',
        createdBy: '2',
        createdAt: new Date('2024-12-10'),
        updatedAt: new Date('2024-12-22'),
        dueDate: new Date('2024-12-30'),
        tags: ['ui', 'design', 'frontend'],
        estimatedHours: 12
      },
      {
        id: '5',
        title: 'Write API documentation',
        description: 'Document all API endpoints with examples and request/response formats',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        assignedTo: '2',
        createdBy: '1',
        createdAt: new Date('2024-12-15'),
        updatedAt: new Date('2024-12-15'),
        dueDate: new Date('2025-01-05'),
        tags: ['documentation', 'api'],
        estimatedHours: 6
      },
      {
        id: '6',
        title: 'Implement task filtering',
        description: 'Add filters for status, priority, assignee, and date range',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        assignedTo: '3',
        createdBy: '2',
        createdAt: new Date('2024-12-18'),
        updatedAt: new Date('2024-12-18'),
        dueDate: new Date('2025-01-10'),
        tags: ['feature', 'frontend'],
        estimatedHours: 8
      },
      {
        id: '7',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment pipeline',
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        assignedTo: '2',
        createdBy: '1',
        createdAt: new Date('2024-12-20'),
        updatedAt: new Date('2024-12-20'),
        dueDate: new Date('2025-01-15'),
        tags: ['devops', 'automation'],
        estimatedHours: 10
      },
      {
        id: '8',
        title: 'Write unit tests',
        description: 'Achieve 80% code coverage with unit tests',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        assignedTo: '3',
        createdBy: '1',
        createdAt: new Date('2024-12-22'),
        updatedAt: new Date('2024-12-22'),
        dueDate: new Date('2025-01-20'),
        tags: ['testing', 'quality'],
        estimatedHours: 20
      },
      {
        id: '9',
        title: 'Optimize database queries',
        description: 'Review and optimize slow database queries',
        status: TaskStatus.TODO,
        priority: TaskPriority.LOW,
        assignedTo: '2',
        createdBy: '1',
        createdAt: new Date('2024-12-23'),
        updatedAt: new Date('2024-12-23'),
        dueDate: new Date('2025-02-01'),
        tags: ['performance', 'database'],
        estimatedHours: 6
      },
      {
        id: '10',
        title: 'Security audit',
        description: 'Conduct security audit and fix vulnerabilities',
        status: TaskStatus.TODO,
        priority: TaskPriority.URGENT,
        createdBy: '1',
        createdAt: new Date('2024-12-24'),
        updatedAt: new Date('2024-12-24'),
        dueDate: new Date('2024-12-27'),
        tags: ['security', 'audit'],
        estimatedHours: 12
      }
    ];

    return { users: this.users, tasks: this.tasks };
  }

  /**
   * Override GET method to handle custom endpoints
   */
  get(reqInfo: RequestInfo): Observable<any> {
    const url = reqInfo.url;

    // Handle task stats
    if (url.endsWith('/tasks/stats')) {
      return this.handleGetTaskStats(reqInfo);
    }

    // Handle recent tasks
    if (url.endsWith('/tasks/recent') || url.includes('/tasks/recent?')) {
      return this.handleGetRecentTasks(reqInfo);
    }

    // Handle overdue tasks
    if (url.endsWith('/tasks/overdue')) {
      return this.handleGetOverdueTasks(reqInfo);
    }

    // Handle tasks due today
    if (url.endsWith('/tasks/due-today')) {
      return this.handleGetTasksDueToday(reqInfo);
    }

    // Handle task search
    if (url.includes('/tasks/search?')) {
      return this.handleSearchTasks(reqInfo);
    }

    // Handle get single task by ID (must come before general tasks handler)
    if (url.match(/\/tasks\/\d+$/)) {
      return this.handleGetTaskById(reqInfo);
    }

    // Handle tasks with filters/pagination
    if ((url.endsWith('/tasks') || url.includes('/tasks?')) && !url.includes('/tasks/')) {
      return this.handleGetTasks(reqInfo);
    }

    // Default behavior for standard collection queries
    return undefined as any;
  }

  /**
   * Override POST method to handle custom endpoints
   */
  post(reqInfo: RequestInfo): Observable<any> {
    const url = reqInfo.url;

    // Handle login
    if (url.endsWith('/auth/login')) {
      return this.handleLogin(reqInfo);
    }

    // Handle register
    if (url.endsWith('/auth/register')) {
      return this.handleRegister(reqInfo);
    }

    // Handle task creation
    if (url.endsWith('/tasks')) {
      return this.handleCreateTask(reqInfo);
    }

    // Default behavior for other posts
    return undefined as any;
  }

  /**
   * Override PUT method to handle task updates
   */
  put(reqInfo: RequestInfo): Observable<any> {
    const url = reqInfo.url;

    // Handle task update
    if (url.includes('/tasks/') && !url.includes('status') && !url.includes('user')) {
      return this.handleUpdateTask(reqInfo);
    }

    // Default behavior for other puts
    return undefined as any;
  }

  /**
   * Override DELETE method to handle task deletion
   */
  delete(reqInfo: RequestInfo): Observable<any> {
    const url = reqInfo.url;

    // Handle task delete
    if (url.includes('/tasks/')) {
      return this.handleDeleteTask(reqInfo);
    }

    // Default behavior for other deletes
    return undefined as any;
  }

  /**
   * Handle login request
   */
  private handleLogin(reqInfo: RequestInfo): Observable<any> {
    const { email, password } = reqInfo.utils.getJsonBody(reqInfo.req);

    // Find user by email
    const user = this.users.find(u => u.email === email);

    // Simple password check - accept any password for demo
    if (user) {
      const authResponse = {
        success: true,
        data: {
          user: user,
          token: 'mock-jwt-token-' + user.id,
          refreshToken: 'mock-refresh-token-' + user.id,
          expiresIn: 3600
        },
        message: 'Login successful',
        timestamp: new Date()
      };

      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.OK,
        body: authResponse
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.UNAUTHORIZED,
        body: {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password'
          },
          timestamp: new Date()
        }
      }));
    }
  }

  /**
   * Handle register request
   */
  private handleRegister(reqInfo: RequestInfo): Observable<any> {
    const userData = reqInfo.utils.getJsonBody(reqInfo.req);

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      phone: userData.phone || '',
      department: userData.department || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(newUser);

    const authResponse = {
      success: true,
      data: {
        user: newUser,
        token: 'mock-jwt-token-' + newUser.id,
        refreshToken: 'mock-refresh-token-' + newUser.id,
        expiresIn: 3600
      },
      message: 'Registration successful',
      timestamp: new Date()
    };

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.CREATED,
      body: authResponse
    }));
  }

  /**
   * Handle get task stats
   */
  private handleGetTaskStats(reqInfo: RequestInfo): Observable<any> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const stats: TaskStats = {
      total: this.tasks.length,
      todo: this.tasks.filter(t => t.status === TaskStatus.TODO).length,
      inProgress: this.tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      done: this.tasks.filter(t => t.status === TaskStatus.DONE).length,
      overdue: this.tasks.filter(t =>
        t.dueDate && new Date(t.dueDate) < now && t.status !== TaskStatus.DONE
      ).length,
      dueToday: this.tasks.filter(t => {
        if (!t.dueDate) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate >= today && dueDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
      }).length,
      dueThisWeek: this.tasks.filter(t => {
        if (!t.dueDate) return false;
        const dueDate = new Date(t.dueDate);
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        return dueDate >= now && dueDate <= weekFromNow;
      }).length
    };

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: stats
    }));
  }

  /**
   * Handle get recent tasks
   */
  private handleGetRecentTasks(reqInfo: RequestInfo): Observable<any> {
    const params = reqInfo.query;
    const limit = params.get('limit') ? parseInt(params.get('limit')![0], 10) : 5;

    // Sort by updatedAt descending and take limit
    const recentTasks = [...this.tasks]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: recentTasks
    }));
  }

  /**
   * Handle get overdue tasks
   */
  private handleGetOverdueTasks(reqInfo: RequestInfo): Observable<any> {
    const now = new Date();
    const overdueTasks = this.tasks.filter(t =>
      t.dueDate && new Date(t.dueDate) < now && t.status !== TaskStatus.DONE
    );

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: overdueTasks
    }));
  }

  /**
   * Handle get tasks due today
   */
  private handleGetTasksDueToday(reqInfo: RequestInfo): Observable<any> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const tasksDueToday = this.tasks.filter(t => {
      if (!t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      return dueDate >= today && dueDate < tomorrow;
    });

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: tasksDueToday
    }));
  }

  /**
   * Handle search tasks
   */
  private handleSearchTasks(reqInfo: RequestInfo): Observable<any> {
    const params = reqInfo.query;
    const searchQuery = params.get('q') ? params.get('q')![0].toLowerCase() : '';

    const searchResults = this.tasks.filter(t =>
      t.title.toLowerCase().includes(searchQuery) ||
      t.description.toLowerCase().includes(searchQuery) ||
      (t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
    );

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: searchResults
    }));
  }

  /**
   * Handle create task
   */
  private handleCreateTask(reqInfo: RequestInfo): Observable<any> {
    const taskData = reqInfo.utils.getJsonBody(reqInfo.req);

    // Generate new ID
    const newId = (Math.max(...this.tasks.map(t => parseInt(t.id))) + 1).toString();

    // Create new task
    const newTask: Task = {
      id: newId,
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || TaskStatus.TODO,
      priority: taskData.priority || TaskPriority.MEDIUM,
      assignedTo: taskData.assignedTo,
      createdBy: taskData.createdBy || '1', // Default to admin
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
      tags: taskData.tags || [],
      estimatedHours: taskData.estimatedHours
    };

    // Add to tasks array
    this.tasks.push(newTask);

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.CREATED,
      body: newTask
    }));
  }

  /**
   * Handle update task
   */
  private handleUpdateTask(reqInfo: RequestInfo): Observable<any> {
    const taskData = reqInfo.utils.getJsonBody(reqInfo.req);

    // Extract ID from URL
    const urlParts = reqInfo.url.split('/');
    const taskId = urlParts[urlParts.length - 1];

    // Find task index
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.NOT_FOUND,
        body: {
          success: false,
          error: {
            code: 'TASK_NOT_FOUND',
            message: 'Task not found'
          }
        }
      }));
    }

    // Update task
    const updatedTask: Task = {
      ...this.tasks[taskIndex],
      ...taskData,
      id: taskId, // Preserve ID
      updatedAt: new Date(),
      completedAt: taskData.status === TaskStatus.DONE ? new Date() : this.tasks[taskIndex].completedAt
    };

    // Replace in array
    this.tasks[taskIndex] = updatedTask;

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: updatedTask
    }));
  }

  /**
   * Handle delete task
   */
  private handleDeleteTask(reqInfo: RequestInfo): Observable<any> {
    // Extract ID from URL
    const urlParts = reqInfo.url.split('/');
    const taskId = urlParts[urlParts.length - 1];

    // Find task index
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.NOT_FOUND,
        body: {
          success: false,
          error: {
            code: 'TASK_NOT_FOUND',
            message: 'Task not found'
          }
        }
      }));
    }

    // Remove from array
    this.tasks.splice(taskIndex, 1);

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.NO_CONTENT,
      body: {}
    }));
  }

  /**
   * Handle get tasks with filters and pagination
   */
  private handleGetTasks(reqInfo: RequestInfo): Observable<any> {
    const params = reqInfo.query;

    // Start with all tasks
    let filteredTasks = [...this.tasks];

    // Apply status filter
    const statusParam = params.get('status');
    if (statusParam && statusParam.length > 0) {
      const statuses = statusParam[0].split(',');
      filteredTasks = filteredTasks.filter(t => statuses.includes(t.status));
    }

    // Apply priority filter
    const priorityParam = params.get('priority');
    if (priorityParam && priorityParam.length > 0) {
      const priorities = priorityParam[0].split(',');
      filteredTasks = filteredTasks.filter(t => priorities.includes(t.priority));
    }

    // Apply assignedTo filter
    const assignedToParam = params.get('assignedTo');
    if (assignedToParam && assignedToParam.length > 0) {
      filteredTasks = filteredTasks.filter(t => t.assignedTo === assignedToParam[0]);
    }

    // Apply search filter
    const searchParam = params.get('search');
    if (searchParam && searchParam.length > 0) {
      const searchText = searchParam[0].toLowerCase();
      filteredTasks = filteredTasks.filter(t =>
        t.title.toLowerCase().includes(searchText) ||
        t.description.toLowerCase().includes(searchText)
      );
    }

    // Apply sorting
    const sortBy = params.get('sortBy')?.[0] || 'createdAt';
    const sortOrder = params.get('sortOrder')?.[0] || 'desc';

    filteredTasks.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'priority':
          const priorityOrder: any = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'URGENT': 4 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'status':
          const statusOrder: any = { 'TODO': 1, 'IN_PROGRESS': 2, 'DONE': 3 };
          aValue = statusOrder[a.status];
          bValue = statusOrder[b.status];
          break;
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate).getTime() : 0;
          bValue = b.dueDate ? new Date(b.dueDate).getTime() : 0;
          break;
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    // Apply pagination
    const page = params.get('page') ? parseInt(params.get('page')![0], 10) : 1;
    const pageSize = params.get('pageSize') ? parseInt(params.get('pageSize')![0], 10) : filteredTasks.length;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: paginatedTasks
    }));
  }

  /**
   * Handle get task by ID
   */
  private handleGetTaskById(reqInfo: RequestInfo): Observable<any> {
    // Extract ID from URL
    const urlParts = reqInfo.url.split('/');
    const taskId = urlParts[urlParts.length - 1];

    // Find task
    const task = this.tasks.find(t => t.id === taskId);

    if (!task) {
      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.NOT_FOUND,
        body: {
          success: false,
          error: {
            code: 'TASK_NOT_FOUND',
            message: `Task with id ${taskId} not found`
          }
        }
      }));
    }

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      body: task
    }));
  }

}
