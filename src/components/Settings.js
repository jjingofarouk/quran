import React, { useState, useEffect } from 'react';

function Settings({ editions, setEditions, settings, setSettings }) {
  const [availableEditions, setAvailableEditions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [types, setTypes] = useState([]);
  const [formats, setFormats] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://api.alquran.cloud/v1/edition').then(res => res.json()),
      fetch('http://api.alquran.cloud/v1/edition/language').then(res => res.json()),
      fetch('http://api.alquran.cloud/v1/edition/type').then(res => res.json()),
      fetch('http://api.alquran.cloud/v1/edition/format').then(res => res.json()),
    ]).then(([editionsData, languagesData, typesData, formatsData]) => {
      setAvailableEditions(editionsData.data);
      setLanguages(languagesData.data);
      setTypes(typesData.data);
      setFormats(formatsData.data);
    });
  }, []);

  const handleEditionToggle = (edition) => {
    if (editions.includes(edition.identifier)) {
      setEditions(editions.filter(e => e !== edition.identifier));
    } else {
      setEditions([...editions, edition.identifier]);
    }
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Select Editions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {availableEditions.map(edition => (
            <label key={edition.identifier} className="flex items-center">
              <input
                type="checkbox"
                checked={editions.includes(edition.identifier)}
                onChange={() => handleEditionToggle(edition)}
                className="mr-2"
              />
              {edition.name} ({edition.language}, {edition.format}, {edition.type})
            </label>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Language</label>
            <select 
              onChange={(e) => {
                if (e.target.value) {
                  fetch(`http://api.alquran.cloud/v1/edition/language/${e.target.value}`)
                    .then(res => res.json())
                    .then(data => setAvailableEditions(data.data));
                } else {
                  fetch('http://api.alquran.cloud/v1/edition')
                    .then(res => res.json())
                    .then(data => setAvailableEditions(data.data));
                }
              }}
              className="p-2 rounded border w-full"
            >
              <option value="">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Type</label>
            <select 
              onChange={(e) => {
                if (e.target.value) {
                  fetch(`http://api.alquran.cloud/v1/edition/type/${e.target.value}`)
                    .then(res => res.json())
                    .then(data => setAvailableEditions(data.data));
                } else {
                  fetch('http://api.alquran.cloud/v1/edition')
                    .then(res => res.json())
                    .then(data => setAvailableEditions(data.data));
                }
              }}
              className="p-2 rounded border w-full"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Format</label>
            <select 
              onChange={(e) => {
                if (e.target.value) {
                  fetch(`http://api.alquran.cloud/v1/edition/format/${e.target.value}`)
                    .then(res => res.json())
                    .then(data => setAvailableEditions(data.data));
                } else {
                  fetch('http://api.alquran.cloud/v1/edition')
                    .then(res => res.json())
                    .then(data => setAvailableEditions(data.data));
                }
              }}
              className="p-2 rounded border w-full"
            >
              <option value="">All Formats</option>
              {formats.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Display Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Font Size</label>
            <select 
              value={settings.fontSize}
              onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
              className="p-2 rounded border w-full"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Theme</label>
            <select 
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="p-2 rounded border w-full"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.showTajweed}
              onChange={(e) => setSettings({ ...settings, showTajweed: e.target.checked })}
              className="mr-2"
            />
            Show Tajweed (Simulated)
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;