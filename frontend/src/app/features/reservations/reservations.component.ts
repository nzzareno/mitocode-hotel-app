import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ReservationsService } from '../../core/services/reservations.service';
import { ThemeService } from '../../core/services/theme.service';
import { Reservation } from '../../core/models/reservation.model';
import { AddNewReservationDialogComponent } from './add-new-reservation-dialog/add-new-reservation-dialog.component';

@Component({
  selector: 'app-reservations',
  imports: [MatTableModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule, MatDialogModule, DatePipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  protected readonly reservationsService = inject(ReservationsService);
  protected readonly themeService = inject(ThemeService);
  protected readonly snackBar = inject(MatSnackBar);
  protected readonly dialog = inject(MatDialog);  
  protected readonly reservations = signal<Reservation[]>([]);
  protected isDarkMode = computed(() => this.themeService.isDarkMode());
  protected readonly displayedColumns = signal<string[]>(['customerName', 'checkInDate', 'checkOutDate', 'room']);

  constructor() {
    // Asegurar que el tema se aplique correctamente al inicializar
    effect(() => {
      const isDark = this.themeService.isDarkMode();
      // Forzar la aplicación del tema actual después de que el DOM esté listo
      this.themeService.applyTheme(isDark as boolean);
    });
  }

  ngOnInit() {
    this.reservationsService.findAll().subscribe((reservations) => {
      this.reservations.set(reservations);
    });
  }

  openAddNewReservationDialog() {
    this.dialog.open(AddNewReservationDialogComponent, {
      width: '500px',
      panelClass: 'add-new-reservation-dialog'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.reservationsService.create(result).subscribe({
          next: (createdReservation) => {
            this.reservations.set([...this.reservations(), createdReservation]);
            this.snackBar.open('Reservation created successfully', 'Close', {
              duration: 2000,
              panelClass: 'success-snackbar',
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          },
          error: (error) => {
            console.error('Error creating reservation:', error);
            this.snackBar.open('Error creating reservation', 'Close', {
              duration: 2000,
              panelClass: 'error-snackbar',
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        });
      }
    });
  }
}
