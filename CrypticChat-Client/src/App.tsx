import { useEffect } from 'react'
import './App.css'
import Main from './components/Main'
import SideBar from './components/SideBar/SideBar'

function App() {
  useEffect(() => {
    if(window !== undefined){
      let privateKey = window.localStorage.getItem("private");
      if(!privateKey){
        window.localStorage.setItem("private", "key");
        console.log("We set a new private key")
      }
    }
    window.localStorage.setItem("Test", "hello");
   });

  return (
    <div className='flex flex-row w-screen h-screen'>
      <SideBar/>
      <Main/>
    </div>
  )
}

export default App