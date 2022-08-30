import { Google } from '@mui/icons-material'
import {Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email:'',
  password: ''
}
export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth)

  const dispatch = useDispatch()

  const {  name, email, password, onInputChange, onResetForm,} = useForm(formData)

  const handleSubmit = (event)=>{
    event.preventDefault();
    dispatch( startLoginWithEmailPassword({email,password}) ); 
  }

  const isAuthenticating = useMemo( ()=> status === "checking", [status] )

  const onGoggleSignIn = ()=>{
    dispatch( startGoogleSignIn() );
    console.log('Google signin')
  }
  return (
      <AuthLayout title='Login'>
         <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Email"
                  type="email" 
                  placeholder='example@domain.com'
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField
                  label="Password"
                  type="password"
                  placeholder='Name'
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </Grid>

              <Grid container spacing={2} sx={{mb:2, mt:1}}>

              <Grid item xs={12} display={ !!errorMessage ? 'display':'none'}>
                  <Alert severity='error'>{errorMessage}</Alert>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    type="submit"
                    disabled={isAuthenticating}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    onClick={onGoggleSignIn} 
                    disabled={ isAuthenticating }
                  >
                    <Google/>
                    <Typography sx={{ml:1}}/> Google
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction='row' justifyContent='end'>
                <Link component={ RouterLink } color='inherit' to='/auth/register'>
                  Register
                </Link>
              </Grid>
            </Grid>
          </form>
      </AuthLayout>
  )
}
