import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { 
  BookOpen, 
  Calendar, 
  Search, 
  Plus, 
  Edit3, 
  Trash2,
  X,
  Save,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data
const initialEntries = [
  { 
    id: 1, 
    title: 'A productive day', 
    content: 'Today was incredibly productive. I managed to complete all my tasks ahead of schedule. I started the day with a morning run, which gave me energy for the entire day. Then I focused on my project proposal and finished it by noon. In the afternoon, I had a great meeting with the team where we discussed our next steps. Overall, it was a day well spent!', 
    date: '2025-06-14',
    mood: 'happy',
    tags: ['work', 'productivity']
  },
  { 
    id: 2, 
    title: 'New project ideas', 
    content: 'Had a brainstorming session and came up with some exciting new project ideas. I think the concept of a mindfulness app could be really interesting to explore. I also thought about a recipe sharing platform with a focus on sustainability. Need to flesh these ideas out more, but I\'m excited about the possibilities.', 
    date: '2025-06-13',
    mood: 'excited',
    tags: ['ideas', 'creativity']
  },
  { 
    id: 3, 
    title: 'Reflections on the week', 
    content: 'Looking back at this week, I\'ve made good progress on my goals. I\'ve been consistent with my morning routine and managed to read for at least 30 minutes every day. I need to work on being more patient with myself when things don\'t go as planned. Tomorrow is a new day with new opportunities.', 
    date: '2025-06-12',
    mood: 'thoughtful',
    tags: ['reflection', 'personal growth']
  },
  { 
    id: 4, 
    title: 'Weekend plans', 
    content: 'Planning a relaxing weekend. I want to visit the farmers market in the morning, then maybe go for a hike if the weather is nice. In the evening, I\'ll probably watch that new movie everyone\'s been talking about. It\'s important to take time to recharge.', 
    date: '2025-06-11',
    mood: 'relaxed',
    tags: ['weekend', 'plans']
  },
];

type DiaryEntry = {
  id: number;
  title: string;
  content: string;
  date: string;
  mood: string;
  tags: string[];
};

const DiaryPage: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>(initialEntries);
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    mood: 'neutral',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);
  const [editingEntryId, setEditingEntryId] = useState<number | null>(null);
  
  const toggleExpand = (id: number) => {
    setExpandedEntryId(expandedEntryId === id ? null : id);
  };
  
  const startEditing = (entry: DiaryEntry) => {
    setEditingEntryId(entry.id);
    setNewEntry({
      title: entry.title,
      content: entry.content,
      date: entry.date,
      mood: entry.mood,
      tags: [...entry.tags]
    });
  };
  
  const cancelEditing = () => {
    setEditingEntryId(null);
    setNewEntry({
      title: '',
      content: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: 'neutral',
      tags: []
    });
  };
  
  const saveEditedEntry = (id: number) => {
    setEntries(entries.map(entry => 
      entry.id === id ? {
        ...entry,
        title: newEntry.title,
        content: newEntry.content,
        date: newEntry.date,
        mood: newEntry.mood,
        tags: newEntry.tags
      } : entry
    ));
    
    setEditingEntryId(null);
    setNewEntry({
      title: '',
      content: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: 'neutral',
      tags: []
    });
  };
  
  const deleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };
  
  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() === '') return;
    
    if (!newEntry.tags.includes(newTag.toLowerCase())) {
      setNewEntry({
        ...newEntry,
        tags: [...newEntry.tags, newTag.toLowerCase()]
      });
    }
    
    setNewTag('');
  };
  
  const removeTag = (tag: string) => {
    setNewEntry({
      ...newEntry,
      tags: newEntry.tags.filter(t => t !== tag)
    });
  };
  
  const saveNewEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.title.trim() === '' || newEntry.content.trim() === '') return;
    
    const newEntryObj = {
      id: Date.now(),
      ...newEntry
    };
    
    setEntries([newEntryObj, ...entries]);
    setNewEntry({
      title: '',
      content: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: 'neutral',
      tags: []
    });
    setIsWriting(false);
  };
  
  const filteredEntries = entries.filter(entry => {
    const searchLower = searchTerm.toLowerCase();
    return (
      entry.title.toLowerCase().includes(searchLower) ||
      entry.content.toLowerCase().includes(searchLower) ||
      entry.tags.some(tag => tag.includes(searchLower))
    );
  });
  
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'excited': return '😃';
      case 'angry': return '😠';
      case 'relaxed': return '😌';
      case 'anxious': return '😰';
      case 'thoughtful': return '🤔';
      default: return '😐';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Diary</h1>
              <p className="text-gray-600">Capture your thoughts and memories</p>
            </div>
            
            <button 
              className="btn btn-primary mt-4 md:mt-0 flex items-center justify-center"
              onClick={() => setIsWriting(!isWriting)}
            >
              {isWriting ? (
                <>
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit3 className="h-5 w-5 mr-2" />
                  Write New Entry
                </>
              )}
            </button>
          </div>
          
          {isWriting && (
            <motion.div 
              className="card p-6 mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">New Diary Entry</h2>
              
              <form onSubmit={saveNewEntry}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="entry-title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      id="entry-title"
                      type="text"
                      className="input"
                      placeholder="Give your entry a title..."
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="entry-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      id="entry-date"
                      type="date"
                      className="input"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="entry-content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    id="entry-content"
                    className="input min-h-[200px]"
                    placeholder="Write your thoughts here..."
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="entry-mood" className="block text-sm font-medium text-gray-700 mb-1">
                      Mood
                    </label>
                    <select
                      id="entry-mood"
                      className="input"
                      value={newEntry.mood}
                      onChange={(e) => setNewEntry({...newEntry, mood: e.target.value})}
                    >
                      <option value="neutral">Neutral 😐</option>
                      <option value="happy">Happy 😊</option>
                      <option value="sad">Sad 😢</option>
                      <option value="excited">Excited 😃</option>
                      <option value="angry">Angry 😠</option>
                      <option value="relaxed">Relaxed 😌</option>
                      <option value="anxious">Anxious 😰</option>
                      <option value="thoughtful">Thoughtful 🤔</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="entry-tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <div className="flex">
                      <input
                        id="entry-tags"
                        type="text"
                        className="input flex-grow"
                        placeholder="Add tags..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                      />
                      <button 
                        type="button"
                        onClick={addTag}
                        className="ml-2 bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {newEntry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newEntry.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm flex items-center"
                          >
                            {tag}
                            <button 
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 text-indigo-500 hover:text-indigo-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary w-full">
                  <Save className="h-5 w-5 mr-2" />
                  Save Entry
                </button>
              </form>
            </motion.div>
          )}
          
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                className="input pl-10"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No entries found</h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? 'No entries match your search. Try different keywords.' 
                    : 'Start writing your first diary entry!'}
                </p>
              </div>
            ) : (
              filteredEntries.map(entry => (
                <motion.div 
                  key={entry.id}
                  className="card overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {editingEntryId === entry.id ? (
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Edit Entry</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            className="input"
                            value={newEntry.title}
                            onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <input
                            type="date"
                            className="input"
                            value={newEntry.date}
                            onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content
                        </label>
                        <textarea
                          className="input min-h-[200px]"
                          value={newEntry.content}
                          onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                          required
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mood
                          </label>
                          <select
                            className="input"
                            value={newEntry.mood}
                            onChange={(e) => setNewEntry({...newEntry, mood: e.target.value})}
                          >
                            <option value="neutral">Neutral 😐</option>
                            <option value="happy">Happy 😊</option>
                            <option value="sad">Sad 😢</option>
                            <option value="excited">Excited 😃</option>
                            <option value="angry">Angry 😠</option>
                            <option value="relaxed">Relaxed 😌</option>
                            <option value="anxious">Anxious 😰</option>
                            <option value="thoughtful">Thoughtful 🤔</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              className="input flex-grow"
                              placeholder="Add tags..."
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                            />
                            <button 
                              type="button"
                              onClick={addTag}
                              className="ml-2 bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors"
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>
                          
                          {newEntry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {newEntry.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm flex items-center"
                                >
                                  {tag}
                                  <button 
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="ml-1 text-indigo-500 hover:text-indigo-700"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => saveEditedEntry(entry.id)}
                          className="btn btn-primary flex-1"
                        >
                          <Save className="h-5 w-5 mr-2" />
                          Save Changes
                        </button>
                        <button 
                          onClick={cancelEditing}
                          className="btn btn-outline flex-1"
                        >
                          <X className="h-5 w-5 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold">{entry.title}</h3>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => startEditing(entry)}
                              className="text-gray-400 hover:text-indigo-500 transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => deleteEntry(entry.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{format(parseISO(entry.date), 'EEEE, MMMM do, yyyy')}</span>
                          <span className="mx-2">•</span>
                          <span>{getMoodEmoji(entry.mood)}</span>
                        </div>
                        
                        <p className={`text-gray-700 ${expandedEntryId === entry.id ? '' : 'line-clamp-3'}`}>
                          {entry.content}
                        </p>
                        
                        {entry.content.length > 150 && (
                          <button 
                            onClick={() => toggleExpand(entry.id)}
                            className="text-indigo-500 hover:text-indigo-600 text-sm font-medium mt-2 flex items-center"
                          >
                            {expandedEntryId === entry.id ? (
                              <>
                                Show Less
                                <ChevronUp className="h-4 w-4 ml-1" />
                              </>
                            ) : (
                              <>
                                Read More
                                <ChevronDown className="h-4 w-4 ml-1" />
                              </>
                            )}
                          </button>
                        )}
                        
                        {entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {entry.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DiaryPage;