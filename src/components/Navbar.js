import React from 'react';

function Navbar({ setView, setSearchQuery, bookmarks, setSelectedSurah }) {
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value);
      setView('search');
    }
  };

  const handleBookmarkClick = (bookmark) => {
    setSelectedSurah({ number: bookmark.surah });
    setView('ayah');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Quran App</div>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search Quran..."
            className="p-2 rounded text-black"
            onKeyPress={handleSearch}
          />
          <button onClick={() => setView('surah')} className="hover:underline">Surahs</button>
          <button onClick={() => setView('juz')} className="hover:underline">Juz</button>
          <button onClick={() => setView('manzil')} className="hover:underline">Manzil</button>
          <button onClick={() => setView('ruku')} className="hover:underline">Ruku</button>
          <button onClick={() => setView('page')} className="hover:underline">Page</button>
          <button onClick={() => setView('hizb')} className="hover:underline">Hizb</button>
          <button onClick={() => setView()['sajda']} className="hover:underline">Sajda</button>
          <button onClick={() => setView('progress')} className="hover:underline">Progress</button>
          <div className="relative group">
            <button className="hover:underline">Bookmarks</button>
            <div className="absolute hidden group-hover:block bg-white text-black rounded shadow-lg p-2">
              {bookmarks.map((bookmark, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleBookmarkClick(bookmark)}
                >
                  Surah {bookmark.surah}:{bookmark.ayah}
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setView('settings')} className="hover:underline">Settings</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;