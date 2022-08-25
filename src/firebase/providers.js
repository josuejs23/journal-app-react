import { GoogleAuthProvider, 
        signInWithPopup, 
        createUserWithEmailAndPassword,
        updateProfile, 
        signOut,
        signInWithEmailAndPassword
    } from 'firebase/auth';

import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const signInWithGoogle = async()=>{

    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider, );
        const {displayName, uid, email, photoURL} = result.user;

        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok:true,
            displayName,
            uid,
            email,
            photoURL
        }
    } catch(error){
        console.log(error)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
         
        return {
            ok:false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({email,password,displayName}) =>{
    try{
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const {uid, photoURL} = resp.user;

        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok:true,
            uid,
            photoURL
        }
    } catch(error){
        console.log(error.message);
        return { ok : false, errorMessage:error.message}
    }
}

export const loginWithEmailPassword = async ({email,password}) =>{
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth,email,password);
        console.log(resp.user)
        const { displayName, photoURL, uid } = resp.user;

        return {
            ok:true,
            displayName,
            uid
        }

    } catch (error){
        console.log(error.message);
        return {
            ok: false,
            errorMessage:error.message
        }
    }
}

export const signOutSession = async () =>{
   return await FirebaseAuth.signOut();
} 