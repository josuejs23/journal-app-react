import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active:null,
        // active :{
        //     id:'123',
        //     title:'',
        //     body:'',
        //     date:12342,
        //     imageUrls:[] //https://foto1.jpg
        // }

    },
    reducers: {
        isSavingNewNote:(state)=>{
            // state.isSaving = !(state.isSaving);
            state.isSaving = true;
        },
        addNewEmptyNote: (state, {payload} ) => {
            state.notes.push(payload)
            state.isSaving = false ;
        },
        setActiveNote: (state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, {payload} ) => {
            state.notes = payload
        },
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, {payload} ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note =>{
                if(note.id === payload.id) {
                    return payload
                }
                return note;
            })
            state.messageSaved = `<b> ${payload.title} </b>, was succesfully updated.`
            state.isSaving = false;
        },
        setPhotosToActiveNote: (state, action)=>{
            state.active.imagesUrls = [...state.active.imagesUrls, ...action.payload]
            state.isSaving = false;
        },
        clearStoreLogout: (state, action)=>{
            state.isSaving = false;
            state.messageSave = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action ) => {
            state.notes = state.notes.filter( note => {
                if( note.id !== action.payload ){
                    return note;
                }
            })
            state.active = null;
        },
    }
});


export const { 
    setPhotosToActiveNote, 
    addNewEmptyNote, 
    deleteNoteById, 
    isSavingNewNote, 
    setActiveNote,
    setNotes, 
    setSaving, 
    updateNote, 
    clearStoreLogout
} = journalSlice.actions;