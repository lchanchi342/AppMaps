package com.mapsproject.maps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapsproject.maps.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
