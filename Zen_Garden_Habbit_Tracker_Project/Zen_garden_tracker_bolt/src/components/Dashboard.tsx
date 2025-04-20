import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Plus, Check, X, Trash2, Edit, Mic } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  frequency: string;
  streak: number;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Meditate', frequency: 'Daily', streak: 5, completed: false },
    { id: '2', name: 'Read a book', frequency: 'Daily', streak: 3, completed: true },
    { id: '3', name: 'Exercise', frequency: 'Daily', streak: 7, completed: false },
    { id: '4', name: 'Drink water', frequency: 'Daily', streak: 10, completed: true },
  ]);
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', frequency: 'Daily' });
  const [isRecording, setIsRecording] = useState(false);

  const toggleHabitCompletion = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const addHabit = () => {
    if (newHabit.name.trim() === '') return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      frequency: newHabit.frequency,
      streak: 0,
      completed: false
    };
    
    setHabits([...habits, habit]);
    setNewHabit({ name: '', frequency: 'Daily' });
    setIsAddingHabit(false);
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const startSpeechRecognition = () => {
    setIsRecording(true);
    // Simulate speech recognition
    setTimeout(() => {
      setNewHabit({ ...newHabit, name: 'Go for a walk' });
      setIsRecording(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
            Today's Habits
          </h2>
          <button
            onClick={() => setIsAddingHabit(true)}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
          >
            <Plus size={20} />
          </button>
        </div>

        {isAddingHabit ? (
          <div className={`p-4 mb-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-lg font-semibold mb-3">Add New Habit</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  placeholder="Habit name"
                  className={`flex-1 p-2 rounded-lg mr-2 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                />
                <button
                  onClick={startSpeechRecognition}
                  disabled={isRecording}
                  className={`p-2 rounded-lg ${isRecording ? 'bg-red-500' : isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                >
                  <Mic size={20} />
                </button>
              </div>
              <select
                value={newHabit.frequency}
                onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingHabit(false)}
                  className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-200'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={addHabit}
                  className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                >
                  Add Habit
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`p-4 rounded-lg flex items-center justify-between ${isDarkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleHabitCompletion(habit.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    habit.completed
                      ? isDarkMode
                        ? 'bg-purple-500 text-white'
                        : 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'border-2 border-purple-500'
                      : 'border-2 border-blue-500'
                  }`}
                >
                  {habit.completed && <Check size={16} />}
                </button>
                <div>
                  <h3 className={`font-medium ${habit.completed ? 'line-through opacity-70' : ''}`}>
                    {habit.name}
                  </h3>
                  <div className="flex items-center text-sm">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {habit.frequency}
                    </span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-blue-100 text-blue-700'}`}>
                      {habit.streak} day streak
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className={`p-1.5 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}>
                  <Edit size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                </button>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className={`p-1.5 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
                >
                  <Trash2 size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
            Your Zen Garden
          </h2>
          <div className={`aspect-video rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
            <div className="text-center p-6">
              <Flower size={48} className={`mx-auto mb-3 ${isDarkMode ? 'text-purple-400' : 'text-blue-500'}`} />
              <p className="text-lg font-medium">Your garden is growing!</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                2 habits completed today
              </p>
              <button className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-400'} text-white`}>
                View Garden
              </button>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
            AI Insights
          </h2>
          <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4`}>
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-700' : 'bg-blue-500'} text-white`}>
                <Brain size={20} />
              </div>
              <div>
                <p className="font-medium">Habit Suggestion</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Based on your meditation habit, you might enjoy adding a journaling practice to your evening routine.
                </p>
                <button className={`mt-2 text-sm ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-500'}`}>
                  Ask AI for more insights →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;