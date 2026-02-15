import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  submenu?: { label: string; route?: string }[];
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
      icon: '⚔️',
      submenu: [
        { label: 'Ratio tiradas', route: '/zzz/ratio' },
        { label: 'Contador de Pulls', route: '/zzz/pulls' },
        { label: 'Personajes', route: '/zzz/characters' },
      ],
    },
    {
      label: 'Honkai Star Rail',
      icon: '✨',
      submenu: [
        { label: 'Ratio tiradas', route: '/hsr/ratio' },
        { label: 'Contador de Pulls', route: '/hsr/pulls' },
      ],
    },
    {
      label: 'Genshin Impact',
      icon: '🌙',
      submenu: [{ label: 'Ratio tiradas', route: '/genshin/ratio' }],
    },
  ];

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
}
