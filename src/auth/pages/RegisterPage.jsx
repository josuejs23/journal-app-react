import { Google } from '@mui/icons-material'
import {Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, {useState, useMemo} from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formValidations = {
  email: [ (value)=> value.includes('@'), 'Email must have a @.' ],
  password: [ (value)=> value.length >= 6, 'Password must be larger than 6 characters.'],
  displayName: [ (value)=>value.length >= 1, 'Name must be larger than 1 character.'],
}


const formData = {
  email: '',
  password: '',
  displayName: ''
}


export const RegisterPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth);
  const isCheckingAuthentication = useMemo( ()=> status === 'checking', [status])


  const {  formState, displayName, email, password, onInputChange, 
          isFormValid, displayNameValid, emailValid, passwordValid, } = useForm(formData, formValidations);

  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);
  
  // console.log(`%cForm valid ${isFormValid}`,'color:green; font-family:monospace')
  const onSubmit = (event)=>{
    event.preventDefault();
    setSubmitted(true)

    if(!isFormValid) return;

    console.log(formState )
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
      <AuthLayout title='Register'>
        <h2>FormValid { (isFormValid) ? 'Yes' : 'No'}</h2>
        <form onSubmit={onSubmit } className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Name" 
                  type="text" 
                  placeholder='Your Name'
                  name="displayName"
                  value={displayName}
                  onChange={onInputChange}
                  error={!!displayNameValid && submitted}
                  helperText={displayNameValid}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Email"
                  type="email" 
                  placeholder='example@domain.com'
                  name="email"
                  onChange={onInputChange}
                  value={email}
                  error={!!emailValid && submitted }
                  helperText={emailValid}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField
                  label="Password"
                  type="password"
                  onChange={onInputChange}
                  name="password"
                  value={password}
                  error={!!passwordValid && submitted}
                  helperText={passwordValid}
                  fullWidth
                />
              </Grid>

              <Grid container spacing={2} sx={{mb:2, mt:1}}>
                
                <Grid item xs={12} display={ !!errorMessage ? 'display':'none'}>
                  <Alert severity='error'>{errorMessage}</Alert>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    type="submit"
                    disabled={isCheckingAuthentication}
                  >
                    Register
                  </Button>
                </Grid>
                
              </Grid>
              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{mr:1}}>Have an account already?</Typography>
                <Link component={ RouterLink } color='inherit' to='/auth/login'>
                  Login
                </Link>
              </Grid>
            </Grid>
          </form>
      </AuthLayout>
  )
}
