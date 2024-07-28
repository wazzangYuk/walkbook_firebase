const functions = require("firebase-functions");
const admin = require("firebase-admin")
const auth = require("firebase-auth")

var serviceAccount = require("./walkbook-b3b3e-firebase-adminsdk-thjdi-b2a9d0b4a7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.createCustomToken = functions.https.onCall(async (data, context) => {
    const uid = data.uid;
    console.log(data);

    try {
        const customToken = await admin.auth().createCustomToken(uid);
        return { token: customToken };
    } catch (error) {
        console.error("Error creating custom token:", error);
        throw new HttpsError("Error creating custom token", error);
    }
});
