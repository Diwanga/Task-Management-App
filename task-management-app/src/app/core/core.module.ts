// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
//
//
// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class CoreModule { }


import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Services
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { LoggerService } from './services/logger.service';
import { NotificationService } from './services/notification.service';
import { LoadingService } from './services/loading.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

/**
 * Core Module
 * Contains singleton services, guards, and interceptors
 * Should only be imported once in AppModule
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // Services (already provided in 'root', but listed here for clarity)
    AuthService,
    StorageService,
    LoggerService,
    NotificationService,
    LoadingService,

    // Guards
    AuthGuard,
    CanDeactivateGuard,

    // HTTP Interceptors (order matters!)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  /**
   * Prevent reimport of CoreModule
   * Ensures services remain singletons
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it only once in AppModule.'
      );
    }
  }
}
