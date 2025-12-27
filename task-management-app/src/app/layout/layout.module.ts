// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './components/header/header.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { MainLayoutComponent } from './components/main-layout/main-layout.component';
//
//
//
// @NgModule({
//   declarations: [
//     HeaderComponent,
//     SidebarComponent,
//     FooterComponent,
//     MainLayoutComponent
//   ],
//   imports: [
//     CommonModule
//   ]
// })
// export class LayoutModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

// Layout components
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

/**
 * Layout Module
 * Contains layout components (header, sidebar, footer, main layout)
 */
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class LayoutModule { }
