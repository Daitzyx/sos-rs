import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCLvGan7WZoHZ6s6fbEUUlHCq7uW9BaVAU',
  authDomain: 'sos-rs.firebaseapp.com',
  projectId: 'sos-rs',
  storageBucket: 'sos-rs.appspot.com',
  messagingSenderId: '100834238131',
  appId: '1:100834238131:web:8450ca091d879bfcd81ac6',
  measurementId: 'G-DL0XMP2121'
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { app, db }

