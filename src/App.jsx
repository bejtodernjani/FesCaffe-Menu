import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import DesktopOverlay from './components/DesktopOverlay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import DrinksPage from './pages/DrinksPage'

export default function App() {
  return (
    <LanguageProvider>
      <DesktopOverlay />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/drinks" element={<DrinksPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  )
}
