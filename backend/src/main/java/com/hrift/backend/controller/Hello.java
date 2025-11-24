package com.hrift.backend.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hello {

    @GetMapping("/hello")
    @PreAuthorize("hasRole('CANDIDATE')")
    public String sayHello(){
        return "Bonjour Emmanuel-Marie";
    }
}
