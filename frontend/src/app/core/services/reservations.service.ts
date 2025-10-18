import { inject, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
    protected http = inject(HttpClient);
    protected apiUrl = `${environment.HOST}/reservations`;

    findAll() {
      return this.http.get<Reservation[]>(this.apiUrl);
    }

    create(reservation: Reservation) {
      return this.http.post<Reservation>(this.apiUrl, reservation);
    }
}
