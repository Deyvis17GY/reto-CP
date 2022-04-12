import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import app from "services/firebase"
import { AuthProvider } from "context/AuthContext"
import { Home } from "pages/Home"
import { Login } from "pages/Login"
import { Candy } from "pages/Candy"
import { Navbar } from "components/Navbar"
import { Payment } from "pages/Payment"
function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/candy' element={<Candy />} />
            <Route path='/payment' element={<Payment />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
