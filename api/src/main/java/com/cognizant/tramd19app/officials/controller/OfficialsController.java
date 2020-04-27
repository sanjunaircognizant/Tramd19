package com.cognizant.tramd19app.officials.controller;

import com.cognizant.tramd19app.officials.model.Officials;
import com.cognizant.tramd19app.officials.service.OfficialsService;
import com.cognizant.tramd19app.riders.model.Riders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/officials")
public class OfficialsController {

    @Autowired
    private OfficialsService officialsService;

    @GetMapping("/{currentDate}")
    public Officials getOfficialsDetails(@PathVariable String currentDate) throws IOException {
       return officialsService.getOfficialsDetails(currentDate);
    }

    @PutMapping("/confirmRiderStatus/{id}/{status}")
    public Riders confirmRiderStatus(@PathVariable String id, @PathVariable String status) {
        return officialsService.confirmRiderStatus(id, status);
    }
}
