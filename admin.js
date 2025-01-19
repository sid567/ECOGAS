
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, query, where, onSnapshot, doc, updateDoc,getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAs94kzecOsnuhfb_stbpyBeU2SKOXHwMU",
  authDomain: "ecogas2-20448.firebaseapp.com",
  databaseURL: "https://ecogas2-20448-default-rtdb.firebaseio.com",
  projectId: "ecogas2-20448",
  storageBucket: "ecogas2-20448.firebasestorage.app",
  messagingSenderId: "742431448275",
  appId: "1:742431448275:web:2bbccaf31f9642bf504826"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get reference to the requests section
const requestsSection = document.getElementById("requests-section");

// Fetch requests from Firestore
function fetchRequests() {
  const q = query(collection(db, "booking-request"), where("status", "==", "pending"));
  onSnapshot(q, (snapshot) => {
    // Clear the requests section
    requestsSection.innerHTML = "";

    snapshot.forEach((doc) => {
      const request = doc.data();
      const requestId = doc.id;
      displayRequest(request, requestId);
    });
  });
}

// Display a request card with Accept/Reject buttons
function displayRequest(request, requestId) {
  const requestCard = document.createElement("div");
  requestCard.classList.add("request-card");
  requestCard.id = requestId;

  requestCard.innerHTML = `
    <div>
      <h3>${request.userId}</h3>
      <p>${request.date}, ${request.email}, ${request.phone}</p>
    </div>
    <div class="actions">
      <button class="accept-btn">Accept</button>
      <button class="reject-btn">Reject</button>
    </div>
  `;

  const acceptButton = requestCard.querySelector(".accept-btn");
  const rejectButton = requestCard.querySelector(".reject-btn");

  acceptButton.addEventListener("click", () => updateRequest(requestId, 'accepted'));
  rejectButton.addEventListener("click", () => updateRequest(requestId, 'rejected'));

  // Append the request card to the section
  requestsSection.appendChild(requestCard);
}

// Update the request status in Firestore and remove from the list
function updateRequest(requestId, status) {
  const requestRef = doc(db, "booking-request", requestId);
  updateDoc(requestRef, { status: status })
    .then(() => {
      console.log(`Request ${status}`);

      const requestCard = document.getElementById(requestId);
      if (requestCard) {
        requestCard.remove();
      }
    })
    .catch((error) => {
      console.error("Error updating request: ", error);
    });

  // Remove the request from the DOM
  const requestCard = document.getElementById(requestId);
  requestCard.remove();
}

// Load the requests when the page loads
window.onload = function() {
  fetchRequests();
};




const usersCollection = collection(db, 'users');

    // Fetch and display users
    async function fetchAndDisplayUsers() {
      const usersContainer = document.getElementById('users-container');
      usersContainer.innerHTML = ''; // Clear container

      try {
        const querySnapshot = await getDocs(usersCollection);
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userDiv = document.createElement('div');
          userDiv.textContent = `Name: ${userData.name}, Email: ${userData.email}, Phone: ${userData.phone}, address: ${userData.address}`;
          userDiv.style.marginBottom = '2vw';
          usersContainer.appendChild(userDiv);
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    // Call the function
    fetchAndDisplayUsers();



    const bookingsCollection = collection(db, 'booking-request');

    // Fetch and display bookings
    async function fetchAndDisplayBookings() {
      const bookingsContainer = document.getElementById('bookings-container');
      bookingsContainer.innerHTML = ''; // Clear container

      try {
        const querySnapshot = await getDocs(bookingsCollection);
        querySnapshot.forEach((doc) => {
          const bookingData = doc.data();
          const bookingDiv = document.createElement('div');
          bookingDiv.className = 'booking';
          bookingDiv.innerHTML = `
            <strong>Booking ID:</strong> ${bookingData.bookingId}<br>
            <strong>User ID:</strong> ${bookingData.userId}<br>
            <strong>Date:</strong> ${bookingData.date}<br>
            <strong>Phone:</strong> ${bookingData.phone}<br>
            <strong>Email:</strong> ${bookingData.email}<br>
            <strong>Status:</strong> ${bookingData.status}
          `;
          bookingsContainer.appendChild(bookingDiv);
        });
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }

    // Call the function to fetch and display bookings
    fetchAndDisplayBookings();
 