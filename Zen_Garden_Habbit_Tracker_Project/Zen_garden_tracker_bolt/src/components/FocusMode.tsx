import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Flower } from 'lucide-react';

const FocusMode: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedSound, setSelectedSound] = useState('rain');
  const timerRef = useRef<number | null>(null);

  const sounds = [
    { id: 'rain', name: 'Rain' },
    { id: 'forest', name: 'Forest' },
    { id: 'waves', name: 'Ocean Waves' },
    { id: 'white-noise', name: 'White Noise' },
  ];

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer finished
            const audio = new Audio('/notification.mp3');
            if (!isMuted) audio.play();
            
            clearInterval(timerRef.current!);
            
            if (isBreak) {
              // Break finished, start work session
              setIsBreak(false);
              setCycles(c => c + 1);
              return 25 * 60; // 25 minutes work session
            } else {
              // Work session finished, start break
              setIsBreak(true);
              return cycles % 4 === 3 ? 15 * 60 : 5 * 60; // 15 min break every 4 cycles, otherwise 5 min
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isBreak, cycles, isMuted]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setCycles(0);
    setTimeLeft(25 * 60);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const totalTime = isBreak ? (cycles % 4 === 3 ? 15 * 60 : 5 * 60) : 25 * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={`md:col-span-2 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
          Focus Mode
        </h2>

        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 mb-8">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isBreak ? (isDarkMode ? '#8B5CF6' : '#3B82F6') : (isDarkMode ? '#EC4899' : '#EF4444')}
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * calculateProgress()) / 100}
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="45"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill={isDarkMode ? '#D1D5DB' : '#4B5563'}
              >
                {isBreak ? 'BREAK' : 'FOCUS'}
              </text>
              <text
                x="50"
                y="65"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="24"
                fontWeight="bold"
                fill={isDarkMode ? 'white' : '#1F2937'}
              >
                {formatTime(timeLeft)}
              </text>
            </svg>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={toggleTimer}
              className={`p-4 rounded-full ${
                isDarkMode
                  ? isActive
                    ? 'bg-red-700 hover:bg-red-600'
                    : 'bg-purple-700 hover:bg-purple-600'
                  : isActive
                  ? 'bg-red-500 hover:bg-red-400'
                  : 'bg-blue-500 hover:bg-blue-400'
              } text-white`}
            >
              {isActive ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetTimer}
              className={`p-4 rounded-full ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <RotateCcw size={24} />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>

          <div className="w-full max-w-md">
            <div className="flex justify-between mb-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Session {cycles + 1}
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isBreak ? 'Break Time' : 'Focus Time'}
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  isBreak
                    ? isDarkMode
                      ? 'bg-purple-500'
                      : 'bg-blue-500'
                    : isDarkMode
                    ? 'bg-pink-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-8 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Ambient Sounds</h3>
            <div className="grid grid-cols-2 gap-3">
              {sounds.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => setSelectedSound(sound.id)}
                  className={`p-3 rounded-lg flex items-center justify-center ${
                    selectedSound === sound.id
                      ? isDarkMode
                        ? 'bg-purple-900 text-purple-300'
                        : 'bg-blue-100 text-blue-700'
                      : isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {sound.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
          Zen Garden Growth
        </h2>
        <div className={`aspect-video rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
          <div className="text-center p-6">
            <Flower size={48} className={`mx-auto mb-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-500'}`} />
            <p className="text-lg font-medium">Focus sessions grow your garden!</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Today's Focus</span>
              <span className="text-sm font-medium">{cycles} sessions</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(cycles * 25, 100)}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Weekly Goal</span>
              <span className="text-sm font-medium">5/10 hours</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-blue-500'}`}
                style={{ width: '50%' }}
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Focus Tips</h3>
          <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li className="flex items-start">
              <span className={`inline-block w-4 h-4 rounded-full mr-2 mt-0.5 ${isDarkMode ? 'bg-purple-700' : 'bg-blue-500'}`}></span>
              Take short breaks to maintain productivity
            </li>
            <li className="flex items-start">
              <span className={`inline-block w-4 h-4 rounded-full mr-2 mt-0.5 ${isDarkMode ? 'bg-purple-700' : 'bg-blue-500'}`}></span>
              Stay hydrated during focus sessions
            </li>
            <li className="flex items-start">
              <span className={`inline-block w-4 h-4 rounded-full mr-2 mt-0.5 ${isDarkMode ? 'bg-purple-700' : 'bg-blue-500'}`}></span>
              Set clear goals for each focus session
            </li>
            <li className="flex items-start">
              <span className={`inline-block w-4 h-4 rounded-full mr-2 mt-0.5 ${isDarkMode ? 'bg-purple-700' : 'bg-blue-500'}`}></span>
              Minimize distractions in your environment
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;