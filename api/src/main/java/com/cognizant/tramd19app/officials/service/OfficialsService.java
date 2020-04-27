package com.cognizant.tramd19app.officials.service;

import com.cloudant.client.api.Database;
import com.cloudant.client.api.model.Response;
import com.cloudant.client.api.views.Key;
import com.cloudant.client.api.views.ViewResponse;
import com.cognizant.tramd19app.officials.model.Officials;
import com.cognizant.tramd19app.officials.model.RiderRouteCounts;
import com.cognizant.tramd19app.officials.model.RiderStatusCounts;
import com.cognizant.tramd19app.riders.model.Riders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import javax.json.*;


@Service
public class OfficialsService {

    @Autowired
    private Database database;

    public Officials getOfficialsDetails(String requestedDate) throws IOException {
        Officials officialInfo = new Officials();

        officialInfo.setDate(LocalDate.parse(requestedDate));

        Map<String, Integer> riderCountsMap = getRiderStatusCounts(requestedDate).stream().
                collect(Collectors.toMap(riderCount -> riderCount.getRiderStatus(), riderCount -> riderCount.getRiderStatusCount()));
        officialInfo.setRiderCounts(riderCountsMap);

//        List<RiderRouteCounts> riderRouteCounts = getRiderRouteCounts(requestedDate);
//        Collections.sort(riderRouteCounts);
//        officialInfo.setLeastUsedRoute(riderRouteCounts.size() > 0 ? riderRouteCounts.get(0) : null);
//        officialInfo.setMostUsedRoute(riderRouteCounts.size() > 0 ? riderRouteCounts.get(riderRouteCounts.size()-1) : null);

        officialInfo.setManualApprovalRiders(findByApprovalMethodAndAndRequestedDateAndRiderStatus(requestedDate));

        return officialInfo;
    }

    public Riders confirmRiderStatus(String id, String status) {
        Riders riders = database.find(Riders.class, id);
        riders.setRiderStatus(status);
        riders.setLastupdatedDate(LocalDateTime.now());
        Response response = database.update(riders);
        System.out.println("Updated riders "+ response);

        return database.find(Riders.class, id);
    }

    private List<RiderStatusCounts> getRiderStatusCounts(String currentDate) throws IOException {


        String query = Json.createObjectBuilder()
                .add("selector", Json.createObjectBuilder()
                       // .add("riderStatus",Json.createObjectBuilder().add("$eq","Pending").build())
                        .add("requestedDate",Json.createObjectBuilder().add("$eq", currentDate ).build())
                       // .build()
                )
                .add("fields",Json.createArrayBuilder().add("riderStatus").build())
                .add("sort",Json.createArrayBuilder().build()
                        //.add(Json.createObjectBuilder().add("lastupdatedDate","asc").build()).build()
                )
                .build().toString();

        List<Map> riders= database.query(query, Map.class).getDocs();

        List<RiderStatusCounts> results = new ArrayList<RiderStatusCounts>();
        int approved=0,rejected=0,pending=0;
        for(Map entry : riders){
            String val = (String)entry.get("riderStatus");
            if(val.equalsIgnoreCase("approved")){
                approved++;
            }else  if(val.equalsIgnoreCase("rejected")){
                rejected++;
            }else  if(val.equalsIgnoreCase("pending")){
                pending++;
            }
        }

        results.add(new RiderStatusCounts("Approved",approved));
        results.add(new RiderStatusCounts("Rejected",rejected));
        results.add(new RiderStatusCounts("Pending",pending));
        results.add(new RiderStatusCounts("Total",riders.size()));
        return results;
    }

    private List<RiderRouteCounts> getRiderRouteCounts(String currentDate) throws IOException {
        String nextDateString = LocalDate.parse(currentDate).plusDays(1).format(DateTimeFormatter.ISO_DATE);
        String regExp = "[^a-zA-Z0-9]";
        List<RiderRouteCounts> results = new ArrayList<RiderRouteCounts>();

        List<ViewResponse.Row<Key.ComplexKey, Integer>> rows = database.getViewRequestBuilder("riderRouteDateReport", "byRouteDynamicDate")
                .newRequest(Key.Type.COMPLEX, Integer.class).startKey(Key.complex(currentDate))
                .endKey(Key.complex(nextDateString)).group(true).build().getResponse().getRows();

        rows.forEach((row) -> {
            String[] arr = row.getKey().toJson().split(",");
            String sourceState = arr[1].replaceAll(regExp,"");
            String sourceDistrict = arr[2].replaceAll(regExp,"");
            String destinationState = arr[3].replaceAll(regExp,"");
            String destinationDistrict = arr[4].replaceAll(regExp,"");
            results.add(new RiderRouteCounts(sourceState, sourceDistrict, destinationState, destinationDistrict, row.getValue()));
        });

        results.forEach((result) -> {
            System.out.println(result.getSourceState() + " 1->"+ result.getSourceDistrict()+"2->"+result.getDestinationState()+"3->"+result.getDestinationDistrict()+" " +result.getRiderRouteCount());
        });
        return results;
    }

    private List<Riders> findByApprovalMethodAndAndRequestedDateAndRiderStatus(String date) {

        String query = Json.createObjectBuilder()
                .add("selector", Json.createObjectBuilder()
                        .add("riderStatus",Json.createObjectBuilder().add("$eq","Pending").build())
                        .add("requestedDate",Json.createObjectBuilder().add("$eq", date ).build())
                        .build()
                )
                .add("fields",Json.createArrayBuilder().build())
                .add("sort",Json.createArrayBuilder().add(Json.createObjectBuilder().add("lastupdatedDate","asc").build()).build())
                .build().toString();
        System.out.println("Result :: "+database.query(query, Riders.class).getDocs());
        return database.query(query, Riders.class).getDocs();
    }
}
