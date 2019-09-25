import firebase from 'firebase'
const config = {
  // apiKey: "AIzaSyDSo5OxmGOKelOaCUym2A_8Xak2Eu3i8IY",
  // authDomain: "eventit-38374.firebaseapp.com",
  // databaseURL: "https://eventit-38374.firebaseio.com",
  // projectId: "eventit-38374",
  // storageBucket: "eventit-38374.appspot.com",
  // messagingSenderId: "254809571333"

  apiKey: "AIzaSyB73jEyvdXgtw_xnACXHDgUWPhPrqU-A-g",
  authDomain: "event-it-1557523800516.firebaseapp.com",
  databaseURL: "https://event-it-1557523800516.firebaseio.com",
  projectId: "event-it-1557523800516",
  storageBucket: "event-it-1557523800516.appspot.com",
  messagingSenderId: "650252001184",
  appId: "1:650252001184:web:941e88710603a64e"
}
firebase.initializeApp(config)
export const auth = firebase.auth()
export default firebase