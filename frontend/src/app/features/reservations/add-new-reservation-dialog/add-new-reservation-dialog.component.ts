import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationsService } from '../../../core/services/reservations.service';
import { RoomsService } from '../../../core/services/rooms.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Room } from '../../../core/models/room.model';

@Component({
  selector: 'app-add-new-reservation-dialog',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDialogModule, MatButtonModule, MatIconModule ],
  templateUrl: './add-new-reservation-dialog.component.html',
  styleUrl: './add-new-reservation-dialog.component.css'
})
export class AddNewReservationDialogComponent implements OnInit {
  protected readonly reservationsService = inject(ReservationsService);
  protected readonly roomsService = inject(RoomsService);
  protected readonly snackBar = inject(MatSnackBar);
  protected readonly dialog = inject(MatDialogRef<AddNewReservationDialogComponent>);
  protected readonly data = inject(MAT_DIALOG_DATA);
  protected readonly availableRooms = signal<Room[]>([]);

  protected readonly reservationsForm = new FormBuilder().group({
    customerName: ['', [Validators.required]],
    checkInDate: ['', [Validators.required]],
    checkOutDate: ['', [Validators.required]],
    room: [null, [Validators.required]]
  });

  ngOnInit() {
    // Cargar solo habitaciones disponibles
    this.roomsService.findAll().subscribe((rooms) => {
      const available = rooms.filter(room => room.isAvailable);
      this.availableRooms.set(available);
    });
  }

  saveReservation(): void {
    if (this.reservationsForm.valid) {
      this.dialog.close(this.reservationsForm.value);
    }
  }

  cancel(): void {
    this.dialog.close();
  }
}
