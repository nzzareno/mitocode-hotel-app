package com.hotel.repositories;

import com.hotel.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByRoomId(Integer roomId);
}
