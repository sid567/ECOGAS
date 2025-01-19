


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


    const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();


  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userId = user.uid; // Logged-in user's unique ID
      const bookingContainer = document.getElementById("booking-container");

      try {
        const querySnapshot = await db
          .collection("booking-request")
          .where("userId", "==", userId) // Filter bookings by userId
          .get();

        if (querySnapshot.empty) {
          bookingContainer.innerHTML = "<p>No bookings found.</p>";
        } else {
          let bookingsHTML = "<ul>";
          querySnapshot.forEach((doc) => {
            const booking = doc.data();
            bookingsHTML += `<li>Booking ID: ${doc.id}, Date: ${booking.date}, Details: ${booking.details}</li>`;
          });
          bookingsHTML += "</ul>";
          bookingContainer.innerHTML = bookingsHTML;
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        bookingContainer.innerHTML = "<p>Failed to load bookings.</p>";
      }
    } else {
      // User not logged in
      window.location.href = "sign_in.html"; // Redirect to login page
    }
  });