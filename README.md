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

<p align="center">
  <img src="https://img.icons8.com/fluency/96/book.png" alt="Bookify Logo" width="120"/>
</p>

<h1 align="center">📚 Bookify</h1>

<p align="center">
  <strong>A Full-Stack Appointment Booking Platform</strong><br/>
  Seamlessly connecting consumers and service providers for a smarter booking experience.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SpringBoot-3.2-green?style=flat-square&logo=springboot" />
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql" />
  <img src="https://img.shields.io/badge/Java-21-red?style=flat-square&logo=java" />
  <img src="https://img.shields.io/badge/License-MIT-blueviolet?style=flat-square" />
</p>

---

## 🌟 Overview

**Bookify** is a modern, scalable appointment booking system designed for a wide range of services—doctors, teachers, fitness coaches, and more. The platform offers tailored dashboards and workflows for **Consumers** and **Service Providers**, with secure authentication, profile management, and real-time notifications.

> Bookify streamlines the process of discovering, booking, and managing appointments, making it easy for both clients and providers to connect and collaborate.

---

## 🎯 Key Features

- 🔐 **User Registration & Login** (JWT-secured)
- 👤 **Profile Management** (with image upload)
- 🗓️ **Service & Schedule Management** (for providers)
- 📅 **Booking System** (browse, book, manage)
- 🔔 **Notifications** (Email & SMS, configurable)
- 💬 **Feedback & Reviews**
- 📱 **Responsive UI** (React + Tailwind CSS)
- 🗃️ **Role-based Dashboards**

---

## ⚙️ Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | React 18, Tailwind CSS, Styled Components |
| Backend      | Spring Boot 3.2, Spring Security (JWT), JPA |
| Database     | MySQL              |
| Email/SMS    | JavaMail, Twilio   |
| API Format   | REST (JSON)        |

---

## 🏗️ Architecture

```
Frontend (React)  <----REST API---->  Backend (Spring Boot)  <---->  MySQL Database
```

---

## 🗂️ Project Structure

```
Bookify_new/
├── Backend/
│   ├── src/main/java/com/example/Book/
│   │   ├── controller/      # REST Controllers
│   │   ├── service/         # Business Logic
│   │   ├── repo/            # JPA Repositories
│   │   ├── model/           # JPA Entities
│   │   ├── dto/             # Data Transfer Objects
│   │   └── config/          # Security & App Config
│   ├── src/main/resources/  # Properties, migrations
│   ├── uploads/             # Profile images
│   └── pom.xml              # Maven config
├── Frontend/
│   ├── src/app/             # React app modules
│   ├── public/              # Static assets
│   └── package.json         # NPM config
└── README.md
```

---

## 🚀 Main Modules & Pages

### Backend (Spring Boot)
- **Authentication**: Register/login for consumers & providers, JWT tokens
- **Booking**: Create, view, and manage bookings
- **Service Management**: Providers manage their services, schedules, and availability
- **Profile Management**: CRUD for user profiles, image upload
- **Notifications**: Email & SMS (Twilio)
- **Feedback**: Consumers can leave reviews

### Frontend (React)
- **Home**: Landing page, featured services, feedback
- **Sign Up / Login**: Flows for both roles
- **Booking**: Browse by category, book appointments
- **Account**: Profile, bookings, settings (role-based)
- **Notifications**: View system and booking alerts
- **Reset Password**: Secure password reset

---

## 🖼️ Screenshots

| Home Page | Booking | Provider Dashboard | Client Profile |
|-----------|---------|-------------------|---------------|
| ![](https://img.icons8.com/fluency/96/book.png) | ![](https://img.icons8.com/fluency/96/calendar.png) | ![](https://img.icons8.com/fluency/96/administrator-male.png) | ![](https://img.icons8.com/fluency/96/user.png) |

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd Bookify_new
```

### 2️⃣ Backend (Spring Boot)
- Configure `Backend/src/main/resources/application.properties` for DB, email, and Twilio.
- Start MySQL server.
- Run:
```bash
cd Backend
./mvnw spring-boot:run
```

### 3️⃣ Frontend (React)
```bash
cd Frontend
npm install
npm start
```

### 4️⃣ Access the app
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8081](http://localhost:8081)

---

## 🧑‍💻 Usage

- **Consumers**: Register, browse providers, book services, manage bookings, leave feedback.
- **Service Providers**: Register, set up services, manage schedule, view/manage bookings, update profile.

---

## 📊 Example API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/service-provider/register` | POST | Register a new service provider |
| `/auth/consumer/register` | POST | Register a new consumer |
| `/auth/login` | POST | Login for both roles |
| `/api/booking/addBooking` | POST | Create a new booking |
| `/api/booking/providers` | GET | List all service providers |
| `/api/service-providers/profile` | GET | Get provider profile (JWT) |
| `/api/service-providers/services` | GET | List provider's services |

---

## 👥 Roles & Contributors

<div align="center">
<table>
<tr>
<td align="center">
<img src="https://img.icons8.com/fluency/96/user-male-circle.png" width="100" height="100" style="border-radius: 50%; object-fit: cover;" alt="Contributor" />
<br/>
<small><strong>Contributor 1</strong></small><br/>
<small>Role</small>
</td>
<td align="center">
<img src="https://img.icons8.com/fluency/96/user-female-circle.png" width="100" height="100" style="border-radius: 50%; object-fit: cover;" alt="Contributor" />
<br/>
<small><strong>Contributor 2</strong></small><br/>
<small>Role</small>
</td>
<td align="center">
<img src="https://img.icons8.com/fluency/96/user-male-circle.png" width="100" height="100" style="border-radius: 50%; object-fit: cover;" alt="Contributor" />
<br/>
<small><strong>Contributor 3</strong></small><br/>
<small>Role</small>
</td>
<td align="center">
<img src="https://img.icons8.com/fluency/96/user-female-circle.png" width="100" height="100" style="border-radius: 50%; object-fit: cover;" alt="Contributor" />
<br/>
<small><strong>Contributor 4</strong></small><br/>
<small>Role</small>
</td>
</tr>
</table>
</div>

---

## 📘 Academic Details

> This project was developed as part of the **Semester 06 Software Engineering Project** at University of Jaffna, demonstrating full-stack development and real-world system design in the service booking domain.

---

## 🤝 Contributing

We welcome academic collaboration. To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

---

## 🔐 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

Special thanks to our mentors and faculty for their invaluable support and guidance throughout the development of Bookify.

>*Built with ❤️ for a smarter, more connected service experience.*
>***💡 If you like this project, don't forget to give it a ⭐ on GitHub! 😊***
