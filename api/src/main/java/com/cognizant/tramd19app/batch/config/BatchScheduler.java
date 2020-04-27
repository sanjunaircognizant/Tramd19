package com.cognizant.tramd19app.batch.config;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
public class BatchScheduler {

    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private Job approveRidersJob;

    @Scheduled(cron="0 0 */1 * * *")
    public void batchScheduler() {
        JobParameters jobParameters = new JobParametersBuilder().addLong("time", System.currentTimeMillis()).toJobParameters();

        try {
            JobExecution jobExecution = jobLauncher.run(approveRidersJob, jobParameters);
            System.out.println("Job's status " + jobExecution.getStatus());
        } catch(Exception ex) {
            ex.printStackTrace();
        }

    }
}
