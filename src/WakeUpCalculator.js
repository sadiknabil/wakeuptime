import React, { useState } from 'react';
import { format, addMinutes, subMinutes } from 'date-fns';

const LANGUAGES = {
  en: {
    title: 'Wake Up Time Calculator',
    subtitle: 'Calculate your ideal wake-up or sleep time based on 90-minute sleep cycles.',
    goingToBed: 'Going to bed at',
    wakingUp: 'Waking up at',
    asleepBy: 'Asleep by',
    wakeUpAt: 'Wake up at',
    note: 'about 15 min to fall asleep',
    basedOnCycles: 'based on 90 min sleep cycles',
    modeSleep: 'I want to go to bed at',
    modeWake: 'I want to wake up at',
    selectTime: 'Select Time',
  },
  fr: {
    title: 'Calculateur de Temps de Sommeil',
    subtitle: 'Calculez votre heure idéale de coucher ou de réveil selon des cycles de 90 minutes.',
    goingToBed: 'Heure du coucher',
    wakingUp: 'Heure du réveil',
    asleepBy: 'Endormi vers',
    wakeUpAt: 'Se réveiller à',
    note: 'environ 15 minutes pour s’endormir',
    basedOnCycles: 'basé sur des cycles de sommeil de 90 min',
    modeSleep: 'Je veux me coucher à',
    modeWake: 'Je veux me réveiller à',
    selectTime: 'Choisir l\'heure',
  },
};

const WakeUpCalculator = () => {
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState('sleep');
  const [timeInput, setTimeInput] = useState('');

  const t = LANGUAGES[language];

  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
  };

  const getTimes = () => {
    if (!timeInput) return [];
    const [hours, minutes] = timeInput.split(':').map(Number);
    const baseTime = new Date();
    baseTime.setHours(hours);
    baseTime.setMinutes(minutes + (mode === 'sleep' ? 15 : 0));

    const cycles = [3, 4.5, 6];

    return cycles.map(duration => {
      const resultTime = mode === 'sleep'
        ? addMinutes(baseTime, duration * 60)
        : subMinutes(baseTime, duration * 60);
      return {
        time: format(resultTime, 'h:mm a'),
        duration,
      };
    });
  };

  const results = getTimes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold drop-shadow-lg">{t.title}</h1>
          <p className="text-md mt-2 opacity-80">{t.subtitle}</p>
        </div>

        <div className="flex justify-between items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 rounded bg-white text-black"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="p-2 rounded bg-white text-black"
          >
            <option value="sleep">{t.modeSleep}</option>
            <option value="wake">{t.modeWake}</option>
          </select>

          <input
            type="time"
            value={timeInput}
            onChange={handleTimeChange}
            className="bg-white text-black p-2 rounded"
          />
        </div>

        {timeInput && (
          <div className="bg-white bg-opacity-10 p-6 rounded-xl text-center shadow-xl">
            <p className="text-xl font-semibold">
              {mode === 'sleep' ? t.goingToBed : t.wakingUp}: {timeInput}
            </p>
            <p className="text-md mt-1 opacity-75">{mode === 'sleep' ? t.asleepBy : t.selectTime} ({t.note})</p>
            <h2 className="text-2xl font-bold mt-4">{mode === 'sleep' ? t.wakeUpAt : t.goingToBed}</h2>
            <p className="text-sm opacity-60">{t.basedOnCycles}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {results.map(({ time, duration }, idx) => (
                <div key={idx} className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-xl font-bold">{time}</p>
                  <p className="text-sm">{duration} h</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WakeUpCalculator;