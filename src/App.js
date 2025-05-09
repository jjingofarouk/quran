import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

  const toggleDarkMode = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    const savedNotes = localStorage.getItem('notes');
    const savedProgress = localStorage.getItem('progress');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedProgress) setProgress(JSON.parse(savedProgress));
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [bookmarks, notes, progress]);

  return (
    <Router>
      <div className={`app-container ${settings.theme}`}>
        <Sidebar
          setSearchQuery={setSearchQuery}
          bookmarks={bookmarks}
          setSelectedSurah={setSelectedSurah}
          isDarkMode={settings.theme === 'dark'}
          toggleDarkMode={toggleDarkMode}
        >
          <div className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <SurahList
                    setSelectedSurah={setSelectedSurah}
                    editions={editions}
                  />
                }
              />
              <Route
                path="/ayah/:surahNumber"
                element={
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
                  />
                }
              />
              <Route
                path="/juz/:juzNumber"
                element={
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
                  />
                }
              />
              <Route
                path="/manzil/:manzilNumber"
                element={
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
                  />
                }
              />
              <Route
                path="/ruku/:rukuNumber"
                element={
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
                  />
                }
              />
              <Route
                path="/page/:pageNumber"
                element={
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
                  />
                }
              />
              <Route
                path="/hizb/:hizbNumber"
                element={
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
                  />
                }
              />
              <Route
                path="/sajda"
                element={
                  <SajdaView
                    editions={editions}
                    settings={settings}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                    notes={notes}
                    setNotes={setNotes}
                    progress={progress}
                    setProgress={setProgress}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <SearchView
                    query={searchQuery}
                    editions={editions}
                    settings={settings}
                    setSelectedSurah={setSelectedSurah}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <Settings
                    editions={editions}
                    setEditions={setEditions}
                    settings={settings}
                    setSettings={setSettings}
                  />
                }
              />
              <Route
                path="/progress"
                element={
                  <ProgressTracker
                    progress={progress}
                    setProgress={setProgress}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Sidebar>
      </div>
    </Router>
  );
}

export default App;