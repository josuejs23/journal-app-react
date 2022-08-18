import { Google } from '@mui/icons-material'
import {Link as RouterLink} from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (
      <AuthLayout title='Register'>
        <form>
            <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Name"
                  type="text" 
                  placeholder='Your Name'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Email"
                  type="email" 
                  placeholder='example@domain.com'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField
                  label="Password"
                  type="password"
                  placeholder='Name'
                  fullWidth
                />
              </Grid>

              <Grid container spacing={2} sx={{mb:2, mt:1}}>
                <Grid item xs={12} sm={12}>
                  <Button variant="contained" fullWidth>
                    Login
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
