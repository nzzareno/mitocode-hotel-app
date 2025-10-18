import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected readonly themeService = inject(ThemeService);

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }

  get isDarkMode() {
    return this.themeService.isDarkMode();
  }
}
