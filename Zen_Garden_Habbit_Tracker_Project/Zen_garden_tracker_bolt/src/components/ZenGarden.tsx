import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Flower, Target, Sparkles } from 'lucide-react';

interface GardenPatch {
  id: string;
  name: string;
  progress: number;
  type: 'flower' | 'tree' | 'stone';
  color: string;
}

const ZenGarden: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [gardenPatches, setGardenPatches] = useState<GardenPatch[]>([
    { id: '1', name: 'Meditation', progress: 70, type: 'flower', color: 'purple' },
    { id: '2', name: 'Reading', progress: 45, type: 'flower', color: 'blue' },
    { id: '3', name: 'Exercise', progress: 30, type: 'tree', color: 'green' },
    { id: '4', name: 'Hydration', progress: 90, type: 'flower', color: 'cyan' },
  ]);
  const [selectedTheme, setSelectedTheme] = useState('zen');

  const themes = [
    { id: 'zen', name: 'Zen Garden', description: 'Traditional Japanese garden style' },
    { id: 'forest', name: 'Forest', description: 'Lush green forest environment' },
    { id: 'beach', name: 'Beach', description: 'Peaceful coastal setting' },
    { id: 'mountain', name: 'Mountain', description: 'Serene mountain landscape' },
  ];

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
            Your Zen Garden
          </h2>
          <div className="flex space-x-2">
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} border`}
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-400'} text-white`}>
              <Sparkles size={20} />
            </button>
          </div>
        </div>

        <div className={`relative aspect-video rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
          {/* Garden Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
          
          {/* Garden Elements */}
          <div className="absolute inset-0 p-6 grid grid-cols-3 gap-4">
            {gardenPatches.map((patch) => (
              <div
                key={patch.id}
                className={`relative flex flex-col items-center justify-center rounded-lg p-4 ${
                  isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white bg-opacity-60'
                }`}
              >
                <div className={`w-16 h-16 mb-2 flex items-center justify-center rounded-full ${
                  patch.color === 'purple' ? 'bg-purple-100' :
                  patch.color === 'blue' ? 'bg-blue-100' :
                  patch.color === 'green' ? 'bg-green-100' :
                  'bg-cyan-100'
                }`}>
                  {patch.type === 'flower' ? (
                    <Flower size={32} className={
                      patch.color === 'purple' ? 'text-purple-500' :
                      patch.color === 'blue' ? 'text-blue-500' :
                      patch.color === 'green' ? 'text-green-500' :
                      'text-cyan-500'
                    } />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className={
                      patch.color === 'purple' ? 'text-purple-500' :
                      patch.color === 'blue' ? 'text-blue-500' :
                      patch.color === 'green' ? 'text-green-500' :
                      'text-cyan-500'
                    } width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 22v-2"></path>
                      <path d="M9 18v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1"></path>
                      <path d="M12 2v8"></path>
                      <path d="M4.93 10.93 8 14"></path>
                      <path d="M19.07 10.93 16 14"></path>
                      <path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                    </svg>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="font-medium">{patch.name}</h3>
                  <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        patch.color === 'purple' ? 'bg-purple-500' :
                        patch.color === 'blue' ? 'bg-blue-500' :
                        patch.color === 'green' ? 'bg-green-500' :
                        'bg-cyan-500'
                      }`}
                      style={{ width: `${patch.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1">{patch.progress}% Growth</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Garden Progress</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Your garden is 58% complete
            </p>
          </div>
          <button className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-400'} text-white`}>
            Add New Goal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
            Garden Themes
          </h2>
          <div className="space-y-3">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  selectedTheme === theme.id
                    ? isDarkMode
                      ? 'bg-purple-900 bg-opacity-50'
                      : 'bg-blue-100'
                    : isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-600' : 'bg-white'
                  }`}>
                    {theme.id === 'zen' && <Flower size={20} className={isDarkMode ? 'text-purple-400' : 'text-blue-500'} />}
                    {theme.id === 'forest' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className={isDarkMode ? 'text-purple-400' : 'text-blue-500'} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 22v-2"></path>
                        <path d="M9 18v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1"></path>
                        <path d="M12 2v8"></path>
                        <path d="M4.93 10.93 8 14"></path>
                        <path d="M19.07 10.93 16 14"></path>
                        <path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                      </svg>
                    )}
                    {theme.id === 'beach' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className={isDarkMode ? 'text-purple-400' : 'text-blue-500'} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.5 21.2a4 4 0 0 0-5.5-5.5"></path>
                        <path d="M20 16.2a4 4 0 0 0-6-6"></path>
                        <path d="M12 20.4l3.5-3.5"></path>
                        <path d="M19.2 13l-7.8 7.8"></path>
                        <path d="M3 6l18 18"></path>
                        <path d="M3.7 14.3l5.5-5.5"></path>
                        <path d="M10.5 8.5l5.5-5.5"></path>
                      </svg>
                    )}
                    {theme.id === 'mountain' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className={isDarkMode ? 'text-purple-400' : 'text-blue-500'} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{theme.name}</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {theme.description}
                    </p>
                  </div>
                </div>
                {selectedTheme === theme.id ? (
                  <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-purple-700 text-white' : 'bg-blue-500 text-white'}`}>
                    Active
                  </span>
                ) : (
                  <button className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                    Apply
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
            Goals
          </h2>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Target size={20} className={isDarkMode ? 'text-purple-400' : 'text-blue-500'} />
                  <h3 className="font-medium ml-2">Complete 30-day meditation challenge</h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700'}`}>
                  70%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-blue-500'}`}
                  style={{ width: '70%' }}
                ></div>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Target size={20} className={isDarkMode ? 'text-purple-400' : 'text-blue-500'} />
                  <h3 className="font-medium ml-2">Read 12 books this year</h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700'}`}>
                  45%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-blue-500'}`}
                  style={{ width: '45%' }}
                ></div>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Target size={20} className={isDarkMode ? 'text-purple-400' : 'text-blue-500'} />
                  <h3 className="font-medium ml-2">Exercise 3 times per week</h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700'}`}>
                  30%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-blue-500'}`}
                  style={{ width: '30%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZenGarden;