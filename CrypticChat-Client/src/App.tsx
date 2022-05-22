import './App.css'
import Main from './components/Main'
import SideBar from './components/SideBar/SideBar'

function App() {
  return (
    <div className='flex flex-row w-screen h-screen'>
      <SideBar/>
      <Main/>
    </div>
  )
}

export default App