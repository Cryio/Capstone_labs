import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
}

const Notes: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Meditation Insights',
      content: 'I found that morning meditation helps me stay focused throughout the day. Try to maintain at least 10 minutes of mindfulness practice each morning.',
      date: new Date('2023-05-15'),
      tags: ['meditation', 'mindfulness'],
    },
    {
      id: '2',
      title: 'Book Recommendations',
      content: 'Books to read this month:\n1. Atomic Habits by James Clear\n2. The Power of Now by Eckhart Tolle\n3. Deep Work by Cal Newport',
      date: new Date('2023-05-10'),
      tags: ['reading', 'books'],
    },
    {
      id: '3',
      title: 'Workout Plan',
      content: 'Monday: Upper body\nWednesday: Lower body\nFriday: Full body\nWeekends: Cardio or rest',
      date: new Date('2023-05-05'),
      tags: ['exercise', 'health'],
    },
  ]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNoteClick = (note: Note) => {
    setActiveNote(note);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (activeNote) {
      setEditedNote({ ...activeNote });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (editedNote) {
      setNotes(notes.map(note => note.id === editedNote.id ? editedNote : note));
      setActiveNote(editedNote);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
      setIsEditing(false);
    }
  };

  const handleCreateNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      date: new Date(),
      tags: [],
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setEditedNote(newNote);
    setIsEditing(true);
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      <div className={`md:col-span-1 rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg flex flex-col`}>
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`}>
              Notes
            </h2>
            <button
              onClick={handleCreateNewNote}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
            >
              <Plus size={20} />
            </button>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className={`w-full p-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'
            } border focus:outline-none focus:ring-2 ${
              isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
            }`}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {filteredNotes.map((note) => (
                <li key={note.id}>
                  <button
                    onClick={() => handleNoteClick(note)}
                    className={`w-full text-left p-4 transition-colors ${
                      activeNote?.id === note.id
                        ? isDarkMode
                          ? 'bg-gray-700'
                          : 'bg-gray-100'
                        : isDarkMode
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-medium truncate">{note.title}</h3>
                    <p className={`text-sm truncate mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {note.content.substring(0, 60)}
                      {note.content.length > 60 ? '...' : ''}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagClick(tag);
                            }}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              isDarkMode
                                ? 'bg-purple-900 text-purple-300 hover:bg-purple-800'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            } cursor-pointer`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDate(note.date)}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className={`mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 11h4"></path>
                <path d="M12 15h4"></path>
                <path d="M8 11v4"></path>
                <path d="M20 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"></path>
              </svg>
              <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No notes found
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {searchTerm ? 'Try a different search term' : 'Create your first note'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`mt-3 px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`md:col-span-2 rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800 bg-opacity-60' : 'bg-white'} shadow-lg flex flex-col`}>
        {activeNote ? (
          <>
            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
              {isEditing ? (
                <input
                  type="text"
                  value={editedNote?.title || ''}
                  onChange={(e) => setEditedNote(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className={`flex-1 p-2 rounded-lg mr-2 ${
                    isDarkMode
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-gray-100 text-gray-800 border-gray-300'
                  } border focus:outline-none focus:ring-2 ${
                    isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                  }`}
                />
              ) : (
                <h2 className="text-xl font-bold">{activeNote.title}</h2>
              )}
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEditClick}
                      className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(activeNote.id)}
                      className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-500 hover:bg-red-400'} text-white`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {isEditing ? (
                <div className="p-4">
                  <textarea
                    value={editedNote?.content || ''}
                    onChange={(e) => setEditedNote(prev => prev ? { ...prev, content: e.target.value } : null)}
                    className={`w-full h-64 p-3 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-gray-100 text-gray-800 border-gray-300'
                    } border focus:outline-none focus:ring-2 ${
                      isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                    } resize-none`}
                  />
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <input
                      type="text"
                      value={editedNote?.tags.join(', ') || ''}
                      onChange={(e) => {
                        const tagsArray = e.target.value
                          .split(',')
                          .map(tag => tag.trim())
                          .filter(tag => tag !== '');
                        setEditedNote(prev => prev ? { ...prev, tags: tagsArray } : null);
                      }}
                      placeholder="Enter tags separated by commas"
                      className={`w-full p-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                          : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'
                      } border focus:outline-none focus:ring-2 ${
                        isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                      }`}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {activeNote.tags.map((tag) => (
                        <span
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isDarkMode
                              ? 'bg-purple-900 text-purple-300 hover:bg-purple-800'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          } cursor-pointer`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Last updated: {formatDate(activeNote.date)}
                    </p>
                  </div>
                  <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
                    {activeNote.content.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className={`mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 11h4"></path>
              <path d="M12 15h4"></path>
              <path d="M8 11v4"></path>
              <path d="M20 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"></path>
            </svg>
            <h2 className="text-xl font-bold mb-2">No Note Selected</h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Select a note from the list or create a new one
            </p>
            <button
              onClick={handleCreateNewNote}
              className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
            >
              Create New Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;