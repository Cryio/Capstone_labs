import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Moon, Sun, Flower, Target, Brain, Clock, BarChart2, Gift, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ZenGarden from './components/ZenGarden';
import AIChat from './components/AIChat';
import Notes from './components/Notes';
import FocusMode from './components/FocusMode';
import Analytics from './components/Analytics';
import Rewards from './components/Rewards';
import AboutUs from './components/AboutUs';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme class to body
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'zenGarden':
        return <ZenGarden />;
      case 'aiChat':
        return <AIChat />;
      case 'notes':
        return <Notes />;
      case 'focusMode':
        return <FocusMode />;
      case 'analytics':
        return <Analytics />;
      case 'rewards':
        return <Rewards />;
      case 'about':
        return <AboutUs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Mobile Header */}
        <div className={`md:hidden flex justify-between items-center p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>Zen AI Habit Tracker</h1>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full">
              {isDarkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-blue-600" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-full">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar for desktop */}
          <aside className={`hidden md:flex flex-col w-64 h-screen fixed ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="p-5">
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>Zen AI Habit Tracker</h1>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-2 p-4">
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    <Target className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('zenGarden')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'zenGarden' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    <Flower className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                    <span>Zen Garden</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('aiChat')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'aiChat' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    <Brain className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                    <span>AI Chat</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'notes' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 11h4"></path>
                      <path d="M12 15h4"></path>
                      <path d="M8 11v4"></path>
                      <path d="M20 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"></path>
                    </svg>
                    <span>Notes</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('focusMode')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'focusMode' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    <Clock className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                    <span>Focus Mode</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'analytics' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    <BarChart2 className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                    <span>Analytics</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('rewards')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'rewards' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    <Gift className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                    <span>Rewards</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'about' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                    <span>About Us</span>
                  </button>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center justify-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="mr-2 text-yellow-300" size={20} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 text-blue-600" size={20} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden fixed inset-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <h1 className={`text-xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>Zen AI Habit Tracker</h1>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto">
                  <ul className="space-y-2 p-4">
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab('dashboard');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                      >
                        <Target className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                        <span>Dashboard</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab('zenGarden');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'zenGarden' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                      >
                        <Flower className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                        <span>Zen Garden</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab('aiChat');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'aiChat' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                      >
                        <Brain className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                        <span>AI Chat</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab('notes');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'notes' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 11h4"></path>
                          <path d="M12 15h4"></path>
                          <path d="M8 11v4"></path>
                          <path d="M20 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"></path>
                        </svg>
                        <span>Notes</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab('focusMode');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'focusMode' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                      >
                        <Clock className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                        <span>Focus Mode</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab('analytics');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'analytics' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                      >
                        <BarChart2 className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                        <span>Analytics</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab('rewards');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'rewards' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                      >
                        <Gift className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} size={20} />
                        <span>Rewards</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab('about');
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'about' ? (isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`mr-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                        <span>About Us</span>
                      </button>
                    </li>
                  </ul>
                </nav>
                <div className="p-4 border-t border-gray-700">
                  <button
                    onClick={toggleTheme}
                    className={`w-full flex items-center justify-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="mr-2 text-yellow-300" size={20} />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 text-blue-600" size={20} />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="md:ml-64 flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;