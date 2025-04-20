import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const AboutUs: React.FC = () => {
  const { isDarkMode } = useTheme();

  const team: TeamMember[] = [
    {
      name: 'Srachet Rai',
      role: 'Security & Frontend',
      bio: 'Leads security implementation and frontend development, ensuring a secure and responsive user experience.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        email: 'srachet@zenai.com'
      }
    },
    {
      name: 'Adarsh Bajpai',
      role: 'Frontend',
      bio: 'Specializes in creating beautiful, intuitive user interfaces with a focus on accessibility and user experience.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        email: 'adarsh@zenai.com'
      }
    },
    {
      name: 'Avijith Manikandan',
      role: 'AI Chatbot',
      bio: 'AI specialist responsible for developing the personalized habit recommendation system and chatbot integration.',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300&h=300',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        email: 'avijith@zenai.com'
      }
    },
    {
      name: 'Anmol Ranjan',
      role: 'Backend',
      bio: 'Develops robust backend systems and APIs that power the Zen AI Habit Tracker platform.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        email: 'anmol@zenai.com'
      }
    },
    {
      name: 'Abhi Bhardwaj',
      role: 'Database',
      bio: 'Database architect responsible for designing efficient data structures and ensuring data integrity.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        email: 'abhi@zenai.com'
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
          About Zen AI Habit Tracker
        </h2>
        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className="mb-4">
            Zen AI Habit Tracker is a comprehensive habit and goal tracking application designed to help you build positive routines and achieve your personal development goals.
          </p>
          <p className="mb-4">
            Our unique approach combines the visual appeal of a Zen Garden that grows with your progress, AI-powered insights to optimize your habits, and powerful analytics to track your journey.
          </p>
          <p>
            Whether you're looking to meditate more consistently, read daily, exercise regularly, or develop any other positive habit, Zen AI Habit Tracker provides the tools and motivation you need to succeed.
          </p>
        </div>
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name} className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="h-48 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-purple-300' : 'text-blue-600'} mb-2`}>
                  {member.role}
                </p>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {member.bio}
                </p>
                <div className="flex space-x-3">
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-600 hover:bg-gray-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-600 hover:bg-gray-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-600 hover:bg-gray-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      <Twitter size={16} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className={`p-2 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-600 hover:bg-gray-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
          Our Mission
        </h2>
        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p className="mb-4">
            At Zen AI Habit Tracker, our mission is to help people build meaningful habits that lead to personal growth and well-being. We believe that small, consistent actions create profound changes over time.
          </p>
          <p className="mb-4">
            By combining beautiful design, gamification elements, and AI-powered insights, we've created a platform that makes habit formation engaging, insightful, and sustainable.
          </p>
          <p>
            We're committed to continuous improvement and innovation, always looking for new ways to help our users achieve their goals and cultivate positive habits that last a lifetime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;