# ECOGAS

# Project Report

## Title: Gas Booking System

### Objective
To design and implement a web-based gas booking system that enables users to register, book gas cylinders, and manage their bookings seamlessly. The system provides a user-friendly interface and integrates Firebase Firestore as the database for storing user and booking information.

### Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase Firestore
- **Other Tools**: Firebase Authentication, Firebase SDK, Nodemailer (for email notifications)

### Features Implemented

#### User Features:
1. **User Registration and Authentication**
   - Users can sign up with their name, email, phone number, and address.
   - Firebase Authentication is used for secure account creation and login.

2. **Convenient Gas Booking**
   - Users can book gas cylinders by entering their details (user ID, email, and phone number).
   - Unique booking IDs are generated for each booking.

3. **Booking History**
   - Users can view their booking history and track the status of their bookings.

4. **Email Notifications**
   - Users receive an email confirmation upon successful booking.

#### Admin Features:
1. **Booking Management**
   - Admins can view and manage booking requests stored in the Firestore database.

2. **Quality Assurance**
   - Information about gas quality assurance is displayed on the website.

3. **Customer Support**
   - A dedicated contact page allows users to request maintenance services or reach out for support.

### System Design

#### Frontend
- **Home Page**: Displays an introduction to the gas booking system and its services.
- **Sign-In and Registration Page**: Allows users to create accounts and log in.
- **Booking Page**: Provides a form for users to submit their booking requests.
- **Contact Page**: Enables users to request maintenance or other services.

#### Backend
- Firebase Firestore stores user registration and booking data.
- Firebase Authentication manages user accounts securely.
- Nodemailer handles email notifications for booking confirmations.

### Code Functionality

#### Key Code Sections
1. **Registration Form Submission**
   - Validates user inputs and ensures password confirmation.
   - Saves user details in Firestore with a unique user ID.
   - Redirects the user to the homepage upon successful registration.

2. **Booking Form Submission**
   - Collects user inputs and generates a unique booking ID.
   - Saves booking details in Firestore.
   - Displays a confirmation message to the user.

3. **Email Notifications**
   - A Firebase Cloud Function triggers when a new booking document is added.
   - Sends an email to the user with booking details using Nodemailer.

### Challenges Faced
1. **Firebase Integration**:
   - Configuring Firebase Firestore and Authentication required thorough understanding and debugging.
2. **Unique ID Generation**:
   - Ensuring user IDs and booking IDs are unique while being concise.
3. **Email Notifications**:
   - Setting up Nodemailer with Gmail required careful configuration of app passwords.
4. **Responsive Design**:
   - Ensuring the website works well on different devices.

### Future Enhancements
1. **Payment Integration**
   - Add online payment options for bookings.
2. **Admin Dashboard**
   - Develop an interface for admins to manage bookings and user data.
3. **Real-Time Notifications**
   - Notify users of booking updates in real-time.
4. **Multi-Language Support**
   - Add support for multiple languages to cater to a wider audience.

### Conclusion
The gas booking system successfully achieves its objectives of providing a convenient and efficient platform for users to book gas cylinders. By leveraging Firebase's robust backend capabilities and a user-friendly frontend, the system ensures reliability and ease of use. Future enhancements will further improve its functionality and user experience.

