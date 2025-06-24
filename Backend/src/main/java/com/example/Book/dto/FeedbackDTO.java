package com.example.Book.dto;

import java.util.Date;

public class FeedbackDTO {
    private String name;
    private String comments;
    private int rating;
    private Date responseDate;

    public FeedbackDTO() {}

    public FeedbackDTO(String name, String comments, int rating, Date responseDate) {
        this.name = name;
        this.comments = comments;
        this.rating = rating;
        this.responseDate = responseDate;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public Date getResponseDate() { return responseDate; }
    public void setResponseDate(Date responseDate) { this.responseDate = responseDate; }
}