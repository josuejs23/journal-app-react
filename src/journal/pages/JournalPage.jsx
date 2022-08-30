import { AddOutlined, PlusOne } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startLoadingNotes, startNewNote } from '../../store/journal'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, active } = useSelector( state => state.journal );

  const onClickNewNote= () =>{
    dispatch(startNewNote());
    console.log('Journal Page handleNewNote()')
  }

  return (
    <JournalLayout>
      {
        (!!active) 
        ? <NoteView/>
        : <NothingSelectedView/>
      }

      <IconButton
        size='large'
        sx={{
          color:'white',
          backgroundColor:'error.main',
          ':hover':{backgroundColor:'error.main',opacity:0.9},
          position:'fixed',
          right:50,
          bottom:50
        }}
        disabled={isSaving}
        onClick={onClickNewNote}
      >
        <AddOutlined sx={{fontSize:30}}/>
      </IconButton>
    </JournalLayout>

    
  )
}
