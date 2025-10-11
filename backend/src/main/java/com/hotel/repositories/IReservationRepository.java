package com.hotel.repositories;

import com.hotel.models.Reservation;
import com.hotel.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Integer> {
    Room findByRoomId(Integer id);
}
