package com.cognizant.tramd19app.batch.processor;

import com.cognizant.tramd19app.riders.model.Riders;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class RiderItemProcessor implements ItemProcessor<Riders, Riders> {

    private List<Riders> riderList;
    private Map<String,Integer> riderMap= new HashMap<String, Integer>();
    private String sourceDestinationValue;
    private List<List<Riders>> lists = new ArrayList<>();
    final int chunkSize =10;
    final AtomicInteger counter = new AtomicInteger();
    @Override
    public Riders process(Riders riders) {
        /*if("System".equalsIgnoreCase(riders.getApprovalMethod()) ) {
            riders.setRiderStatus("Approved");
            riders.setLastupdatedDate(LocalDateTime.now());
        }*/
        riderList.sort(Comparator.comparing(Riders::getLastupdatedDate));
        for (Riders rider:riderList) {
            sourceDestinationValue = rider.getSourceDistrict()+'/'+rider.getDestinationDistrict();
            if (riderMap.containsKey(sourceDestinationValue)){
                riderMap.put(sourceDestinationValue,riderMap.get(sourceDestinationValue)+1);
            }else{
                riderMap.put(sourceDestinationValue,1);
            }
        }
        for (String sdValue: riderMap.keySet() ) {
            if (riderMap.get(sdValue) > 10){
                String[] arrOfStr = sdValue.split("/", 2);
                if(arrOfStr[0].equals(riders.getSourceDistrict()) && arrOfStr.equals(riders.getDestinationDistrict())) {
                   lists = (List<List<Riders>>) riderList.stream()
                           .collect(Collectors.groupingBy(s -> counter.getAndIncrement() / chunkSize))
                           .values();
                }
            }else{
                riders.setRiderStatus("Approved");
                riders.setRideDate(riders.getRequestedDate());
                riders.setStartTimeSlot("10:00 AM");
                riders.setEndTimeSlot("12:00 PM");
                riders.setLastupdatedDate(LocalDateTime.now());
            }
        }
        for (int i=0; i < lists.size();i++){
              for (Riders rider:lists.get(i)) {
            riders.setRiderStatus("Approved");
            riders.setRideDate(LocalDate.parse(riders.getRequestedDate()).plusDays(i).format(DateTimeFormatter.ISO_DATE));
            riders.setStartTimeSlot("10:00 AM");
            riders.setEndTimeSlot("12:00 PM");
            riders.setLastupdatedDate(LocalDateTime.now());
        }}
        return riders;
    }

}
