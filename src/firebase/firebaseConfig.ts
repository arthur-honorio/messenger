
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBk8rE8nbIPFy-lhFsp9GV5NJyzmki-71Q",
    authDomain: "rav-messenger.firebaseapp.com",
    projectId: "rav-messenger",
    storageBucket: "rav-messenger.appspot.com",
    messagingSenderId: "783508704351",
    appId: "1:783508704351:web:91164dfda8c9ee7bd09fea",
    measurementId: "G-JZXQ87EHZ8",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
