// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js");
// import store from "./../src/Vuex/store";
// const store = require("./../src/Vuex/store");
// import Vue from "vue";
var firebaseConfig = {
  messagingSenderId: "774534825243"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  let notification = JSON.parse(payload.data.content);
  // Customize notification here
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.content
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
