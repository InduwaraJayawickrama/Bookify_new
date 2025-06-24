package com.example.Book.service;

import com.example.Book.dto.FeedbackDTO;
import com.example.Book.model.Feedback;
import com.example.Book.repo.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public FeedbackDTO saveFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback(feedbackDTO.getName(), feedbackDTO.getComments(), feedbackDTO.getRating());
        feedbackRepository.save(feedback);

        return new FeedbackDTO(feedback.getName(), feedback.getComments(), feedback.getRating(), feedback.getResponseDate());
    }

    public List<FeedbackDTO> getAllFeedback() {
        return feedbackRepository.findAll().stream().map(feedback ->
                        new FeedbackDTO(feedback.getName(), feedback.getComments(), feedback.getRating(), feedback.getResponseDate()))
                .collect(Collectors.toList());
    }
}