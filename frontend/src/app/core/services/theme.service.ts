import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false);

  constructor() {
    // Cargar tema guardado del localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
      this.applyTheme(true);
    } else {
      // Aplicar tema light por defecto
      this.isDarkMode.set(false);
      this.applyTheme(false);
    }
  }
  toggleTheme() {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }
  applyTheme(isDark: boolean) {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }
}
