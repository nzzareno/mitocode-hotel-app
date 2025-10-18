import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RoomsService } from '../../../core/services/rooms.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-room-dialog',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDialogModule, MatButtonModule, MatIconModule ],
  templateUrl: './add-new-room-dialog.component.html',
  styleUrl: './add-new-room-dialog.component.css'
})
export class AddNewRoomDialogComponent {
  protected readonly roomsService = inject(RoomsService);
  protected readonly snackBar = inject(MatSnackBar);
  protected readonly dialog = inject(MatDialogRef<AddNewRoomDialogComponent>);
  protected readonly data = inject(MAT_DIALOG_DATA);

  protected readonly roomsForm = new FormBuilder().group({
    roomNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(1), Validators.maxLength(3)]],
    type: ['', [Validators.required]],
    pricePerNight: [0, [Validators.required, Validators.min(1), Validators.max(100000)]],
    isAvailable: [true, [Validators.required]]
  }); 

  cancel() {
    this.dialog.close();
  }

  saveRoom() {
    if (this.roomsForm.valid) {
      // Asegurar que los tipos de datos sean correctos
      const formValue = {
        roomNumber: String(this.roomsForm.value.roomNumber),
        type: String(this.roomsForm.value.type),
        pricePerNight: Number(this.roomsForm.value.pricePerNight),
        isAvailable: Boolean(this.roomsForm.value.isAvailable)
      };

      console.log('Form value to send:', formValue);

      // Solo cerrar el diálogo con los datos del formulario
      // El componente padre se encargará de crear la habitación
      this.dialog.close(formValue);
    } else {
      this.snackBar.open('Please fill in all the fields', 'Close', {
        duration: 2000,
        panelClass: 'error-snackbar',
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}
