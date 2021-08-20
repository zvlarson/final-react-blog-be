const admin = require('firebase-admin')
const serviceAccount = require('../src/credentials.json')

exports.connectFirestore = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }
  return admin.firestore()
}
