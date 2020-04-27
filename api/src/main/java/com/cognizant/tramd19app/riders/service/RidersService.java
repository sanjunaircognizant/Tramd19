package com.cognizant.tramd19app.riders.service;

import com.cloudant.client.api.Database;
import com.cognizant.tramd19app.riders.model.Riders;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RidersService {

    @Autowired
    public Database database;

    public Riders createRiders(Riders riders) {
        riders.setRiderStatus("Pending");
        riders.setRequestedDate(LocalDate.now().format(DateTimeFormatter.ISO_DATE));
        riders.setLastupdatedDate(LocalDateTime.now());
        String id =  database.post(riders).getId();
        return database.find(Riders.class, id);
    }

    public List<Riders> getRiders() throws IOException {
        List<Riders> allRiders = database.getAllDocsRequestBuilder()
                .includeDocs(true).build()
                .getResponse().getDocsAs(Riders.class);
        return allRiders;
    }

    public List<Riders> verifyRiders(String vehicleNumber) {
        System.out.println("Vehicle number is " + vehicleNumber);
        String query = "{\n" +
                "   \"selector\": {\n" +
                "      \"vehicleNumber\": {\n" +
                "         \"$eq\": \""+ vehicleNumber +"\"\n" +
                "      }\n" +
                "   },\n" +
                "   \"fields\": [],\n" +
                "   \"sort\": [\n" +
                "      {\n" +
                "         \"lastupdatedDate\": \"desc\"\n" +
                "      }\n" +
                "   ]\n" +
                "}";
        System.out.println("Query :: "+ query);
        return database.query(query, Riders.class).getDocs();
    }

    public Map<String, List<String>> getStatesAndDistricts() throws IOException {
        Map<String, List<String>> stateAndDistricts = new HashMap<String, List<String>>();
        File file = new File(ClassLoader.getSystemClassLoader().getResource("states-and-districts.json").getFile());

        try (FileReader reader = new FileReader(file))
        {
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(reader);
            JSONArray list = (JSONArray) jsonObject.get("states");

            list.forEach( (states) -> {
                JSONObject object = (JSONObject) states;
                stateAndDistricts.put((String) object.get("state"), (List<String>) object.get("districts"));
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

        return stateAndDistricts;
    }
}
