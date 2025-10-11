package com.hotel.services;

import com.hotel.models.Reservation;
import java.util.List;

public interface IReservationService {
    List<Reservation> findAll();
    Reservation createReservation(Reservation reservation);
}
