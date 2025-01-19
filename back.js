 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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
 const auth = getAuth(app);

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


const signUp = document.getElementById("registration-form");
signUp.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const userId = generateShortUserId(name, phone).trim();

    if (password !== confirmPassword) {
        showMessage("Passwords do not match!", "signUpMessage");
        return;
    }

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {userId, email, name, phone, address };

            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData);
        })
        .then(() => {
          localStorage.setItem("isRegistered", "true");
            showMessage("Account Created Successfully", "signUpMessage");
            window.location.href = "index.html";
            
        })
        .catch((error) => {
            console.error("Error creating user:", error.message);
            showMessage(`Error: ${error.message}`, "signUpMessage");
        });
});


