package com.cognizant.tramd19app.riders.controller;

import com.cloudant.client.api.Database;
import com.cognizant.tramd19app.riders.model.Riders;
import com.cognizant.tramd19app.riders.service.RidersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/riders")
public class RidersController {

    @Autowired
    private Database database;

    @Autowired
    private RidersService ridersService;

    @PostMapping
    public ResponseEntity<Riders> createRider(@RequestBody Riders riders) {
        return ResponseEntity.ok(ridersService.createRiders(riders));
    }

    @GetMapping
    public List<Riders> getRiders() throws IOException {
        return ridersService.getRiders();
    }

    @GetMapping("/verify/{vehicleNumber}")
    public List<Riders> verifyRider(@PathVariable String vehicleNumber) {
        return ridersService.verifyRiders(vehicleNumber);
    }

    @GetMapping("/statesAndDistricts")
    public Map<String, List<String>> getStatesAndDistricts() throws IOException {
        return ridersService.getStatesAndDistricts();
    }
}
