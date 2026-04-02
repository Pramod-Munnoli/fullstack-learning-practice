import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListingDetails from './pages/ListingDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { FlashProvider } from './context/FlashContext'


function App() {
  return (
    <Router>
      <FlashProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings/new" element={<CreateListing />} />
              <Route path="/listings/:id/edit" element={<EditListing />} />
              <Route path="/listings/:id" element={<ListingDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FlashProvider>
    </Router>
  )
}

export default App
