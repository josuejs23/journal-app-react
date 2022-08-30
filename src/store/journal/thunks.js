
import { collection, doc, setDoc, deleteDoc} from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEmptyNote, isSavingNewNote, setActiveNote, setNotes, setSaving, updateNote,setPhotosToActiveNote, deleteNoteById } from './journalSlice';

export const startNewNote = (uid) =>{

    return async (dispatch, getState) =>{

        dispatch(isSavingNewNote());
        const { uid  } = getState().auth;
        const newNote = {
            title : '',
            body  : '',
            date : new Date().getTime(),
            imagesUrls : []
        }

        const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notes`) );
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
        // dispatch(setNotes(newNote));

    }
}

export const startLoadingNotes = (uid) =>{

    return async(dispatch, getState) =>{

        const { uid } = getState().auth;
        if(!uid) throw new Error('Must provide the User Id')
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = ()=>{

    return async(dispatch, getState)=>{

        dispatch(setSaving())
        const { active:note } = getState().journal;
        const { uid } = getState().auth;
    
        const noteToFireStore = { ...note }
        delete noteToFireStore.id;
    
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef,noteToFireStore), {merge:true};
        dispatch(updateNote(note));
    }

} 

export const startUploadingFiles = (files = []) =>{

    return async(dispatch, getState) =>{
        const { active:note } = getState().journal;
        dispatch(setSaving());
        const fileUploadPromises = [];
        for(const file of files) {
            fileUploadPromises.push( fileUpload(file))
        }
        const imagesUrls = await Promise.all( fileUploadPromises );
        dispatch(setPhotosToActiveNote(imagesUrls))
        // console.log(photosUrls);
    }
}

export const startDeletingNote = () =>{

    return async(dispatch, getState) =>{

        const { active:note } = getState().journal;
        const { uid } = getState().auth;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));

    }
}