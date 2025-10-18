import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  protected http = inject(HttpClient);
  protected apiUrl = `${environment.HOST}/rooms`;

  findAll() {
    return this.http.get<Room[]>(this.apiUrl);
  }

  create(room: Room) {
    return this.http.post<Room>(this.apiUrl, room);
  }

  update(roomId: number, room: Room) {
    return this.http.put<Room>(`${this.apiUrl}/${roomId}`, room);
  }
  
}
