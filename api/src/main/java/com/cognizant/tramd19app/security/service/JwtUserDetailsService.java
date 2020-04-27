package com.cognizant.tramd19app.security.service;

import com.cloudant.client.api.Database;
import com.cloudant.client.api.query.QueryResult;
import com.cognizant.tramd19app.security.model.Roles;
import com.cognizant.tramd19app.security.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private Database database;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String query = "{\n" +
                "   \"selector\": {\n" +
                "      \"username\": {\n" +
                "         \"$eq\": \""+ username +"\"\n" +
                "      }\n" +
                "   },\n" +
                "   \"fields\": [\n" +
                "      \"_id\",\n" +
                "      \"username\",\n" +
                "      \"password\",\n" +
                "      \"roles\",\n" +
                "      \"_rev\"\n" +
                "   ],\n" +
                "   \"sort\": []\n" +
                "}";
        QueryResult<Users> user = database.query(query, Users.class);

        if (user != null){
            return UserDetailsImpl.build(user.getDocs().get(0));
        }else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

    }
    public Users save(Users user) {
        Users newUser = new Users();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setRoles(user.getRoles());
        String id = database.post(newUser).getId();
        return database.find(Users.class, id);
    }

    public Roles saveRoles(Roles roles) {
        Roles role = new Roles();
        role.setRoles(roles.getRoles());
        String id = database.post(role).getId();
        return database.find(Roles.class, id);
    }
}
