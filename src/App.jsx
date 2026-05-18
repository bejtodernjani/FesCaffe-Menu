import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Preloader from './components/Preloader'
import DesktopOverlay from './components/DesktopOverlay'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import DrinksPage from './pages/DrinksPage'

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(
    () => sessionStorage.getItem('preloaderShown') === '1'
  )

  function handlePreloaderDone() {
    sessionStorage.setItem('preloaderShown', '1')
    setPreloaderDone(true)
  }

  return (
    <LanguageProvider>
      {!preloaderDone && <Preloader onDone={handlePreloaderDone} />}
      <DesktopOverlay />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/drinks" element={<DrinksPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
