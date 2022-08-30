import { DeleteForeverOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
  
  const dispatch = useDispatch();

  const { active, messageSaved, isSaving } = useSelector( state => state.journal);

  const formValidation = {
    'title' : [ (value)=> value.length > 0, 'Title should be greater than 0.' ],
    'body' : [ (value)=> value.length > 0, 'Body should be greater than 0.' ]
  }

  const fileInputRef = useRef()
  
  const { title, body, date, formState, onInputChange, isFormValid } = useForm(active, formValidation);

  const dateString = useMemo( ()=>{
    const newDate = new Date(date)
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
      
    dispatch( setActiveNote(formState) )

  }, [formState]);

  useEffect(() => {
    
    if(messageSaved.length > 0){
      Swal.fire('Updated',messageSaved,'success')
    }
  
  }, [messageSaved])
  

  const onSaveNote = () =>{
    dispatch(startSaveNote());
  }

  const onFileInputChange =({target})=>{
    if(target.files.length === 0) return;
    dispatch(startUploadingFiles(target.files));
  }

  const onDelete = () =>{
    dispatch(startDeletingNote())
    console.log('Deleted.')
  } 


  return (
      <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        sx={{mb:1}} alignItems='center' 
        className="animate__animated animate__fadeIn animate__faster"
      >
          <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
          </Grid>

          <input type="file" multiple onChange={onFileInputChange} ref={fileInputRef} style={{display:'none' }} />

          <IconButton color="primary" disabled={isSaving} onClick={()=>fileInputRef.current.click()} >
            <UploadOutlined/>
          </IconButton>

          <Grid>
              <Button disabled={isSaving} onClick={onSaveNote} color='primary' sx={{padding:2}}>
                  <SaveOutlined sx={{ fontSize:30, mr:1}}/>
                  Save
              </Button>
          </Grid>  
          <Grid container>
            <TextField
              type='text'
              variant='filled'
              fullWidth
              placeholder="Title"
              name='title'
              label='Title'
              sx={{border:'none',mb:1}}
              value={title}
              onChange={onInputChange}
            />
            <TextField
              type='text'
              variant='filled'
              fullWidth
              multiline
              name='body'
              placeholder="What happen today?"
              sx={{border:'none',mb:1}}
              value={body}
              onChange={onInputChange}
              minRows={5}
              />
          </Grid>

          <Grid container justifyContent="end">
            <IconButton onClick={onDelete} sx={{mt:2}} color="error">
              <DeleteForeverOutlined />
              Delete
            </IconButton>
          </Grid>
          <ImageGallery images={active.imagesUrls}/>
      </Grid>
  )
}
