import React, { useState, useEffect } from 'react';

function SurahList({ setSelectedSurah, setView, editions }) {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch('http://api.alquran.cloud/v1/surah');
        const data = await res.json();
        setSurahs(data.data);
        localStorage.setItem('surahs', JSON.stringify(data));
      } catch (e) {
        const cached = localStorage.getItem('surahs');
        if (cached) setSurahs(JSON.parse(cached).data);
      }
    };
    fetchSurahs();
  }, []);

  const handleSurahClick = (surah) => {
    setSelectedSurah({
      number: surah.number,
      englishName: surah.englishName,
      name: surah.name,
    });
    setView('ayah');
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Surahs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {surahs.map(surah => (
          <div
            key={surah.number}
            onClick={() => handleSurahClick(surah)}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="text-lg font-semibold">{surah.number}. {surah.englishName}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">{surah.englishNameTranslation}</p>
              </div>
              <div className="text-right">
                <p className="arabic text-lg">{surah.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{surah.numberOfAyahs} Ayahs</p>
              </div>
            </div>
            <p className="text-sm mt-2">
              {surah.revelationType} - {surah.number === 1 ? '7 Ayahs' : `${surah.numberOfAyahs} Ayahs`}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => setView('juz')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Juz
        </button>
        <button
          onClick={() => setView('manzil')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Manzil
        </button>
        <button
          onClick={() => setView('ruku')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Ruku
        </button>
        <button
          onClick={() => setView('page')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Page
        </button>
        <button
          onClick={() => setView('hizb')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Hizb Quarter
        </button>
        <button
          onClick={() => setView('sajda')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Sajda
        </button>
      </div>
    </div>
  );
}

export default SurahList;