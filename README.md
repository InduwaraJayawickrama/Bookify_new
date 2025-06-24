Read file: README.md
Ran tool
Ran tool
Ran tool
Read file: Backend/pom.xml
Read file: Frontend/package.json
Read file: Backend/src/main/resources/application.properties
Read file: Backend/src/main/java/com/example/Book/controller/AuthController.java
Read file: Backend/src/main/java/com/example/Book/controller/BookingController.java
Read file: Backend/src/main/java/com/example/Book/controller/ConsumerController.java
Read file: Backend/src/main/java/com/example/Book/controller/ServiceProviderController.java
Read file: Backend/src/main/java/com/example/Book/controller/ServiceController.java
Read file: Frontend/README.md
Read file: Frontend/src/app/Home/Home.js
Read file: Frontend/src/app/booking/CommonCategoryView.js
Read file: Frontend/src/app/signUp/RegisterForm.js
Read file: Frontend/src/app/Login/LoginForm.js
Read file: Frontend/src/app/account/client/MyProfile.js
Read file: Frontend/src/app/account/serviceProvider/MyProfile.js
Read file: Frontend/src/app/account/client/MyBooking.js
Read file: Frontend/src/app/account/serviceProvider/BookingService.js
I have gathered a comprehensive overview of your project, including backend and frontend structure, main features, dependencies, and configuration. Here’s a detailed, professional README.md draft for your project, **Bookify**:

---

# Bookify

Bookify is a full-stack web application for booking and managing appointments with various service providers (doctors, teachers, fitness coaches, etc.). It is designed for both consumers and service providers, offering a seamless experience for registration, booking, profile management, and notifications.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Backend](#backend)
  - [Tech Stack](#tech-stack)
  - [Key Endpoints](#key-endpoints)
  - [Configuration](#configuration)
- [Frontend](#frontend)
  - [Tech Stack](#tech-stack-1)
  - [Main Pages & Components](#main-pages--components)
- [Database](#database)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Registration & Login**: Separate flows for consumers and service providers, with JWT-based authentication.
- **Profile Management**: Both consumers and providers can manage their profiles, including uploading profile images.
- **Service Management**: Providers can create, update, and manage their offered services, schedules, and availability.
- **Booking System**: Consumers can browse providers, view categories, and book appointments.
- **Booking Management**: Both parties can view, update, and cancel bookings.
- **Notifications**: Email and SMS notifications for important events (requires configuration).
- **Feedback & Reviews**: Consumers can leave feedback for services.
- **Responsive UI**: Modern, mobile-friendly frontend built with React and Tailwind CSS.

---

## Architecture

```
Frontend (React)  <----REST API---->  Backend (Spring Boot)  <---->  MySQL Database
```

---

## Backend

### Tech Stack

- **Java 21**
- **Spring Boot 3.2**
- **Spring Security (JWT)**
- **Spring Data JPA**
- **MySQL**
- **Twilio (SMS)**
- **JavaMail (Email)**
- **Lombok**

### Key Endpoints

- **Authentication**
  - `POST /auth/service-provider/register` — Register a new service provider
  - `POST /auth/consumer/register` — Register a new consumer
  - `POST /auth/login` — Login for both roles
  - `POST /auth/reset-password` — Password reset

- **Booking**
  - `GET /api/booking/all` — List all bookings
  - `POST /api/booking/addBooking` — Create a new booking
  - `GET /api/booking/providers` — List all service providers with their services

- **Consumer**
  - `GET /api/consumer/{id}` — Get consumer by ID
  - `PUT /api/consumer/{id}` — Update consumer profile

- **Service Provider**
  - `GET /api/service-providers/profile` — Get provider profile (JWT required)
  - `PUT /api/service-providers/profile` — Update provider profile

- **Service Management**
  - `GET /api/service-providers/services` — List provider’s services
  - `POST /api/service-providers/services` — Create a new service

### Configuration

Edit `Backend/src/main/resources/application.properties` for:

- **Database**:  
  ```
  spring.datasource.url=jdbc:mysql://localhost:3306/bookify_test_001?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
  spring.datasource.username=root
  spring.datasource.password=root
  ```
- **Email**:  
  ```
  spring.mail.username=your-email@gmail.com
  spring.mail.password=your-email-password
  ```
- **Twilio**:  
  ```
  twilio.account.sid=YOUR_TWILIO_ACCOUNT_SID
  twilio.auth.token=YOUR_TWILIO_AUTH_TOKEN
  twilio.phone.number=YOUR_TWILIO_PHONE_NUMBER
  ```
- **File Uploads**:  
  ```
  spring.servlet.multipart.max-file-size=5MB
  ```

### Running the Backend

```bash
cd Backend
./mvnw spring-boot:run
```

---

## Frontend

### Tech Stack

- **React 18**
- **React Router**
- **Axios**
- **Tailwind CSS**
- **Styled Components**
- **React Toastify**

### Main Pages & Components

- **Home**: Landing page with navigation, slider, featured services, and feedback.
- **Sign Up / Login**: Separate forms for consumers and service providers, with OAuth placeholders.
- **Booking**: Browse providers by category, view details, and book appointments.
- **Account (Client & Provider)**:
  - **MyProfile**: View and edit profile, upload images.
  - **MyBooking**: View upcoming, past, and cancelled bookings.
  - **BookingService**: Providers manage booking preferences, scheduling, and cancellation policies.
- **Notifications**: View system and booking notifications.
- **Reset Password**: Password reset flow for both roles.

### Running the Frontend

```bash
cd Frontend
npm install
npm start
```

---

## Database

- **MySQL** is used for persistent storage.
- Database schema is managed via JPA entities and can be initialized/updated via migration scripts in `Backend/src/main/resources/db/migration/`.

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Bookify_new
   ```

2. **Backend**
   - Configure `application.properties` as above.
   - Start MySQL server.
   - Run the backend:
     ```bash
     cd Backend
     ./mvnw spring-boot:run
     ```

3. **Frontend**
   - Install dependencies and run:
     ```bash
     cd Frontend
     npm install
     npm start
     ```

4. **Access the app**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8081](http://localhost:8081)

---

## Usage

- **Consumers**: Register, browse providers, book services, manage bookings, and leave feedback.
- **Service Providers**: Register, set up services, manage schedule, view and manage bookings, and update profile.
- **Admins**: (If implemented) Can manage users, services, and view analytics.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Note:**  
- For email and SMS features, you must provide valid credentials in `application.properties`.
- Profile images are stored in `Backend/uploads/profile-images/`.
- For production, update CORS settings and environment variables as needed.

---
