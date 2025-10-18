package com.hotel.controllers;

import com.hotel.models.Room;
import com.hotel.services.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final IRoomService roomService;

    @GetMapping
    public ResponseEntity<List<Room>> getRooms(){
        List<Room> rooms = roomService.findAll();
        return ResponseEntity.ok(rooms);
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room){
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok(createdRoom);
    }

    @PutMapping("{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Integer id, @RequestBody Room room){
        Room updatedRoom = roomService.updateRoom(id, room);
        return ResponseEntity.ok(updatedRoom);
    }
}
