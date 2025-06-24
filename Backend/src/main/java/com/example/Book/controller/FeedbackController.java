package com.example.Book.controller;

import com.example.Book.dto.FeedbackDTO;
import com.example.Book.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/add")
    public FeedbackDTO addFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        return feedbackService.saveFeedback(feedbackDTO);
    }

    @GetMapping("/all")
    public List<FeedbackDTO> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }
}