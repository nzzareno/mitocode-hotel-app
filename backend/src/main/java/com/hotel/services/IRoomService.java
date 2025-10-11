package com.hotel.services;

import com.hotel.models.Room;

import java.util.List;

public interface IRoomService {
    List<Room> findAll();
    Room createRoom(Room room);
    Room updateRoom(Integer id, Room room);
}
