import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Gift, Star, Lock, Check, Sparkles } from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'theme' | 'decoration' | 'achievement';
  unlocked: boolean;
  image: string;
}

const Rewards: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [points, setPoints] = useState(350);
  const [activeTab, setActiveTab] = useState('themes');
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      name: 'Forest Theme',
      description: 'Transform your Zen Garden into a lush forest',
      cost: 200,
      type: 'theme',
      unlocked: true,
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: '2',
      name: 'Beach Theme',
      description: 'Relax with a peaceful coastal setting',
      cost: 300,
      type: 'theme',
      unlocked: false,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: '3',
      name: 'Mountain Theme',
      description: 'Enjoy a serene mountain landscape',
      cost: 400,
      type: 'theme',
      unlocked: false,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: '4',
      name: 'Cherry Blossom',
      description: 'Add beautiful cherry blossom trees to your garden',
      cost: 150,
      type: 'decoration',
      unlocked: true,
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: '5',
      name: 'Zen Fountain',
      description: 'A peaceful water fountain for your garden',
      cost: 250,
      type: 'decoration',
      unlocked: false,
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: '6',
      name: 'Stone Lantern',
      description: 'Traditional stone lantern to light your garden',
      cost: 200,
      type: 'decoration',
      unlocked: false,
      image: 'https://images.unsplash.com/photo-1614957004131-9e8f2a13573c?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: '7',
      name: 'Habit Master',
      description: 'Complete all habits for 7 consecutive days',
      cost: 0,
      type: 'achievement',
      unlocked: true,
      image: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?auto=format&fit=crop&q=80&w=300&h=200',
    },
    {
      id: '8',
      name: 'Focus Champion',
      description: 'Complete 20 focus sessions in a week',
      cost: 0,
      type: 'achievement',
      unlocked: false,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300&h=200',
    },
  ]);

  const unlockReward = (id: string) => {
    const reward = rewards.find(r => r.id === id);
    if (reward && !reward.unlocked && points >= reward.cost) {
      setPoints(points - reward.cost);
      setRewards(rewards.map(r => r.id === id ? { ...r, unlocked: true } : r));
    }
  };

  const filteredRewards = rewards.filter(reward => {
    if (activeTab === 'themes') return reward.type === 'theme';
    if (activeTab === 'decorations') return reward.type === 'decoration';
    if (activeTab === 'achievements') return reward.type === 'achievement';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
            Rewards
          </h2>
          <div className={`px-4 py-2 rounded-lg flex items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <Star className={`mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={20} />
            <span className="font-bold">{points} points</span>
          </div>
        </div>

        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('themes')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'themes'
                ? isDarkMode
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-blue-600 border-b-2 border-blue-600'
                : isDarkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Themes
          </button>
          <button
            onClick={() => setActiveTab('decorations')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'decorations'
                ? isDarkMode
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-blue-600 border-b-2 border-blue-600'
                : isDarkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Decorations
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'achievements'
                ? isDarkMode
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-blue-600 border-b-2 border-blue-600'
                : isDarkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Achievements
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <div
              key={reward.id}
              className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <div className="relative h-40">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-full object-cover"
                />
                {!reward.unlocked && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Lock size={32} className="text-white" />
                  </div>
                )}
                {reward.unlocked && reward.type !== 'achievement' && (
                  <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                )}
                {reward.type === 'achievement' && reward.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                    <div className="p-2 w-full flex justify-between items-center">
                      <span className="text-white font-bold">Unlocked!</span>
                      <Sparkles size={20} className="text-yellow-400" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">{reward.name}</h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {reward.description}
                </p>
                {reward.type !== 'achievement' ? (
                  reward.unlocked ? (
                    <button
                      className={`w-full py-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-300 text-gray-700'
                      }`}
                      disabled
                    >
                      Unlocked
                    </button>
                  ) : (
                    <button
                      onClick={() => unlockReward(reward.id)}
                      disabled={points < reward.cost}
                      className={`w-full py-2 rounded-lg flex items-center justify-center ${
                        points >= reward.cost
                          ? isDarkMode
                            ? 'bg-purple-700 hover:bg-purple-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-400 text-white'
                          : isDarkMode
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Star className="mr-1" size={16} />
                      <span>{reward.cost} points</span>
                    </button>
                  )
                ) : (
                  <div className={`w-full py-2 rounded-lg text-center ${
                    reward.unlocked
                      ? isDarkMode
                        ? 'bg-purple-900 text-purple-300'
                        : 'bg-blue-100 text-blue-700'
                      : isDarkMode
                      ? 'bg-gray-600 text-gray-400'
                      : 'bg-gray-300 text-gray-500'
                  }`}>
                    {reward.unlocked ? 'Achieved' : 'In Progress'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
          How to Earn Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-900' : 'bg-blue-100'} mr-3`}>
                <Check className={isDarkMode ? 'text-purple-300' : 'text-blue-600'} size={20} />
              </div>
              <div>
                <h3 className="font-medium">Complete Daily Habits</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  10 points per habit
                </p>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-900' : 'bg-blue-100'} mr-3`}>
                <TrendingUp className={isDarkMode ? 'text-purple-300' : 'text-blue-600'} size={20} />
              </div>
              <div>
                <h3 className="font-medium">Maintain Streaks</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  5 points per day of streak
                </p>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-900' : 'bg-blue-100'} mr-3`}>
                <Clock className={isDarkMode ? 'text-purple-300' : 'text-blue-600'} size={20} />
              </div>
              <div>
                <h3 className="font-medium">Focus Sessions</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  15 points per completed session
                </p>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-900' : 'bg-blue-100'} mr-3`}>
                <Target className={isDarkMode ? 'text-purple-300' : 'text-blue-600'} size={20} />
              </div>
              <div>
                <h3 className="font-medium">Achieve Goals</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  50-100 points per completed goal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;