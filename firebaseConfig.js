import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut ,
  setPersistence,
  browserLocalPersistence ,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  push,
  remove
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


// Configuração do Firebase (substitua os valores abaixo pelas suas credenciais)
// const firebaseConfig = {
//   apiKey: "AIzaSyBGFjDItITb129f_ukreQBmzCK6TeDLmi4",
//   authDomain: "materialyou.firebaseapp.com",
//   databaseURL: "https://materialyou-default-rtdb.firebaseio.com",
//   projectId: "materialyou",
//   storageBucket: "materialyou.firebasestorage.app",
//   messagingSenderId: "110911738690",
//   appId: "1:110911738690:web:cc9ed775260c7451bfaedb"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBQP0hwQXbgam7WMq-91aSyueDBAprJbm4",
  authDomain: "academiaapp-b3307.firebaseapp.com",
  databaseURL: "https://academiaapp-b3307-default-rtdb.firebaseio.com",
  projectId: "academiaapp-b3307",
  storageBucket: "academiaapp-b3307.firebasestorage.app",
  messagingSenderId: "113309959427",
  appId: "1:113309959427:web:a285dee1b3068f51551536"
};



// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Inicializa o Firebase
let persistenceInitialized = false;

async function initializeAuthPersistence() {
  if (!persistenceInitialized) {
    try {
      await setPersistence(auth, browserLocalPersistence);
      persistenceInitialized = true;
      console.log("Persistência de autenticação inicializada.");
    } catch (error) {
      console.error("Erro ao inicializar a persistência de autenticação:", error);
      throw error; // Rejeitar a promise para que o chamador saiba do erro
    }
  }
}

 const getCurrentUser = async () => {
  if (!persistenceInitialized) {
    await initializeAuthPersistence();
  }
  return auth.currentUser;
}

//  const getUID = async () => {
//   if (!persistenceInitialized) {
//     await initializeAuthPersistence();
//   }
//   return auth.currentUser.uid;
// }

// const getUID = async () => {
//   if (!persistenceInitialized) {
//     return initializeAuthPersistence().then(() => {
//       return auth.currentUser.uid;
//     });
//   } else {
//     return Promise.resolve(auth.currentUser.uid);
//   }
// }

const getUID = async () => {
  if (!persistenceInitialized) {
    await initializeAuthPersistence();
  }
  
  return auth.currentUser?.uid || null; // Retorna null se auth.currentUser for undefined
};



 
// Exporta os módulos e funções para uso nos outros scripts
export {
	app,
	database,
	auth,
	onAuthStateChanged,
	signOut,
	setPersistence,
	browserLocalPersistence,
	ref,
	set,
	get,
	push,
	remove,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
  getUID,
  getCurrentUser
 
};
