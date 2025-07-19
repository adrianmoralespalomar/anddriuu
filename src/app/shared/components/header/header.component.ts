import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES_PATHS } from '../../constants/routes.route';

@Component({
  selector: 'gooner-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  routes = ROUTES_PATHS;
  isScrolled = false;
  isMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 10;
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
  }
}
