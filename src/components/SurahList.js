import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Bookmark,
  Settings,
  Sun,
  Moon,
  Home,
  Layers,
  BookMarked,
  Grid3X3,
  Layout,
  ScrollText,
  Award,
  FileText,
  Menu,
} from 'lucide-react';
import '../App.css';

const Sidebar = ({
  setSearchQuery,
  bookmarks,
  setSelectedSurah,
  isDarkMode,
  toggleDarkMode,
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    navigate('/search');
    setIsSidebarOpen(false);
  };

  const handleBookmarkClick = (bookmark) => {
    setSelectedSurah({ number: bookmark.surah });
    navigate(`/ayah/${bookmark.surah}`);
    setIsSidebarOpen(false);
  };

  const navItems = [
    { title: 'Home', icon: <Home size={20} />, path: '/' },
    { title: 'Surahs', icon: <BookOpen size={20} />, path: '/surah' },
    { title: 'Juz', icon: <Layers size={20} />, path: '/juz/1' },
    { title: 'Manzil', icon: <Layout size={20} />, path: '/manzil/1' },
    { title: 'Ruku', icon: <Grid3X3 size={20} />, path: '/ruku/1' },
    { title: 'Page', icon: <FileText size={20} />, path: '/page/1' },
    { title: 'Hizb', icon: <ScrollText size={20} />, path: '/hizb/1' },
    { title: 'Sajda', icon: <Award size={20} />, path: '/sajda' },
    { title: 'Progress', icon: <BookMarked size={20} />, path: '/progress' },
  ];

  return (
    <div className="sidebar-container">
      <header className={`header ${isDarkMode ? 'dark' : ''}`}>
        <div className="header-logo">
          <button
            className="menu-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={20} />
          </button>
          <div className="app-title">Al Quran</div>
        </div>
        <div className="header-actions">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </form>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="main-container">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isDarkMode ? 'dark' : ''}`}>
          <nav className="nav-items">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className="nav-item"
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-title">{item.title}</span>
              </button>
            ))}
            <div className="bookmarks-section">
              <div className="bookmarks-header">
                <span className="nav-icon">
                  <Bookmark size={20} />
                </span>
                <span className="nav-title">Bookmarks</span>
              </div>
              {bookmarks.length > 0 ? (
                <div className="bookmarks-list">
                  {bookmarks.map((bookmark, index) => (
                    <button
                      key={index}
                      className="bookmark-item"
                      onClick={() => handleBookmarkClick(bookmark)}
                    >
                      Surah {bookmark.surah}:{bookmark.ayah}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="no-bookmarks">No Bookmarks</div>
              )}
            </div>
            <button
              onClick={() => {
                navigate('/settings');
                setIsSidebarOpen(false);
              }}
              className="nav-item settings-item"
            >
              <span className="nav-icon">
                <Settings size={20} />
              </span>
              <span className="nav-title">Settings</span>
            </button>
          </nav>
        </aside>
        <div
          className={`overlay ${isSidebarOpen ? 'visible' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <main className={`content-area ${isDarkMode ? 'dark' : ''}`}>
          <div className="content-wrapper">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;