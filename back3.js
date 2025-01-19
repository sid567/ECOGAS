// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  equalTo
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
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
  const database = getDatabase(app);
 

  // Counter to keep track of user ID generation
let userIdCounter = 0;

// Function to create a short unique user ID
function generateShortUserId(name, phone) {
  // Extract initials from the name
  const initials = name
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




document.getElementById("registration-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from refreshing the page

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const password = document.getElementById("password").value;
  const userId = generateShortUserId(name,phone).trim();
  const messageDiv = document.getElementById("message");

 /* if (!name || !email || !password || !address || !phone) {
    alert("All fields are required!");
    return;
  }
*/

  if (!name) {
    alert("Name is required!");
    return;
  }
  if (!email || !email.includes("@")) {
    alert("A valid email is required!");
    return;
  }
  if (!password || password.length < 6) {
    alert("Password must be at least 6 characters!");
    return;
  }
  if (!address) {
    alert("Address is required!");
    return;
  }
  if (!phone || phone.length !== 10) {
    alert("A valid 10-digit phone number is required!");
    return;
  }
  

  // Reference to the "users" node in the database
    const usersRef = ref(database, "users");

    // Push new user data to the database
  const newUserRef = push(usersRef); // Generate a unique key for each user
  set(newUserRef, {
    userId: userId,
    name: name,
    email: email,
    phone: phone,
    address: address,
    password: password
  })
    .then(() => {
      alert("User registered successfully!");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      alert("Error registering user. Please try again.");
    });
});
