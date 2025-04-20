import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BarChart2, Calendar, TrendingUp, Clock, Filter } from 'lucide-react';

const Analytics: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [timeRange, setTimeRange] = useState('week');
  const [selectedHabit, setSelectedHabit] = useState('all');

  const habits = [
    { id: 'meditation', name: 'Meditation' },
    { id: 'reading', name: 'Reading' },
    { id: 'exercise', name: 'Exercise' },
    { id: 'water', name: 'Drink Water' },
  ];

  // Mock data for charts
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const completionData = [5, 3, 4, 5, 2, 3, 4]; // Number of habits completed each day
  const streakData = [7, 5, 10, 3]; // Current streak for each habit

  // Mock heatmap data (last 4 weeks)
  const generateHeatmapData = () => {
    const data = [];
    for (let week = 0; week < 4; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        // Random completion level: 0 = none, 1 = partial, 2 = full
        const completionLevel = Math.floor(Math.random() * 3);
        weekData.push(completionLevel);
      }
      data.push(weekData);
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
            Analytics
          </h2>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedHabit}
              onChange={(e) => setSelectedHabit(e.target.value)}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800'
              }`}
            >
              <option value="all">All Habits</option>
              {habits.map((habit) => (
                <option key={habit.id} value={habit.id}>
                  {habit.name}
                </option>
              ))}
            </select>

            {/* Fixed missing closing tag */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800'
              }`}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
