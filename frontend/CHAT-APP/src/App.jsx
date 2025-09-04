import React, { useEffect } from 'react'
import "./index.css"
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import SignupPage from './pages/SignupPage'
import { useAuthStore } from './store/useAuthStore'
import {Toaster} from 'react-hot-toast'
import {useThemeStore} from './store/useThemeStore'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth} =useAuthStore();
   const {theme} = useThemeStore();
   
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",theme);
  },[theme])

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen bg-base-200'>
      <LoadingSpinner size="lg" text="Loading your chat..." />
    </div>
  )
  return (
    <ErrorBoundary>
      <div data-theme={theme}>
        <Navbar/>

        <Routes>
          <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
          <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to="/"/>} />
          <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>} />
          <Route path='/settings' element={<SettingPage/>} />
          <Route path='/profile' element={authUser ?<ProfilePage/>:<Navigate to="/login"/>} />
        </Routes>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--b1))',
              color: 'hsl(var(--bc))',
              border: '1px solid hsl(var(--b3))',
            },
            success: {
              iconTheme: {
                primary: 'hsl(var(--su))',
                secondary: 'hsl(var(--suc))',
              },
            },
            error: {
              iconTheme: {
                primary: 'hsl(var(--er))',
                secondary: 'hsl(var(--erc))',
              },
            },
          }}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App

