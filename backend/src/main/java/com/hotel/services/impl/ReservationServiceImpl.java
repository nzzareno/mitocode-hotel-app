package com.hotel.services.impl;

import com.hotel.models.Reservation;
import com.hotel.repositories.IReservationRepository;
import com.hotel.repositories.IRoomRepository;
import com.hotel.services.IReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements IReservationService {

    private final IReservationRepository reservationRepository;
    private final IRoomRepository roomRepository;

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    @Transactional
    public Reservation createReservation(Reservation reservation) {
        if (reservation.getCheckInDate().isAfter(reservation.getCheckOutDate())) {
            throw new IllegalArgumentException("Check-in date must be before check-out date");
        }
        if (!reservation.getRoom().getIsAvailable()) {
            throw new IllegalStateException("Room is not available for reservation");
        }
        List<Reservation> existingReservations = reservationRepository.findByRoomId(reservation.getRoom().getId()).getReservations();
        for (Reservation existingReservation : existingReservations) {
            if (reservation.getCheckInDate().isBefore(existingReservation.getCheckOutDate()) &&
                reservation.getCheckOutDate().isAfter(existingReservation.getCheckInDate())) {
                throw new IllegalStateException("Room is already booked for the selected dates");
            }
        }
        Reservation saved = reservationRepository.save(reservation);
        // Automatically mark the room as unavailable once a reservation is created
        reservation.getRoom().setIsAvailable(false);
        roomRepository.save(reservation.getRoom());
        return saved;
    }
}
