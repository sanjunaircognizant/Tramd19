package com.cognizant.tramd19app.batch.config;

import com.cloudant.client.api.Database;
import com.cognizant.tramd19app.batch.processor.RiderItemProcessor;
import com.cognizant.tramd19app.batch.reader.RidersItemReader;
import com.cognizant.tramd19app.batch.writer.RiderItemWrtiter;
import com.cognizant.tramd19app.riders.model.Riders;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
@EnableBatchProcessing
public class ApplicationConfig {

    @Autowired
    private JobBuilderFactory jobBuilderFactory;

    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    @Autowired
    private Database database;

    @Bean
    public RidersItemReader reader() throws IOException {
        String query = "{\n" +
                "   \"selector\": {\n" +
                "      \"riderStatus\": {\n" +
                "         \"$eq\": \"Pending\"\n" +
                "      },\n" +
                "      \"approvalMethod\": {\n" +
                "         \"$eq\": \"System\"\n" +
                "      }\n" +
                "   },\n" +
                "   \"fields\": [],\n" +
                "   \"sort\": []\n" +
                "}";
        List<Riders> ridersList = database.query(query, Riders.class).getDocs();
        return new RidersItemReader(ridersList);
    }

    @Bean
    public RiderItemProcessor processor() {
        return new RiderItemProcessor();
    }

    @Bean
    public RiderItemWrtiter writer(){
        return new RiderItemWrtiter(database);
    }

    @Bean
    public Step step1() throws IOException {
        return stepBuilderFactory.get("step1").<Riders, Riders> chunk(10)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }

    @Bean
    public Job approveRidersJob() throws IOException {
        return jobBuilderFactory.get("approveRidersJob")
                .incrementer(new RunIdIncrementer())
                .flow(step1())
                .end()
                .build();
    }
}
