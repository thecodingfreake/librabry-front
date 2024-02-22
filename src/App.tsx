import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import AddBook from './Pages/AddBook'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddBook />} />
    </Routes>
  </Router>
  )
}

export default App
