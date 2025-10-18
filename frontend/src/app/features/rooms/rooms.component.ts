import { Component, inject, OnInit, signal, effect, computed } from '@angular/core';
import { RoomsService } from '../../core/services/rooms.service';
import { Room } from '../../core/models/room.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../core/services/theme.service';
import { CurrencyPipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddNewRoomDialogComponent } from './add-new-room-dialog/add-new-room-dialog.component';

@Component({
  selector: 'app-rooms',
  imports: [MatTableModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule, MatDialogModule, CurrencyPipe],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {
  protected readonly roomsService = inject(RoomsService);
  protected readonly themeService = inject(ThemeService);
  protected readonly snackBar = inject(MatSnackBar);
  protected readonly dialog = inject(MatDialog);  
  protected readonly rooms = signal<Room[]>([]);
  protected readonly displayedColumns = signal<string[]>(['roomNumber', 'type', 'pricePerNight', 'isAvailable']);
  protected readonly editingStates = signal<boolean[]>([]);
  protected readonly originalValues = signal<boolean[]>([]);
  protected readonly availabilityControls = signal<FormControl[]>([]);
  protected isDarkMode = computed(() => this.themeService.isDarkMode());
  
  constructor() {
    // Asegurar que el tema se aplique correctamente al inicializar
    effect(() => {
      const isDark = this.themeService.isDarkMode();
      // Forzar la aplicación del tema actual después de que el DOM esté listo
      this.themeService.applyTheme(isDark as boolean);
    });
  }

  ngOnInit() {
    this.roomsService.findAll().subscribe((rooms) => {
      const sortedRooms = rooms.sort((a, b) => {
        const numA = parseInt(a.roomNumber, 10);
        const numB = parseInt(b.roomNumber, 10);
        return numA - numB;
      });
      this.rooms.set(sortedRooms);
      // Inicializar estados de edición y FormControls
      this.editingStates.set(new Array(sortedRooms.length).fill(false));
      this.originalValues.set(sortedRooms.map(room => room.isAvailable));
      // Convertir booleanos a strings para el select HTML
      this.availabilityControls.set(sortedRooms.map(room => new FormControl(String(room.isAvailable))));
    });
  }

  openAddNewRoomDialog() {
    this.dialog.open(AddNewRoomDialogComponent, {
      width: '500px',
      panelClass: 'add-new-room-dialog'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.roomsService.create(result).subscribe({
          next: (createdRoom) => {
            // Agregar la nueva habitación y reordenar
            const updatedRooms = [...this.rooms(), createdRoom].sort((a, b) => {
              const numA = parseInt(a.roomNumber, 10);
              const numB = parseInt(b.roomNumber, 10);
              return numA - numB;
            });
            this.rooms.set(updatedRooms);

            // Reinicializar los controles
            this.editingStates.set(new Array(updatedRooms.length).fill(false));
            this.originalValues.set(updatedRooms.map(room => room.isAvailable));
            // Convertir booleanos a strings para el select HTML
            this.availabilityControls.set(updatedRooms.map(room => new FormControl(String(room.isAvailable))));

            this.snackBar.open('Room added successfully', 'Close', {
              duration: 2000,
              panelClass: 'success-snackbar',
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          },
          error: (error) => {
            console.error('Error creating room:', error);
            this.snackBar.open('Error adding room', 'Close', {
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

  onAvailabilityChange(index: number) {
    const room = this.rooms()[index];
    const newValueString = this.availabilityControls()[index]?.value;
    const newValue = newValueString === 'true';

    // Si está intentando marcar como disponible una habitación ocupada
    if (!room.isAvailable && newValue) {
      const confirmed = confirm(
        `Room ${room.roomNumber} may have active reservations.\n\n` +
        'Are you sure you want to mark it as available?\n\n'
      );

      if (!confirmed) {
        // Revertir el cambio
        this.availabilityControls()[index].setValue(String(room.isAvailable), { emitEvent: false });
        return;
      }
    }

    // Activar modo de edición cuando se cambia el valor
    this.editingStates.update(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  }

  saveAvailability(index: number) {
    const room = this.rooms()[index];
    const newValueString = this.availabilityControls()[index]?.value;

    // Convertir string a booleano
    const newValue = newValueString === 'true';

    // Actualizar el valor en el room
    room.isAvailable = newValue;

    // Aquí puedes agregar la llamada al servicio para guardar
    this.roomsService.update(room.id, room).subscribe((updatedRoom) => {
      this.rooms.update(prev => prev.map((r, i) => i === index ? updatedRoom : r));
      this.editingStates.update(prev => {
        const newStates = [...prev];
        newStates[index] = false;
        return newStates;
      });
      this.originalValues.update(prev => {
        const newValues = [...prev];
        newValues[index] = newValue;
        return newValues;
      });
      this.snackBar.open('Room availability updated successfully', 'Close', {
        duration: 2000,
        panelClass: 'success-snackbar',
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    });
  }

}
