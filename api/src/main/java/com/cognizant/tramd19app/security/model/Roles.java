package com.cognizant.tramd19app.security.model;

public class Roles {

    private String _id;

    private String _rev;

    private ERole roles;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_rev() {
        return _rev;
    }

    public void set_rev(String _rev) {
        this._rev = _rev;
    }

    public ERole getRoles() {
        return roles;
    }

    public void setRoles(ERole roles) {
        this.roles = roles;
    }

    public Roles() {
    }
}
