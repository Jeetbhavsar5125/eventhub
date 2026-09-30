import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from '../core/footer/footer.component';
import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { TopbarComponent } from '../core/topbar/topbar.component';
import { SidebarNavItem } from '../core/sidebar/sidebar-nav-item.model';

export type LayoutType = 'public' | 'user' | 'dashboard';

@Component({
  selector: 'app-dynamic-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
  ],
  templateUrl: './dynamic-layout.component.html',
  styleUrl: './dynamic-layout.component.css',
})
export class DynamicLayoutComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  // Layout Config
  readonly layoutType = signal<LayoutType>('public');
  readonly sidebarTitle = signal<string>('');
  readonly topbarContext = signal<string>('');
  readonly sidebarNavItems = signal<SidebarNavItem[]>([]);

  // State
  readonly isSidebarOpen = signal(false);

  ngOnInit(): void {
    // Read route data to configure the layout
    const data = this.route.snapshot.data;
    
    if (data['layoutType']) {
      this.layoutType.set(data['layoutType'] as LayoutType);
    }
    
    if (data['sidebarTitle']) {
      this.sidebarTitle.set(data['sidebarTitle']);
    }
    
    if (data['topbarContext']) {
      this.topbarContext.set(data['topbarContext']);
    }

    if (data['navItems']) {
      this.sidebarNavItems.set(data['navItems']);
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update((v) => !v);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}
