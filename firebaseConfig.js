require("dotenv").config();

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDz-FQ49XyDSNNh-y9bwkqQjNeULQkzkW0",
  authDomain: "wines-545ff.firebaseapp.com",
  projectId: "wines-545ff",
  storageBucket: "wines-545ff.appspot.com",
  messagingSenderId: "886700377552",
  appId: "1:886700377552:web:86db3364ad6bbdf7a0a5d5",
  measurementId: "G-H7J46QY2WH",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

const usersCollection = collection(firestore, "users");

// const allUsers = await getDocs(usersCollection);

const getUserByUserId = async (userID) => {
  const userDocument = doc(firestore, 'users', userID);
  const userSnapshot = await getDoc(userDocument);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.log('Користувача не знайдено');
    return null;
  }
};

// Отримання конкретного документа
// const docSnapshot = await getDoc(myDocument);

// if (docSnapshot.exists()) {
//   console.log(`${docSnapshot.id} => ${JSON.stringify(docSnapshot.data())}`);
// } else {
//   console.log("Документ не знайдено");
// }

// Додавання документа до колекції
// const docRef = await addDoc(usersCollection, { name: "John Doe" });

module.exports = { db: firestore, storage, usersCollection, getUserByUserId };
