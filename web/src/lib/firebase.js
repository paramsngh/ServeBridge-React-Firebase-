import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'


export const firebaseConfig = {

  apiKey: "AIzaSyB42NMRU-BRKX-ggPFdbTYtogqDVPPWb_g",

  authDomain: "volunteer-finder-pc.firebaseapp.com",

  projectId: "volunteer-finder-pc",

  storageBucket: "volunteer-finder-pc.firebasestorage.app",

  messagingSenderId: "712225836366",

  appId: "1:712225836366:web:e9b90bbd2a9976273be21f"

};



const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)

export const fn = {
  createOpportunity: httpsCallable(functions, 'createOpportunity'),
  applyToOpportunity: httpsCallable(functions, 'applyToOpportunity'),
  reviewApplication: httpsCallable(functions, 'reviewApplication'),
}
