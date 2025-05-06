import React, { useState, useEffect } from 'react';
import './SurahList.css';

function SurahList({ setSelectedSurah, editions }) {
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
  };

  return (
    <div className="surah-list-container">
      <h2 className="surah-list-title">Surahs</h2>
      <div className="surah-list">
        {surahs.map((surah) => (
          <div
            key={surah.number}
            onClick={() => handleSurahClick(surah)}
            className="surah-item"
          >
            <div className="surah-details">
              <span className="surah-number-name">
                {surah.number}. {surah.englishName}
              </span>
              <p className="surah-translation">
                {surah.englishNameTranslation}
              </p>
            </div>
            <div className="surah-arabic-info">
              <p className="surah-arabic-name">{surah.name}</p>
              <p className="surah-ayah-count">
                {surah.numberOfAyahs} Ayahs
              </p>
            </div>
            <p className="surah-meta">
              {surah.revelationType} -{' '}
              {surah.number === 1
                ? '7 Ayahs'
                : `${surah.numberOfAyahs} Ayahs`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurahList;