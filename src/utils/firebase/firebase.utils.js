import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {

    apiKey: "AIzaSyBVoVK8jkP2LYZeLOBS82rFuiUnK43WjH4",
  
    authDomain: "crwn-clothin-db-15c51.firebaseapp.com",
  
    projectId: "crwn-clothin-db-15c51",
  
    storageBucket: "crwn-clothin-db-15c51.firebasestorage.app",
  
    messagingSenderId: "243185486832",
  
    appId: "1:243185486832:web:1b4f7ea7a0b8a588c22b35",
  
    measurementId: "G-6XTMXCNVEF"
  
  };

 
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt =new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error)  {
        console.log('error creating the user', error.message)
      }
    }

    return userDocRef;
  }