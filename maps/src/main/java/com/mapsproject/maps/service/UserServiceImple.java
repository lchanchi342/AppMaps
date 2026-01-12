package com.mapsproject.maps.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mapsproject.maps.model.User;
import com.mapsproject.maps.repository.UserRepository;

@Service
public class UserServiceImple implements UserService{
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public User savUser(User user){
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
