import { Box } from '@mui/material'
import './App.css'
import Home from './Pages/Home'
import styled from '@emotion/styled'
import {Routes,Route }  from 'react-router-dom'
import Edit from './Pages/Edit'
import Create from './Pages/Create'
import axios from 'axios'

const MainWrapper=styled(Box)({
  marginTop:'20px'
})
axios.defaults.baseURL = import.meta.env.VITE_PORT;

function App() {

  return (
    <MainWrapper >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/edit' element={<Edit/>} />
      </Routes>
    </MainWrapper>
  )
}

export default App
