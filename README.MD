# Hotel Reservation System

Complete hotel room reservation management system developed with Spring Boot and Angular.

## 🏗️ Architecture

- **Backend**: Spring Boot 3 + PostgreSQL + JPA
- **Frontend**: Angular 20 + Angular Material
- **Database**: PostgreSQL

## 🚀 Installation and Execution

### Prerequisites
- Java 21+
- Node.js 18+

### Backend (Spring Boot)

1. **Configure database:**
   ```sql
   CREATE DATABASE hotel-reservation;
   ```

2. **Configure application.properties:**
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/hotel-reservation
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   - Backend available at: http://localhost:8081

### Frontend (Angular)

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Run:**
   ```bash
   npm start
   ```
   - Frontend available at: http://localhost:4200

## 📋 Features

### Backend
- ✅ Complete CRUD for rooms
- ✅ Complete CRUD for reservations
- ✅ Business validations
- ✅ Date conflict prevention
- ✅ Automatic availability updates

### Frontend
- ✅ Room management with Angular Material
- ✅ Reservation management with validations
- ✅ Responsive and modern interface
- ✅ Light/dark theme
- ✅ Real-time synchronization
- ✅ Form validations

## 🛠️ Technologies Used

### Backend
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- Lombok
- Maven

### Frontend
- Angular 18
- Angular Material
- TypeScript
- RxJS
- Angular Forms

## 🔧 API Endpoints

### Rooms
- `GET /rooms` - List all rooms
- `POST /rooms` - Create new room
- `PUT /rooms/{id}` - Update room

### Reservations
- `GET /reservations` - List all reservations
- `POST /reservations` - Create new reservation

## 🎨 Frontend Features

- **Material Design**: Modern interface with Angular Material
- **Dual Theme**: Light and dark mode
- **Validations**: Reactive forms with real-time validations
- **Synchronization**: Automatic updates between components
- **Professional UX**: Snackbars, dialogs and visual feedback

## 🚦 Implemented Validations

### Backend
- Check-out dates after check-in
- Room available for reservation
- Date conflict prevention
- Automatic availability updates

### Frontend
- Required fields in forms
- Date validation (no past dates, check-out > check-in)
- Clear and specific error messages
- Prevention of invalid form submission

## 🎓 Final Project

**Course**: Java Full Stack - MitoCode  
**Date**: October 2025  
**Author**: Nazareno Garma 
