import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuComponent } from './sidebar-menu.component';

describe('SidebarMenuComponent', () => {
  let component: SidebarMenuComponent;
  let fixture: ComponentFixture<SidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    expect(component.isOpen()).toBe(false);
    component.toggleSidebar();
    expect(component.isOpen()).toBe(true);
    component.toggleSidebar();
    expect(component.isOpen()).toBe(false);
  });

  it('should toggle submenu', () => {
    const label = 'Zenless Zone Zero';
    expect(component.isSubmenuExpanded(label)).toBe(false);
    component.toggleSubmenu(label);
    expect(component.isSubmenuExpanded(label)).toBe(true);
  });
});
