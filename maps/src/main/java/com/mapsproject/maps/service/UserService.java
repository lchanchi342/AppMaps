package com.mapsproject.maps.service;

import java.util.List;

import com.mapsproject.maps.model.User;

public interface UserService {
    public User savUser(User user);
    public List<User> getAllUsers();
}
