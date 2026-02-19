import React, { useState, useEffect, createContext } from 'react';
import Header from './components/Header';
import FooterMenu from './components/FooterMenu';
import CashCalculator from './components/CashCalculator';
import AgeCalculator from './components/AgeCalculator';
import IslamicFeatures from './components/IslamicFeatures';
import AlarmPage from './components/AlarmPage';
import Settings from './components/Settings';
import { AnimatePresence, motion } from 'framer-motion';

// Context for global state management
export const AppContext = createContext();

function App() {
  const [activeTab, setActiveTab] = useState('cash');
  const [language, setLanguage] = useState(localStorage.getItem('appLanguage') || 'bn');
  const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const renderContent = () => {
    // Passing language prop to components if they support it (future-proofing)
    // Though strict instructions prevent editing them now, this sets up the architecture.
    switch (activeTab) {
      case 'cash':
        return <CashCalculator language={language} />;
      case 'age':
        return <AgeCalculator language={language} />;
      case 'islamic':
        return <IslamicFeatures language={language} />;
      case 'alarm':
        return <AlarmPage />;
      case 'settings':
        return <Settings />; // Settings consumes context directly
      default:
        return <CashCalculator language={language} />;
    }
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme }}>
      <div className={`min-h-screen pb-24 relative transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-emerald-50 text-gray-900'}`}>
        <div className={`absolute inset-0 z-0 bg-gradient-to-b pointer-events-none transition-opacity duration-300 ${theme === 'dark' ? 'from-emerald-900/20 to-transparent' : 'from-emerald-100/50 to-transparent'}`} />

        <Header />

        <main className="container mx-auto px-4 max-w-2xl z-10 relative mt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <FooterMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
