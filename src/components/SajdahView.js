import React, { useState, useEffect } from 'react';

function SajdaView({ editions, settings, bookmarks, setBookmarks, notes, setNotes, progress, setProgress, setView }) {
  const [sajdaData, setSajdaData] = useState([]);

  useEffect(() => {
    const editionString = editions.join(',');
    const fetchSajda = async () => {
      try {
        const res = await fetch(`http://api.alquran.cloud/v1/sajda/editions/${editionString}`);
        const data = await res.json();
        setSajdaData(data.data);
        localStorage.setItem(`sajda_${editionString}`, JSON.stringify(data));
      } catch (e) {
        const cached = localStorage.getItem(`sajda_${editionString}`);
        if (cached) setSajdaData(JSON.parse(cached).data);
      }
    };
    fetchSajda();
  }, [editions]);

  const toggleBookmark = (ayah) => {
    const bookmark = { surah: ayah.surah.number, ayah: ayah.numberInSurah };
    if (bookmarks.some(b => b.surah === ayah.surah.number && b.ayah === ayah.numberInSurah)) {
      setBookmarks(bookmarks.filter(b => !(b.surah === ayah.surah.number && b.ayah === ayah.numberInSurah)));
    } else {
      setBookmarks([...bookmarks, bookmark]);
    }
  };

  const addNote = (ayah, noteText) => {
    setNotes([...notes, { surah: ayah.surah.number, ayah: ayah.numberInSurah, text: noteText }]);
  };

  const markAsRead = (ayah) => {
    setProgress({
      ...progress,
      [ayah.surah.number]: {
        ...progress[ayah.surah.number],
        [ayah.numberInSurah]: true,
      },
    });
  };

  return (
    <div className="animate-fadeIn">
      <button 
        onClick={() => setView('surah')} 
        className="mb-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Back to Surahs
      </button>
      <h2 className="text-xl font-bold mb-4">Sajda Ayahs</h2>
      {sajdaData.map((edition, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold">{edition.edition.name}</h2>
          {edition.ayahs.map((ayah, idx) => (
            <div 
              key={idx} 
              className={`my-4 p-4 rounded shadow ${progress[ayah.surah.number]?.[ayah.numberInSurah] ? 'bg-green-100' : 'bg-white'}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{ayah.numberInSurah} ({ayah.surah.englishName})</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleBookmark(ayah)}
                    className={`p-2 rounded ${bookmarks.some(b => b.surah === ayah.surah.number && b.ayah === ayah.numberInSurah) ? 'bg-yellow-500' : 'bg-gray-300'}`}
                  >
                    {bookmarks.some(b => b.surah === ayah.surah.number && b.ayah === ayah.numberInSurah) ? 'Unbookmark' : 'Bookmark'}
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
                .filter(n => n.surah === ayah.surah.number && n.ayah === ayah.numberInSurah)
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

export default SajdaView;