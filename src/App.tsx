import './App.css'
import BuyerRegister from './pages/buyer/BuyerRegister'
import BuyerLogin from './pages/buyer/BuyerLogin'
import { Routes, Route, Navigate } from 'react-router'
import { useAuthContext } from './context/AuthContext'
import BuyerHome from './pages/buyer/BuyerHome'

function App() {

  const { user } = useAuthContext()

  return (
    <Routes>
      <Route path='buyer' element={user ? <BuyerHome /> : <Navigate to={"auth/buyer/login"}/>}/>
      <Route path='auth/buyer/login' element={!user ? <BuyerLogin /> : <Navigate to={"buyer"}/>}/>
      <Route path='auth/buyer/register' element={!user ? <BuyerRegister /> : <Navigate to={"buyer"}/>}/>
      <Route path='*' element={!user ? <Navigate to={"auth/buyer/login"}/> : <Navigate to={"buyer"}/>}/>
    </Routes>
  )
}

export default App
