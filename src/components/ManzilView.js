import React, { useState, useEffect } from 'react';

function ManzilView({ selectedManzil, setSelectedManzil, editions, settings, bookmarks, setBookmarks, notes, setNotes, progress, setProgress, setView }) {
  const [manzilData, setManzilData] = useState([]);
  const manzilNumbers = Array.from({ length: 7 }, (_, i) => i + 1);

  useEffect(() => {
    if (selectedManzil) {
      const editionString = editions.join(',');
      const fetchManzil = async () => {
        try {
          const res = await fetch(`http://api.alquran.cloud/v1/manzil/${selectedManzil}/editions/${editionString}`);
          const data = await res.json();
          setManzilData(data.data);
          localStorage.setItem(`manzil_${selectedManzil}_${editionString}`, JSON.stringify(data));
        } catch (e) {
          const cached = localStorage.getItem(`manzil_${selectedManzil}_${editionString}`);
          if (cached) setManzilData(JSON.parse(cached).data);
        }
      };
      fetchManzil();
    }
  }, [selectedManzil, editions]);

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
        onClick={() => setView('surThe Surahs')} 
        className="mb-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Back to Surahs
      </button>
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedManzil(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="">Select Manzil</option>
          {manzilNumbers.map(manzil => (
            <option key={manzil} value={manzil}>Manzil {manzil}</option>
          ))}
        </select>
      </div>
      {manzilData.map((edition, index) => (
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

export default ManzilView;