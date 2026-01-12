package com.mapsproject.maps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapsproject.maps.model.Marker;

@Repository
public interface MarkerRepository extends JpaRepository<Marker, Integer>{

}
