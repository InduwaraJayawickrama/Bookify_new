package com.example.Book.model;

import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String comments;

    private int rating;

    @Temporal(TemporalType.TIMESTAMP)
    private Date responseDate = new Date();

    public Feedback() {
    }

    public Feedback(String name, String comments, int rating) {
        this.name = name;
        this.comments = comments;
        this.rating = rating;
        this.responseDate = new Date();
    }

    // Getters and Setters
    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Date getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(Date responseDate) {
        this.responseDate = responseDate;
    }
}