package com.cognizant.tramd19app.security.controller;

import com.cognizant.tramd19app.security.model.JwtRequest;
import com.cognizant.tramd19app.security.config.JwtTokenUtil;
import com.cognizant.tramd19app.security.model.JwtResponse;
import com.cognizant.tramd19app.security.model.Roles;
import com.cognizant.tramd19app.security.model.Users;
import com.cognizant.tramd19app.security.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;


    @RequestMapping(value="/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception{
        authenticate(authenticationRequest.getUsername(),authenticationRequest.getPassword());
        System.out.println("User name is "+authenticationRequest.getUsername());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Users> saveUser(@RequestBody Users user) throws Exception {
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    @PostMapping("/registerRoles")
    public ResponseEntity<Roles> saveRoles(@RequestBody Roles roles) throws Exception {
        return ResponseEntity.ok(userDetailsService.saveRoles(roles));
    }

    private void authenticate(String username, String password) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
