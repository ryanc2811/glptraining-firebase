import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  getDoc
} from "firebase/firestore";
const firebaseConfig = {

    apiKey: "AIzaSyB0gLcFvObIW332zO6CVrhQZAqJreYn9wc",
  
    authDomain: "glpxllamally.firebaseapp.com",
  
    databaseURL: "https://glpxllamally-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "glpxllamally",
  
    storageBucket: "glpxllamally.appspot.com",
  
    messagingSenderId: "506800130205",
  
    appId: "1:506800130205:web:7f060057c8f69025416c74",
  
    measurementId: "G-Z1X27WZ3XC"
  
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      const privileges=[]
    const docRef=doc(db,"user_privileges","eh0Ki56hzby4mUcIimEr")
    const docSnap=await getDoc(docRef)
    
    if(docSnap.exists()){
      privileges.push(docSnap.id);
    }
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        privileges
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const privileges=[]
    const docRef=doc(db,"user_privileges","eh0Ki56hzby4mUcIimEr")
    const docSnap=await getDoc(docRef)
    
    if(docSnap.exists()){
      privileges.push(docSnap.id);
    }
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      privileges
    });
      // const member_data={
    //   user_id:user.uid
    // }

    // await addDoc(collection(db,"members"),member_data);

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

const create_new_team=async(company,team_members,manager_types,team_requests )=>{
 try {
    
    await addDoc(collection(db, "teams"), {
      team_members,
      manager_types,
      team_requests,
      company
    });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  create_new_team
};