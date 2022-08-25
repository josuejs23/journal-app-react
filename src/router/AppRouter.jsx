import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {

  const  status = useCheckAuth();

  console.log('Status =====>', status)

  if(status === "checking") return <CheckingAuth/>

  return (
    <Routes>

        {(status === "authenticated" )
          ? <Route path="/*" element={<JournalRoutes/>}/>
          :  <Route path="/auth/*" element={<AuthRoutes/>}/>
        }
         
        <Route path="/*" element={<Navigate to="/auth/login" />}/>
    </Routes>
  )
}
