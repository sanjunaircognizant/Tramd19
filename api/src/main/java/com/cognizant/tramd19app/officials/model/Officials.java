package com.cognizant.tramd19app.officials.model;

import com.cognizant.tramd19app.riders.model.Riders;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class Officials {

    private LocalDate date;

    private Map<String, Integer> riderCounts;

    private RiderRouteCounts mostUsedRoute;

    private RiderRouteCounts leastUsedRoute;

    private List<Riders> manualApprovalRiders;

    public Officials() {
    }

    public Officials(LocalDate date, Map<String, Integer> riderCounts, RiderRouteCounts mostUsedRoute, RiderRouteCounts leastUsedRoute, List<Riders> manualApprovalRiders) {
        this.date = date;
        this.riderCounts = riderCounts;
        this.mostUsedRoute = mostUsedRoute;
        this.leastUsedRoute = leastUsedRoute;
        this.manualApprovalRiders = manualApprovalRiders;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public RiderRouteCounts getMostUsedRoute() {
        return mostUsedRoute;
    }

    public void setMostUsedRoute(RiderRouteCounts mostUsedRoute) {
        this.mostUsedRoute = mostUsedRoute;
    }

    public Map<String, Integer> getRiderCounts() {
        return riderCounts;
    }

    public void setRiderCounts(Map<String, Integer> riderCounts) {
        this.riderCounts = riderCounts;
    }

    public RiderRouteCounts getLeastUsedRoute() {
        return leastUsedRoute;
    }

    public void setLeastUsedRoute(RiderRouteCounts leastUsedRoute) {
        this.leastUsedRoute = leastUsedRoute;
    }

    public List<Riders> getManualApprovalRiders() {
        return manualApprovalRiders;
    }

    public void setManualApprovalRiders(List<Riders> manualApprovalRiders) {
        this.manualApprovalRiders = manualApprovalRiders;
    }
}
