import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
 
 const firebaseConfig = {
 //YOUR COPIED FIREBASE PART SHOULD BE HERE
 //WATCH THIS VIDEO TO LEARN WHAT TO PUT HERE   https://youtu.be/_Xczf06n6x0
    apiKey: "AIzaSyAs94kzecOsnuhfb_stbpyBeU2SKOXHwMU",
    authDomain: "ecogas2-20448.firebaseapp.com",
    databaseURL: "https://ecogas2-20448-default-rtdb.firebaseio.com",
    projectId: "ecogas2-20448",
    storageBucket: "ecogas2-20448.firebasestorage.app",
    messagingSenderId: "742431448275",
    appId: "1:742431448275:web:2bbccaf31f9642bf504826"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore();

 function showMessage(message, divId){
  var messageDiv=document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
      messageDiv.style.opacity=0;
  },5000);
}


let userIdCounter = 0;

// Function to create a short unique user ID
function generateShortBookingId(userid, phone) {
  // Extract initials from the name
  const initials = userid
    .trim()
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

  // Get the last 4 digits of the phone number
  const phoneDigits = phone.trim().slice(-4);

  // Increment the counter
  userIdCounter++;

  // Combine initials, phone digits, and counter to create a short ID
  const uniqueUserId = `${initials}${phoneDigits}${userIdCounter}`;

  return uniqueUserId;
}

const book = document.getElementById("booking");
book.addEventListener("submit", (event) => {
    event.preventDefault();

    // Create a new Date object for the current date and time
let currentDate = new Date();

let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
let year = currentDate.getFullYear();

// Format the date as dd/mm/yyyy
let formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;


    const userId = document.getElementById("userId").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = formattedDate;
    const bookingId=generateShortBookingId(email,phone);
    const status = "pending";
    

            const userData = {userId, bookingId, email, phone, date, status };

            const docRef = doc(db, "booking-request", bookingId);
            setDoc(docRef, userData)
             .then(() => {
            showMessage("Request sent Successfully....u will get an email..!", "book");

        })
        .catch((error) => {
            console.error("Error requesting:", error.message);
            showMessage(`Error: ${error.message}`, "book");
        });

    //      window.location.href = 'payment.html';

    // document.getElementById('pay').addEventListener('click', function() {
    //     // Navigate to the desired page
    //     window.location.href = 'success.html'; // Replace with your target URL
    // });
        
});


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin
admin.initializeApp();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Or another email provider
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password or app-specific password
  },
});

exports.sendBookingEmail = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap, context) => {
    const bookingData = snap.data();
    const userEmail = bookingData.email; // Assuming the user email is stored in the booking document

    const mailOptions = {
      from: "your-email@gmail.com", // Sender's email address
      to: userEmail, // Recipient's email address
      subject: "Gas Cylinder Booking Confirmation",
      html: `<p>Dear ${bookingData.name},</p>
             <p>Thank you for booking a gas cylinder with us!</p>
             <p>Booking Details:</p>
             <ul>
               <li>Booking ID: ${context.params.bookingId}</li>
               <li>Quantity: ${bookingData.quantity}</li>
               <li>Date: ${new Date(bookingData.timestamp).toLocaleString()}</li>
             </ul>
             <p>We appreciate your trust in our service.</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Booking confirmation email sent to:", userEmail);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });

