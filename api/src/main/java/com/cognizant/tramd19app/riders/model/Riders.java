package com.cognizant.tramd19app.riders.model;

import java.time.LocalDateTime;

public class Riders {

    public String _id;

    private String _rev;

    public boolean interState;

    public String sourceState;

    public String sourceDistrict;

    public String destinationState;

    public String destinationDistrict;

    public String vehicleNumber;

    public String purpose;

    public String mobileNum;

    public int approxKms;

    public String purposeDesc;

    public String riderStatus;

    private String approvalMethod;

    private String requestedDate;

    private LocalDateTime lastupdatedDate;

    private String rideDate;

    private String startTimeSlot;

    private String endTimeSlot;

    public Riders() { }

    public Riders(boolean interState, String sourceState, String sourceDistrict, String destinationState, String destinationDistrict, String vehicleNumber, String purpose, String mobileNum, int approxKms, String purposeDesc, String riderStatus, String approvalMethod, String requestedDate,String rideDate, String startTimeSlot, String endTimeSlot) {
        this.interState = interState;
        this.sourceState = sourceState;
        this.sourceDistrict = sourceDistrict;
        this.destinationState = destinationState;
        this.destinationDistrict = destinationDistrict;
        this.vehicleNumber = vehicleNumber;
        this.purpose = purpose;
        this.mobileNum = mobileNum;
        this.approxKms = approxKms;
        this.purposeDesc = purposeDesc;
        this.riderStatus = riderStatus;
        this.approvalMethod = approvalMethod;
        this.requestedDate = requestedDate;
        this.rideDate = rideDate;
        this.startTimeSlot = startTimeSlot;
        this.endTimeSlot = endTimeSlot;
    }

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

    public boolean isInterState() {
        return interState;
    }

    public void setInterState(boolean interState) {
        this.interState = interState;
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

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getMobileNum() {
        return mobileNum;
    }

    public void setMobileNum(String mobileNum) {
        this.mobileNum = mobileNum;
    }

    public int getApproxKms() {
        return approxKms;
    }

    public void setApproxKms(int approxKms) {
        this.approxKms = approxKms;
    }

    public String getPurposeDesc() {
        return purposeDesc;
    }

    public void setPurposeDesc(String purposeDesc) {
        this.purposeDesc = purposeDesc;
    }

    public String getRiderStatus() {
        return riderStatus;
    }

    public void setRiderStatus(String riderStatus) {
        this.riderStatus = riderStatus;
    }

    public String getApprovalMethod() {
        return approvalMethod;
    }

    public void setApprovalMethod(String approvalMethod) {
        this.approvalMethod = approvalMethod;
    }

    public String getRequestedDate() {
        return requestedDate;
    }

    public void setRequestedDate(String requestedDate) {
        this.requestedDate = requestedDate;
    }

    public LocalDateTime getLastupdatedDate() {
        return lastupdatedDate;
    }

    public void setLastupdatedDate(LocalDateTime lastupdatedDate) {
        this.lastupdatedDate = lastupdatedDate;
    }

    public String getRideDate() {
        return rideDate;
    }

    public void setRideDate(String rideDate) {
        this.rideDate = rideDate;
    }

    public String getStartTimeSlot() {
        return startTimeSlot;
    }

    public void setStartTimeSlot(String startTimeSlot) {
        this.startTimeSlot = startTimeSlot;
    }

    public String getEndTimeSlot() {
        return endTimeSlot;
    }

    public void setEndTimeSlot(String endTimeSlot) {
        this.endTimeSlot = endTimeSlot;
    }
}
