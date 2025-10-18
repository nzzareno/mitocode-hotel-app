import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  protected readonly themeService = inject(ThemeService);
  currentYear = new Date().getFullYear();

  get isDarkMode() {
    return this.themeService.isDarkMode();
  }
}
