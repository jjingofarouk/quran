import React, { useState } from 'react';

function ProgressTracker({ progress, setProgress, setView }) {
  const [khatmahGoal, setKhatmahGoal] = useState(30); // Default: Complete Quran in 30 days

  const totalAyahs = 6236; // Total ayahs in Quran
  const surahs = Array.from({ length: 114 }, (_, i) => i + 1);

  const calculateProgress = () => {
    let readAyahs = 0;
    Object.values(progress).forEach(surah => {
      readAyahs += Object.values(surah).filter(read => read).length;
    });
    return ((readAyahs / totalAyahs) * 100).toFixed(2);
  };

  const dailyTarget = Math.ceil(totalAyahs / khatmahGoal);

  const resetProgress = () => {
    if (window.confirm('Reset all progress?')) {
      setProgress({});
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
      <h2 className="text-xl font-bold mb-4">Progress Tracker</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
        <p>Completed: {calculateProgress()}% ({Object.values(progress).reduce((sum, surah) => sum + Object.values(surah).filter(read => read).length, 0)} / {totalAyahs} ayahs)</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div 
            className="bg-blue-600 h-4 rounded-full" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Khatmah Goal</h3>
        <label className="block mb-1">Complete Quran in:</label>
        <select 
          value={khatmahGoal}
          onChange={(e) => setKhatmahGoal(Number(e.target.value))}
          className="p-2 rounded border w-full"
        >
          <option value={7}>7 Days</option>
          <option value={30}>30 Days</option>
          <option value={60}>60 Days</option>
          <option value={90}>90 Days</option>
        </select>
        <p className="mt-2">Daily Target: ~{dailyTarget} ayahs</p>
      </div>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Surah Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {surahs.map(surah => {
            const read = progress[surah] ? Object.values(progress[surah]).filter(read => read).length : 0;
            const total = surah === 1 ? 7 : surah === 2 ? 286 : surah === 3 ? 200 : 114; // Simplified ayah counts
            const percentage = total ? ((read / total) * 100).toFixed(2) : 0;
            return (
              <div key={surah} className="p-2 border rounded">
                <p>Surah {surah}</p>
                <p>{read} / {total} ayahs ({percentage}%)</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button 
        onClick={resetProgress}
        className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Reset Progress
      </button>
    </div>
  );
}

export default ProgressTracker;