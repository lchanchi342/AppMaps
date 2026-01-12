package com.mapsproject.maps.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mapsproject.maps.model.Marker;
import com.mapsproject.maps.service.MakerService;




//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(
    origins = "http://localhost:3000",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)

@RestController
@RequestMapping("/marker")

public class MarkerController {
    
    @Autowired
    private MakerService makerService;

    @PostMapping("/add")
    public String add(@RequestBody Marker marker) {
        makerService.saveMarker(marker);
        
        return "New marker added";
    }

    @GetMapping("/getAll")
    public List<Marker> getAllMarkers() {
        return makerService.getAllMarkers();
    }
    

    @GetMapping("/{id}")
    public Marker getMethodName(@PathVariable Integer id) {
        return makerService.getMarkerById(id);
    }
    

    @PutMapping("/update/{id}")
    public Marker updatMarker(@PathVariable Integer id, @RequestBody Marker marker) {
        return makerService.updateMarker(id, marker);
    }

    @org.springframework.web.bind.annotation.DeleteMapping("/delete/{id}")
    public void DeleteMapping(@PathVariable Integer id) {
        makerService.deleteMarker(id);
    }


}
