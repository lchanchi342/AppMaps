package com.mapsproject.maps.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mapsproject.maps.model.Marker;
import com.mapsproject.maps.repository.MarkerRepository;

@Service
public class MarkerServiceImple implements MakerService{
    
    @Autowired
    private MarkerRepository markerRepository;

    @Override
    public Marker saveMarker(Marker maker){
        return markerRepository.save(maker);
    }

    @Override
    public List<Marker> getAllMarkers(){
        return markerRepository.findAll();

    }
    
    
    @Override
    public Marker getMarkerById(int id){
        return markerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Marker not found"));
    }

    @Override
    public Marker updateMarker(int id, Marker marker){
        Marker existing = getMarkerById(id);

        existing.setName(marker.getName());
        existing.setLatitude(marker.getLatitude());
        existing.setLongitude(marker.getLongitude());

        return markerRepository.save(existing);
    }
    
    @Override
    public void deleteMarker(int id){
        markerRepository.deleteById(id);
    }
}


