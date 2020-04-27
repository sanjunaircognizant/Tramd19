package com.cognizant.tramd19app.batch.reader;

import com.cognizant.tramd19app.riders.model.Riders;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;

import java.util.List;

public class RidersItemReader implements ItemReader<Riders> {

    private List<Riders> ridersList;

    private int riderCount = 0;

    public RidersItemReader(List<Riders> ridersList) {
        this.ridersList = ridersList;
    }

    @Override
    public Riders read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        Riders riders = null;

        if(riderCount < ridersList.size()) {
            riders = ridersList.get(riderCount);
            riderCount++;
        }

        return  riders;
    }
}
