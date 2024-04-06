
const form = document.getElementById('contact-form');
const alert = document.querySelector(".alert");

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
  const analytics = getAnalytics(app);

  // Get a reference to the database service
  const database = firebase.database();
  const ref = database.ref("messages");



form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Get form data
  const contactName = document.getElementById('name').value;
  const contactEmail = document.getElementById('email').value;
  const contactPhone = document.getElementById('phone').value;
  const contactMessage = document.getElementById('message').value;

  ref.push({
    contactName:name,
    contactEmail:email,
    contactPhone:phone,
    contactMessage:message
  });

  alert.style.display="block";

  setTimeout(() => {
    alert.style.display="none";
  }, 5000);

  form.reset();

});
