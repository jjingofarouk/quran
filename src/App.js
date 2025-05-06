import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SurahList from './components/SurahList';
import AyahView from './components/AyahView';
import JuzView from './components/JuzView';
import ManzilView from './components/ManzilView';
import RukuView from './components/RukuView';
import PageView from './components/PageView';
import HizbQuarterView from './components/HizbQuarterView';
import SajdaView from './components/SajdaView';
import SearchView from './components/SearchView';
import Settings from './components/Settings';
import ProgressTracker from './components/ProgressTracker';
import './App.css';

function App() {
  const [view, setView] = useState('surah');
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedJuz, setSelectedJuz] = useState(null);
  const [selectedManzil, setSelectedManzil] = useState(null);
  const [selectedRuku, setSelectedRuku] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedHizb, setSelectedHizb] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editions, setEditions] = useState(['quran-uthmani', 'en.asad']);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    theme: 'light',
    showTajweed: false,
  });
  const [progress, setProgress] = useState({});

  // Dark mode toggle function
  const toggleDarkMode = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  useEffect(() => {
    // Load saved data from localStorage
    const savedBookmarks = localStorage.getItem('bookmarks');
    const savedNotes = localStorage.getItem('notes');
    const savedProgress = localStorage.getItem('progress');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedProgress) setProgress(JSON.parse(savedProgress));
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [bookmarks, notes, progress]);

  return (
    <div className={`app-container ${settings.theme}`}>
      <Sidebar
        setView={setView}
        setSearchQuery={setSearchQuery}
        bookmarks={bookmarks}
        setSelectedSurah={setSelectedSurah}
        isDarkMode={settings.theme === 'dark'}
        toggleDarkMode={toggleDarkMode}
      >
        <div className="main-content">
          {view === 'home' && (
            <div className="welcome-message">
              <h1>Welcome to Wuran</h1>
              <p>Select a section from the sidebar to begin exploring the Quran.</p>
            </div>
          )}
          {view === 'surah' && (
            <SurahList
              setSelectedSurah={setSelectedSurah}
              setView={setView}
              editions={editions}
            />
          )}
          {view === 'ayah' && (
            <AyahView
              surah={selectedSurah}
              editions={editions}
              settings={settings}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              notes={notes}
              setNotes={setNotes}
              progress={progress}
              setProgress={setProgress}
              setView={setView}
            />
          )}
          {view === 'juz' && (
            <JuzView
              selectedJuz={selectedJuz}
              setSelectedJuz={setSelectedJuz}
              editions={editions}
              settings={settings}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              notes={notes}
              setNotes={setNotes}
              progress={progress}
              setProgress={setProgress}
              setView={setView}
            />
          )}
          {view === 'manzil' && (
            <ManzilView
              selectedManzil={selectedManzil}
              setSelectedManzil={setSelectedManzil}
              editions={editions}
              settings={settings}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              notes={notes}
              setNotes={setNotes}
              progress={progress}
              setProgress={setProgress}
              setView={setView}
            />
          )}
          {view === 'ruku' && (
            <RukuView
              selectedRuku={selectedRuku}
              setSelectedRuku={setSelectedRuku}
              editions={editions}
              settings={settings}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              notes={notes}
              setNotes={setNotes}
              progress={progress}
              setProgress={setProgress}
              setView={setView}
            />
          )}
          {view === 'page' && (
            <PageView
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              editions={editions}
              settings={settings}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              notes={notes}
              setNotes={setNotes}
              progress={progress}
              setProgress={setProgress}
              setView={setView}
            />
          )}
          {view === 'hizb' && (
            <HizbQuarterView
              selectedHizb={selectedHizb}
              setSelectedHizb={setSelectedHizb}
              editions={editions}
              settings={settings}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              notes={notes}
              setNotes={setNotes}
              progress={progress}
              setProgress={setProgress}
              setView={setView}
            />
          )}
          {view === 'sajda' && (
            <SajdaView
              editions={editions}
              settings={settings}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              notes={notes}
              setNotes={setNotes}
              progress={progress}
              setProgress={setProgress}
              setView={setView}
            />
          )}
          {view === 'search' && (
            <SearchView
              query={searchQuery}
              editions={editions}
              settings={settings}
              setView={setView}
              setSelectedSurah={setSelectedSurah}
            />
          )}
          {view === 'settings' && (
            <Settings
              editions={editions}
              setEditions={setEditions}
              settings={settings}
              setSettings={setSettings}
            />
          )}
          {view === 'progress' && (
            <ProgressTracker
              progress={progress}
              setProgress={setProgress}
              setView={setView}
            />
          )}
        </div>
      </Sidebar>
    </div>
  );
}

export default App;