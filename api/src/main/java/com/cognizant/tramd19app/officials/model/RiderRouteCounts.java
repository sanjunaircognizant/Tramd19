package com.cognizant.tramd19app.officials.model;

public class RiderRouteCounts implements Comparable<RiderRouteCounts> {

    private String sourceState;

    private String sourceDistrict;

    private String destinationState;

    private String destinationDistrict;

    private int riderRouteCount;

    public RiderRouteCounts() {
    }

    public RiderRouteCounts(String sourceState, String sourceDistrict, String destinationState, String destinationDistrict, int riderRouteCount) {
        this.sourceState = sourceState;
        this.sourceDistrict = sourceDistrict;
        this.destinationState = destinationState;
        this.destinationDistrict = destinationDistrict;
        this.riderRouteCount = riderRouteCount;
    }

    public String getSourceState() {
        return sourceState;
    }

    public void setSourceState(String sourceState) {
        this.sourceState = sourceState;
    }

    public String getSourceDistrict() {
        return sourceDistrict;
    }

    public void setSourceDistrict(String sourceDistrict) {
        this.sourceDistrict = sourceDistrict;
    }

    public String getDestinationState() {
        return destinationState;
    }

    public void setDestinationState(String destinationState) {
        this.destinationState = destinationState;
    }

    public String getDestinationDistrict() {
        return destinationDistrict;
    }

    public void setDestinationDistrict(String destinationDistrict) {
        this.destinationDistrict = destinationDistrict;
    }

    public int getRiderRouteCount() {
        return riderRouteCount;
    }

    public void setRiderRouteCount(int riderRouteCount) {
        this.riderRouteCount = riderRouteCount;
    }

    @Override
    public int compareTo(RiderRouteCounts riderRouteCounts) {
        if(riderRouteCount==riderRouteCounts.riderRouteCount)
            return 0;
        else if(riderRouteCount>riderRouteCounts.riderRouteCount)
            return 1;
        else
            return -1;
    }
}
