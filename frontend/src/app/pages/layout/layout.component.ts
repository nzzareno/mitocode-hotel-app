import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RoomsComponent } from '../../features/rooms/rooms.component';
import { ReservationsComponent } from '../../features/reservations/reservations.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, MatTabsModule, RoomsComponent, ReservationsComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
