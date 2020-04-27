package com.cognizant.tramd19app.batch.writer;

import com.cloudant.client.api.Database;
import com.cognizant.tramd19app.riders.model.Riders;
import org.springframework.batch.item.ItemWriter;

import java.util.ArrayList;
import java.util.List;

public class RiderItemWrtiter implements ItemWriter<Riders> {

    private Database database;

    public RiderItemWrtiter(Database database) {
        this.database = database;
    }

    @Override
    public void write(List<? extends Riders> list) throws Exception {
        List<Riders> updatedList = new ArrayList<Riders>();
        list.forEach((rider) -> {
            String id = database.update(rider).getId();
            updatedList.add(database.find(Riders.class, id));
        });

        updatedList.forEach((ul) -> {
            System.out.println("List is "+ul.get_id() + " satus "+ul.getRiderStatus());
        });
    }
}
