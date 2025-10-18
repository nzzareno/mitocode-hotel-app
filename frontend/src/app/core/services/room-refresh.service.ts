import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomRefreshService {
  private refreshSubject = new BehaviorSubject<number>(0);

  // Método para disparar una actualización
  triggerRefresh() {
    this.refreshSubject.next(this.refreshSubject.value + 1);
  }

  // Observable para que otros componentes se suscriban a las actualizaciones
  getRefreshObservable() {
    return this.refreshSubject.asObservable();
  }
}
