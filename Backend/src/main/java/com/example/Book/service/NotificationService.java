package com.example.Book.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.Book.model.Notification;
import com.example.Book.model.Reminder;
import com.example.Book.repo.NotificationRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private NotificationRepository notificationRepository;

    private final String TWILIO_ACCOUNT_SID = "YOUR_TWILIO_ACCOUNT_SID";
    private final String TWILIO_AUTH_TOKEN = "YOUR_TWILIO_AUTH_TOKEN";
    private final String TWILIO_PHONE_NUMBER = "YOUR_TWILIO_PHONE_NUMBER";

    public NotificationService() {
        Twilio.init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    }

    public void sendNotification(Reminder reminder) {
        String email = reminder.getBooking().getConsumer().getEmail();
        String phone = reminder.getBooking().getConsumer().getPhone();
        String message = "Reminder: " + reminder.getDescription();

        sendEmail(email, message);
        sendSMS(phone, message);

        saveNotification(reminder, message);
    }

    private void sendEmail(String to, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(to);
            mailMessage.setSubject("Appointment Reminder");
            mailMessage.setText(message);
            mailSender.send(mailMessage);
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }

    private void sendSMS(String to, String message) {
        try {
            Message.creator(
                new com.twilio.type.PhoneNumber(to),
                new com.twilio.type.PhoneNumber(TWILIO_PHONE_NUMBER),
                message
            ).create();
        } catch (Exception e) {
            System.out.println("Failed to send SMS: " + e.getMessage());
        }
    }

    private void saveNotification(Reminder reminder, String message) {
        Notification notification = new Notification();
        notification.setConsumer(reminder.getBooking().getConsumer());
        notification.setBooking(reminder.getBooking());
        notification.setDescription(message);
        notificationRepository.save(notification);
    }
}
