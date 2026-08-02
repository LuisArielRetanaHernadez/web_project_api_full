import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import AppContext from './context/ApiContext'
import Login from './components/Login'
import Register from './components/Regster'
import Profile from './components/Profile'
import ProtectdRoute from './components/ProtectRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import { getToken } from './utils/token'
import { getUserInfo } from './utils/auth'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const jwt = getToken()

    if (!jwt) {
      return
    }

    const checkUser = async () => {
      const user = await getUserInfo(jwt)
      if (!user) {
        setIsLoggedIn(false)
      }
      setIsLoggedIn(true)
    }

    checkUser()
  }, [])

  return (
    <div className='page'>
      <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Header />
        <Routes>
          <Route path='/' element={
            <ProtectdRoute>
              <Profile />
            </ProtectdRoute>
          } />
          <Route path='/login' element={
            <ProtectdRoute anonymous>
              <Login />
            </ProtectdRoute>
          } />
          <Route path='/register' element={
            <ProtectdRoute anonymous>
              <Register />
            </ProtectdRoute>
          } />

        </Routes>
        <Footer />
      </AppContext.Provider>
    </div>
  )
}

export default App
