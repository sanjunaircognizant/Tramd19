package com.cognizant.tramd19app.officials.model;

public class RiderStatusCounts {
    private String riderStatus;

    private int riderStatusCount;

    public RiderStatusCounts() { }

    public RiderStatusCounts(String riderStatus, int riderStatusCount) {
        this.riderStatus = riderStatus;
        this.riderStatusCount = riderStatusCount;
    }

    public String getRiderStatus() {
        return riderStatus;
    }

    public void setRiderStatus(String riderStatus) {
        this.riderStatus = riderStatus;
    }

    public int getRiderStatusCount() {
        return riderStatusCount;
    }

    public void setRiderStatusCount(int riderStatusCount) {
        this.riderStatusCount = riderStatusCount;
    }
}
