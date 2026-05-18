import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import DrinksPage from './pages/DrinksPage'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/drinks" element={<DrinksPage />} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}
