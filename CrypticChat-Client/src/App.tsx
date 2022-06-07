import { Route, Routes } from 'react-router-dom'
import './App.css'
import RequireAuth from './components/auth/RequireAuth'
import Layout from './components/Layout/Layout'
import Register from './components/Register'
import Login from './components/login'
import Chat from './components/SideBar/Chat'
import Add from './components/Add'
import Welcome from './components/Welcome'
import { useEffect } from 'react'
import { useAppSelector } from './redux/hooks'
import { useDispatch } from 'react-redux'
import agent from './lib/agent'
import { loginUser, logout } from './redux/slices/userSlice'
import {UserDetails} from "./lib/models/UserDetails";

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    if(user.token){
      agent.Account.current().then((d: UserDetails) => dispatch(loginUser(d)))
    }
    else{
      dispatch(logout())
    }
  },[user.token])

  return (
    <div className='flex flex-row w-screen h-screen'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<RequireAuth children={<Layout />}/>}>
            <Route path="/Welcome" element={<Welcome />}/>
            <Route index element={<Chat />}/> 
            <Route path="add" element={<Add />}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App