import React, { useState, useEffect } from 'react';

function SearchView({ query, editions, settings, setView, setSelectedSurah }) {
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('all'); // 'all', 'surah', 'arabic'
  const [selectedSurah, setLocalSelectedSurah] = useState('');

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          let url = '';
          // eslint-disable-next-line no-undef
          const edition = editions && editions.length > 0 ? editions.find(ed => ed.includes('en')) || 'en' : 'en';
          if (searchType === 'surah' && selectedSurah) {
            url = `http://api.alquran.cloud/v1/search/${query}/${selectedSurah}/${edition}`;
          } else if (searchType === 'arabic') {
            url = `http://api.alquran.cloud/v1/search/${query}/all/quran-uthmani`;
          } else {
            url = `http://api.alquran.cloud/v1/search/${query}/all/${edition}`;
          }
          const res = await fetch(url);
          const data = await res.json();
          setResults(data.data.matches || []);
          localStorage.setItem(`search_${query}_${searchType}_${selectedSurah}_${edition}`, JSON.stringify(data));
        } catch (e) {
          const cached = localStorage.getItem(`search_${query}_${searchType}_${selectedSurah}_${edition}`);
          if (cached) setResults(JSON.parse(cached).data.matches || []);
        }
      };
      fetchSearchResults();
    }
  }, [query, editions, searchType, selectedSurah]);

  const handleAyahClick = (ayah) => {
    setSelectedSurah({ number: ayah.surah.number, englishName: ayah.surah.englishName, name: ayah.surah.name });
    setView('ayah');
  };

  return (
    <div className="animate-fadeIn">
      <button 
        onClick={() => setView('surah')} 
        className="mb-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Back to Surahs
      </button>
      <div className="mb-4 flex space-x-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="all">Search All</option>
          <option value="surah">Search in Surah</option>
          <option value="arabic">Search Arabic Text</option>
        </select>
        {searchType === 'surah' && (
          <select
            value={selectedSurah}
            onChange={(e) => setLocalSelectedSurah(e.target.value)}
            className="p-2 rounded border"
          >
            <option value="">Select Surah</option>
            {Array.from({ length: 114 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>Surah {num}</option>
            ))}
          </select>
        )}
      </div>
      <h2 className="text-xl font-bold mb-4">Search Results for: {query}</h2>
      {results.length === 0 && <p>No results found.</p>}
      {results.map((ayah, index) => (
        <div 
          key={index} 
          className="my-4 p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-100 transition"
          onClick={() => handleAyahClick(ayah)}
        >
          <div className="flex justify-between">
            <span className="text-gray-600">{ayah.surah.englishName} {ayah.numberInSurah}</span>
            <span>{ayah.edition.name}</span>
          </div>
          <p className={`${ayah.edition.language === 'ar' ? 'arabic' : ''} ${settings.showTajweed ? 'tajweed' : ''} text-${settings.fontSize}`}>
            {ayah.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SearchView;