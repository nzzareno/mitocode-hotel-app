package com.hotel.services.impl;

import com.hotel.models.Room;
import com.hotel.repositories.IRoomRepository;
import com.hotel.services.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService {

    private final IRoomRepository roomRepository;

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Integer id, Room room) {
        return roomRepository.findById(id)
                .map(existingRoom -> {
                    existingRoom.setRoomNumber(room.getRoomNumber());
                    existingRoom.setType(room.getType());
                    existingRoom.setIsAvailable(room.getIsAvailable());
                    existingRoom.setPricePerNight(room.getPricePerNight());
                    existingRoom.setReservations(room.getReservations());
                    return roomRepository.save(existingRoom);
                })
                .orElseThrow(() -> new RuntimeException("Room not found with id " + id));
    }
}
