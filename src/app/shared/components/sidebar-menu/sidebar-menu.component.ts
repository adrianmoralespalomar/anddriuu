import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FloatingWindowService } from '../../../services/floating-window.service';

interface MenuItem {
  label: string;
  icon: string;
  submenu?: {
    label: string;
    route?: string;
    url?: string;
    windowTitle?: string;
  }[];
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  isOpen = signal(false);
  expandedMenus = signal<{ [key: string]: boolean }>({});

  menuItems: MenuItem[] = [
    {
      label: 'Zenless Zone Zero',
      icon: 'assets/images/logo_zzz.webp',
      submenu: [
        {
          label: 'Contador de Pulls',
          url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSx8OSyx-BZktnpT-fh_pQHjjkD8q3sp3Csy2aOI-8CV_QroqxzhhNjiCZNV4IdzhyK3xbipZn9WD/pubhtml',
          windowTitle: 'ZZZ - Tiradas por versión',
        },
        { label: 'Ratio tiradas', url: 'https://zzz.rng.moe/en/profile?uid=1502704289#leaderboard', windowTitle: 'ZZZ - Ratio tiradas' },
        { label: 'Personajes', route: '/zzz/characters' },
      ],
    },
    {
      label: 'Honkai Star Rail',
      icon: 'assets/images/logo_hsr.webp',
      submenu: [
        { label: 'Ratio tiradas', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRIWjzFwAZZoBvKw2oiNaVpppI9atoV0wxuOjulKRJECrg_BN404d7LoKlHp8RMX8hegDr4b8jlHjYy/pubhtml', windowTitle: 'HSR - Ratio tiradas' },
        { label: 'Contador de Pulls', route: '/hsr/pulls' },
      ],
    },
    {
      label: 'Genshin Impact',
      icon: 'assets/images/logo_genshin.webp',
      submenu: [{ label: 'Ratio tiradas', route: '/genshin/ratio' }],
    },
    {
      label: 'Global',
      icon: '🌍',
      submenu: [{ label: 'Google Trends', url: 'https://trends.google.com/trends/explore?q=%2Fg%2F11hznck6gj,%2Fg%2F11rd9xm264,%2Fg%2F11kh_kz88w,%2Fg%2F11szcscg6q,%2Fg%2F11rv72rxkb&hl=en-GB&legacy', windowTitle: 'Global - Google Trends' }],
    },
  ];

  constructor(private floatingWindowService: FloatingWindowService) {}

  toggleSidebar(): void {
    this.isOpen.set(!this.isOpen());
  }

  toggleSubmenu(label: string): void {
    this.expandedMenus.update((menus) => ({
      ...menus,
      [label]: !menus[label],
    }));
  }

  isSubmenuExpanded(label: string): boolean {
    return this.expandedMenus()[label] || false;
  }

  onSubmenuItemClick(item: { label: string; route?: string; url?: string; windowTitle?: string }): void {
    if (item.url) {
      // Abrir ventana flotante
      this.floatingWindowService.openWindow(item.windowTitle || item.label, item.url);
      this.isOpen.set(false); // Cerrar sidebar después de abrir la ventana
    } else if (item.route) {
      // Navegar a la ruta (implementar con Router si es necesario)
      console.log('Navegar a:', item.route);
    }
  }
}
