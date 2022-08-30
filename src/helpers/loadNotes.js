import { collection, query, where, getDocs } from "firebase/firestore/lite ";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async (uid) =>{

    try{
        console.log('========LOADING NOTES=============')
        // return await getDocs(collection(FirebaseDB, `${uid}/journal/notes`));
        const querySnapshot = await getDocs(collection(FirebaseDB, `${uid}/journal/notes`));
        
        const notes = [];
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            notes.push({id:doc.id, ...doc.data()});
        });

        return notes;
    } catch(error){
        console.log(error)
    }
}