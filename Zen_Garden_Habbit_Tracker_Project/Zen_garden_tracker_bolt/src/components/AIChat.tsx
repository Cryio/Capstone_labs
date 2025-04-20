import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Send, Mic, Brain, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Zen AI assistant. How can I help you with your habits and goals today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your meditation habit, I notice you're most consistent in the mornings. Would you like some tips to make your practice even more effective?",
        "I see you've been working on your reading goal. Have you considered setting aside a specific time each day for reading? This can help make it a consistent habit.",
        "Your exercise streak is impressive! To maintain motivation, try varying your workouts or finding a workout buddy.",
        "For your goal of drinking more water, have you tried using reminders or a tracking app? Small environmental cues can make a big difference.",
        "I've analyzed your habit patterns, and it seems you're most productive in the morning. Consider scheduling your most important tasks during this time."
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startSpeechRecognition = () => {
    setIsRecording(true);
    // Simulate speech recognition
    setTimeout(() => {
      setInput('How can I improve my meditation practice?');
      setIsRecording(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`h-[calc(100vh-8rem)] flex flex-col rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-700' : 'bg-blue-500'} text-white mr-3`}>
            <Brain size={20} />
          </div>
          <div>
            <h2 className="font-bold text-lg">Zen AI Assistant</h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Personalized habit and goal insights
            </p>
          </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? isDarkMode
                    ? 'bg-purple-700 text-white'
                    : 'bg-blue-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'ai' ? (
                  <Brain size={16} className="mr-1" />
                ) : (
                  <User size={16} className="mr-1" />
                )}
                <span className="text-xs opacity-70">
                  {message.sender === 'ai' ? 'Zen AI' : 'You'} • {formatTime(message.timestamp)}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center">
          <button
            onClick={startSpeechRecognition}
            disabled={isRecording}
            className={`p-2 rounded-full mr-2 ${
              isRecording
                ? 'bg-red-500 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <Mic size={20} />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about your habits and goals..."
            className={`flex-1 p-3 rounded-lg resize-none ${
              isDarkMode
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'
            } border focus:outline-none focus:ring-2 ${
              isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
            }`}
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={input.trim() === ''}
            className={`p-2 rounded-full ml-2 ${
              input.trim() === ''
                ? isDarkMode
                  ? 'bg-gray-700 text-gray-500'
                  : 'bg-gray-200 text-gray-400'
                : isDarkMode
                ? 'bg-purple-700 text-white hover:bg-purple-600'
                : 'bg-blue-500 text-white hover:bg-blue-400'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;