import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./component/navbar"
import AddApplicationModal from './component/add'
import GetAllApplications from './component/all'
import Footer from './component/footer'
function App() {

  return (
<>
<Navbar/>
<AddApplicationModal/>
<GetAllApplications/>
<Footer/>
</>
    
  )
}

export default App
