import './App.css'
import './styles/animations.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TopNav from './components/TopNav/TopNav'
import HeroSection from './components/HeroSection/HeroSection'
import LanguagesSection from './components/LanguagesSection/LanguagesSection'
import HelpSection from './components/HelpSection/HelpSection'
import ContactSection from './components/ContactSection/ContactSection'
import GermanTestsPage from './pages/GermanTestsPage'
import EnglishTestsPage from './pages/EnglishTestsPage'
import { trackPageView } from './utils/metaPixel'

function AppContent() {
  const location = useLocation()

  useEffect(() => {
    trackPageView()
  }, [location.pathname])

  return (
    <div className="page">
      <TopNav />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <LanguagesSection />
                <HelpSection />
                <ContactSection />
              </>
            }
          />
          <Route path="/niemiecki" element={<GermanTestsPage />} />
          <Route path="/angielski" element={<EnglishTestsPage />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return <AppContent />
}

export default App
