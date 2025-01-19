// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

  // Import the functions you need from the SDKs you need
 // import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC2UU8a_zdSaOoeLBGWRuucOmjrvyhnaew",
    authDomain: "teaser-89df4.firebaseapp.com",
    databaseURL: "https://teaser-89df4-default-rtdb.firebaseio.com",
    projectId: "teaser-89df4",
    storageBucket: "teaser-89df4.firebasestorage.app",
    messagingSenderId: "1074721147253",
    appId: "1:1074721147253:web:0d314ab73caa22fca76b3c"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Form submission event
document.getElementById("registrationForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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

  // Reference to the "users" node in the database
  const usersRef = ref(database, "users");

  // Push new user data to the database
  const newUserRef = push(usersRef); // Generate a unique key for each user
  set(newUserRef, {
    name: name,
    email: email,
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





<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAs94kzecOsnuhfb_stbpyBeU2SKOXHwMU",
    authDomain: "ecogas2-20448.firebaseapp.com",
    projectId: "ecogas2-20448",
    storageBucket: "ecogas2-20448.firebasestorage.app",
    messagingSenderId: "742431448275",
    appId: "1:742431448275:web:f3faec10ae9bbc9b504826"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>