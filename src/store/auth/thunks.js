import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, signOutSession } from "../../firebase/providers";
import { clearStoreLogout } from "../journal";
import { checkingCredentials, logout, login } from "./authSlice"

export const checkingAuthentication = ( email, password ) =>{

    return async (dispatch) =>{
        dispatch( checkingCredentials() );
    }

}

export const startGoogleSignIn = () =>{

    return async(dispatch) =>{
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if(!result.ok) dispatch(logout(result.errorMessage))

        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({email,password, displayName }) =>{

    return async(dispatch)=>{

        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email,password, displayName });
        if(!ok) return dispatch(logout({errorMessage})); 

        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLoginWithEmailPassword = ({email, password}) =>{

    return async(dispatch)=>{

        dispatch(checkingCredentials());
        
        const { ok, errorMessage, displayName, uid, photoURL } = await loginWithEmailPassword({email,password});
        if(!ok) return dispatch(logout({errorMessage})); 

        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startSignOutSession = ()=>{
    return async(dispatch)=>{
        await signOutSession();
        dispatch(logout({errorMessage:null, uid:null})); 
        dispatch(clearStoreLogout());
    }
}