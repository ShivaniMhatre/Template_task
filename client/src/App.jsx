import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {


  return (
    <BrowserRouter>
      
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
