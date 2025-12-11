import './App.css'
import './styles/animations.css'
import { Route, Routes } from 'react-router-dom'
import TopNav from './components/TopNav/TopNav'
import HeroSection from './components/HeroSection/HeroSection'
import LanguagesSection from './components/LanguagesSection/LanguagesSection'
import HelpSection from './components/HelpSection/HelpSection'
import ContactSection from './components/ContactSection/ContactSection'
import GermanTestsPage from './pages/GermanTestsPage'
import EnglishTestsPage from './pages/EnglishTestsPage'

function App() {
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

export default App
