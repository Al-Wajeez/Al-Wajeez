// Import Firebase SDK
import firebase from 'firebase/app';
import 'firebase/firestore'; // Import specific Firebase services as needed

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCa9nNnl9InSidlTM0pTzDQ8UmAPKIJ6TM",
    authDomain: "al-wajeez.firebaseapp.com",
    projectId: "al-wajeez",
    storageBucket: "al-wajeez.appspot.com",
    messagingSenderId: "818986363364",
    appId: "1:818986363364:web:802162840b903db7777ff1",
    measurementId: "G-GHF2S5GKLV"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  const database = firebase.firestore();

  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const contactName = contactForm['contact-name'].value;
    const contactEmail = contactForm['contact-email'].value;
    const contactPhone = contactForm['contact-phone'].value;
    const contactMessage = contactForm['contact-message'].value;

    // Save data to Firebase
    database.ref('contacts').push({
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      message: contactMessage
    })
    .then(() => {
      // Data saved successfully
      console.log('Data saved to Firebase');
      // Optionally, you can redirect the user to a thank you page
    })
    .catch(error => {
      // Handle errors
      console.error('Error saving data to Firebase:', error);
    });
  });