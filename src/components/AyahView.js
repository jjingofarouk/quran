import React, { useState, useEffect, useRef } from 'react';

function AyahView({ surah, editions, settings, bookmarks, setBookmarks, notes, setNotes, progress, setProgress, setView }) {
  const [ayahs, setAyahs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    const editionString = editions.join(',');
    const fetchAyahs = async () => {
      try {
        const res = await fetch(`http://api.alquran.cloud/v1/surah/${surah.number}/editions/${editionString}`);
        const data = await res.json();
        setAyahs(data.data);
        // Cache for offline
        localStorage.setItem(`surah_${surah.number}_${editionString}`, JSON.stringify(data));
      } catch (e) {
        const cached = localStorage.getItem(`surah_${surah.number}_${editionString}`);
        if (cached) setAyahs(JSON.parse(cached).data);
      }
    };

    const audioEdition = editions.find(ed => ed.includes('alafasy'));
    if (audioEdition) {
      fetch(`http://api.alquran.cloud/v1/surah/${surah.number}/${audioEdition}`)
        .then(res => res.json())
        .then(data => setAudio(data.data.ayahs));
    }

    fetchAyahs();
  }, [surah, editions]);

  const toggleBookmark = (ayah) => {
    const bookmark = { surah: surah.number, ayah: ayah.numberInSurah };
    if (bookmarks.some(b => b.surah === surah.number && b.ayah === ayah.numberInSurah)) {
      setBookmarks(bookmarks.filter(b => !(b.surah === surah.number && b.ayah === ayah.numberInSurah)));
    } else {
      setBookmarks([...bookmarks, bookmark]);
    }
  };

  const addNote = (ayah, noteText) => {
    setNotes([...notes, { surah: surah.number, ayah: ayah.numberInSurah, text: noteText }]);
  };

  const markAsRead = (ayah) => {
    setProgress({
      ...progress,
      [surah.number]: {
        ...progress[surah.number],
        [ayah.numberInSurah]: true,
      },
    });
  };

  const playAudio = (url) => {
    if (currentAudio === url && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) audioRef.current.pause();
      audioRef.current = new Audio(url);
      audioRef.current.loop = repeatCount > 1;
      let played = 0;
      audioRef.current.onended = () => {
        played++;
        if (played < repeatCount) audioRef.current.play();
        else setIsPlaying(false);
      };
      audioRef.current.play();
      setCurrentAudio(url);
      setIsPlaying(true);
    }
  };

  return (
    <div className="animate-fadeIn">
      <button 
        onClick={() => setView('surah')} 
        className="mb-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Back to Surahs
      </button>
      <h1 className="text-2xl font-bold mb-4">{surah.englishName} ({surah.name})</h1>
      <div className="mb-4">
        <label className="mr-2">Repeat Audio:</label>
        <select 
          value={repeatCount} 
          onChange={(e) => setRepeatCount(Number(e.target.value))}
          className="p-2 rounded border"
        >
          {[1, 2, 3, 5].map(n => <option key={n} value={n}>{n}x</option>)}
        </select>
      </div>
      {ayahs.map((edition, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold">{edition.edition.name}</h2>
          {edition.ayahs.map((ayah, idx) => (
            <div 
              key={idx} 
              className={`my-4 p-4 rounded shadow ${progress[surah.number]?.[ayah.numberInSurah] ? 'bg-green-100' : 'bg-white'}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{ayah.numberInSurah}</span>
                <div className="flex space-x-2">
                  {audio && audio[idx] && (
                    <button 
                      onClick={() => playAudio(audio[idx].audio)}
                      className={`p-2 rounded ${isPlaying && currentAudio === audio[idx].audio ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                    >
                      {isPlaying && currentAudio === audio[idx].audio ? 'Pause' : 'Play'}
                    </button>
                  )}
                  <button 
                    onClick={() => toggleBookmark(ayah)}
                    className={`p-2 rounded ${bookmarks.some(b => b.surah === surah.number && b.ayah === ayah.numberInSurah) ? 'bg-yellow-500' : 'bg-gray-300'}`}
                  >
                    {bookmarks.some(b => b.surah === surah.number && b.ayah === ayah.numberInSurah) ? 'Unbookmark' : 'Bookmark'}
                  </button>
                  <button 
                    onClick={() => {
                      const note = prompt('Enter note:');
                      if (note) addNote(ayah, note);
                    }}
                    className="p-2 rounded bg-purple-500 text-white"
                  >
                    Add Note
                  </button>
                  <button 
                    onClick={() => markAsRead(ayah)}
                    className="p-2 rounded bg-green-500 text-white"
                  >
                    Mark Read
                  </button>
                </div>
              </div>
              <p className={`${edition.edition.language === 'ar' ? 'arabic' : ''} ${settings.showTajweed ? 'tajweed' : ''} text-${settings.fontSize}`}>
                {ayah.text}
              </p>
              {notes
                .filter(n => n.surah === surah.number && n.ayah === ayah.numberInSurah)
                .map((note, i) => (
                  <p key={i} className="text-sm text-gray-500 mt-2">Note: {note.text}</p>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AyahView;