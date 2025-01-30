const admin = require("firebase-admin");

const serviceAccount = require("../service-hub-e4931-firebase-adminsdk-fbsvc-0f5cc632b6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
module.exports = admin;