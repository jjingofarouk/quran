import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Bookmark,
  Settings,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Home,
  Layers,
  BookMarked,
  Grid3X3,
  Layout,
  ScrollText,
  Award,
  FileText,
} from 'lucide-react';
import './App.css'; // Import App.css instead of Sidebar.css

const Sidebar = ({
  setView,
  setSearchQuery,
  bookmarks,
  setSelectedSurah,
  isDarkMode,
  toggleDarkMode,
  children, // Add children prop
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInput);
      setView('search');
      setShowSearchBar(false);
    }
  };

  const handleBookmarkClick = (bookmark) => {
    setSelectedSurah({ number: bookmark.surah });
    setView('ayah');
  };

  const navItems = [
    { title: 'Home', icon: <Home />, view: 'home' },
    { title: 'Surahs', icon: <BookOpen />, view: 'surah' },
    { title: 'Juz', icon: <Layers />, view: 'juz' },
    { title: 'Manzil', icon: <Layout />, view: 'manzil' },
    { title: 'Ruku', icon: <Grid3X3 />, view: 'ruku' },
    { title: 'Page', icon: <FileText />, view: 'page' },
    { title: 'Hizb', icon: <ScrollText />, view: 'hizb' },
    { title: 'Sajda', icon: <Award />, view: 'sajda' },
    { title: 'Progress', icon: <BookMarked />, view: 'progress' },
  ];

  return (
    <div className="sidebar-container">
      {/* Header - Always visible */}
      <header className={`header ${isDarkMode ? 'dark' : ''}`}>
        <div className="header-logo">
          <div className="app-title">Wuran</div>
        </div>
        <div className="header-actions">
          {showSearchBar ? (
            <div className="search-container">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleSearch}
                placeholder="Search..."
                className="search-input"
                autoFocus
              />
              <button
                onClick={() => setShowSearchBar(false)}
                className="search-close-btn"
              >
                ×
              </button>
            </div>
          ) : (
            <button onClick={() => setShowSearchBar(true)} className="icon-button">
              <Search size={20} />
            </button>
          )}
          <button onClick={toggleDarkMode} className="icon-button">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'} ${isDarkMode ? 'dark' : ''}`}>
          {/* Toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="toggle-button"
          >
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* Navigation Items */}
          <nav className="nav-items">
            {navItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setView(item.view)}
                className="nav-item"
              >
                <div className="nav-icon">{item.icon}</div>
                {isExpanded && <span className="nav-title">{item.title}</span>}
              </div>
            ))}

            {/* Bookmarks Section */}
            <div className="bookmarks-section">
              <div className="bookmarks-header">
                <div className="nav-icon">
                  <Bookmark />
                </div>
                {isExpanded && <span className="nav-title">Bookmarks</span>}
              </div>

              {isExpanded && bookmarks.length > 0 && (
                <div className="bookmarks-list">
                  {bookmarks.map((bookmark, index) => (
                    <div
                      key={index}
                      className="bookmark-item"
                      onClick={() => handleBookmarkClick(bookmark)}
                    >
                      Surah {bookmark.surah}:{bookmark.ayah}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Settings at bottom */}
          <div
            onClick={() => setView('settings')}
            className="settings-button"
          >
            <div className="nav-icon">
              <Settings />
            </div>
            {isExpanded && <span className="nav-title">Settings</span>}
          </div>
        </aside>

        {/* Content area */}
        <main className={`content-area ${isDarkMode ? 'dark' : ''}`}>
          <div className="content-wrapper">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;