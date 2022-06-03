import { Route, Routes } from 'react-router-dom'
import './App.css'
import RequireAuth from './components/auth/RequireAuth'
import Layout from './components/Layout/Layout'
import Main from './components/Main'
import Register from './components/Register'
import SideBar from './components/SideBar/SideBar'
import Login from './components/login'
import Chat from './components/SideBar/Chat'
import Add from './components/Add'
import Welcome from './components/Welcome'

function App() {
  return (
    <div className='flex flex-row w-screen h-screen'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />}/>
            <Route path=':id' element={<Chat/>}/> 
            <Route path="add" element={<Add/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App