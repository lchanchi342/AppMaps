package com.mapsproject.maps.service;

import java.util.List;

import com.mapsproject.maps.model.Marker;

public interface MakerService {

    public Marker saveMarker(Marker maker);
    public List<Marker> getAllMarkers();
    public Marker getMarkerById(int id);
    public Marker updateMarker(int id, Marker marker);
    public void deleteMarker(int id);

}
