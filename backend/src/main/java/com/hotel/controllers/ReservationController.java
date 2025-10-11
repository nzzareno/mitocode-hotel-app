package com.hotel.controllers;

import com.hotel.models.Room;
import com.hotel.services.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final IRoomService roomService;

    @GetMapping
    public ResponseEntity<List<Room>> findAll(){
        List<Room> rooms = roomService.findAll();
        return ResponseEntity.ok(rooms);
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(Room room){
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok(createdRoom);
    }
}
