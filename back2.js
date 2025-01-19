// Ensure Firebase is initialized
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAs94kzecOsnuhfb_stbpyBeU2SKOXHwMU",
    authDomain: "ecogas2-20448.firebaseapp.com",
    databaseURL: "https://ecogas2-20448-default-rtdb.firebaseio.com",
    projectId: "ecogas2-20448",
    storageBucket: "ecogas2-20448.firebasestorage.app",
    messagingSenderId: "742431448275",
    appId: "1:742431448275:web:2bbccaf31f9642bf504826"
};

// Initialize Firebase App and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Utility function to show feedback messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign-In Form Logic
const signIn = document.getElementById('login-form');
signIn.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Sign in the user using Firebase Auth
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login successful
            const user = userCredential.user;
            localStorage.setItem("loggedInUserId", user.uid); // Store user UID in localStorage
            showMessage("Login successful! Redirecting...", "signInMessage");

            // Redirect to another page after login
            setTimeout(() => {
                window.location.href = "index.html"; // Replace with your desired page
            }, 2000);
        })
        .catch((error) => {
            // Handle login errors with detailed messages
            const errorCode = error.code;
            console.error("Sign-In Error:", error); // Log the full error for debugging

            if (errorCode === "auth/wrong-password") {
                showMessage("Incorrect password. Please try again.", "signInMessage");
            } else if (errorCode === "auth/user-not-found") {
                showMessage("No account found with this email. Please sign up.", "signInMessage");
            } else {
                showMessage("Login failed. Please check your internet connection and try again.", "signInMessage");
            }
        });
});
