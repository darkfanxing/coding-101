import Vue from 'vue'

import { rtdbPlugin } from 'vuefire'

import firebase from 'firebase/app'
import 'firebase/database'

Vue.use(rtdbPlugin)

const firebaseConfig = {
  apiKey: "AIzaSyCVAnHG8gArEKg6Fsha1lOzDOEak5hX2s0",
  authDomain: "factory-coding101.firebaseio.com/",
  databaseURL: "https://coding101-2c8e8.firebaseio.com",
  projectId: "coding101-a8967",
  storageBucket: "coding101-a8967.appspot.com",
  messagingSenderId: "107632168451",
  appId: "1:107632168451:web:15ed5fabcc3d6a748a4836",
  measurementId: "G-YZHT43H113"
};

export const db = firebase.initializeApp(firebaseConfig).database()