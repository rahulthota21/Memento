import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Calendar, 
  Clock, 
  BarChart3, 
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data
const mockTasks = [
  { id: 1, title: 'Complete project proposal', completed: true, dueDate: '2025-06-15' },
  { id: 2, title: 'Review client feedback', completed: false, dueDate: '2025-06-16' },
  { id: 3, title: 'Prepare presentation slides', completed: false, dueDate: '2025-06-17' },
  { id: 4, title: 'Schedule team meeting', completed: true, dueDate: '2025-06-15' },
];

const mockDiaryEntries = [
  { id: 1, title: 'A productive day', content: 'Today was incredibly productive. I managed to complete all my tasks ahead of schedule.', date: '2025-06-14' },
  { id: 2, title: 'New project ideas', content: 'Had a brainstorming session and came up with some exciting new project ideas.', date: '2025-06-13' },
];

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [diaryEntries, setDiaryEntries] = useState(mockDiaryEntries);
  const [newTask, setNewTask] = useState('');
  
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM do, yyyy');
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
      dueDate: format(today, 'yyyy-MM-dd')
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">{formattedDate}</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div 
              className="card p-6 border-l-4 border-indigo-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 mb-1">Tasks Completed</p>
                  <h3 className="text-2xl font-bold">{completedTasks}/{totalTasks}</h3>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-indigo-500" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full" 
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{completionRate}% completed</p>
            </motion.div>
            
            <motion.div 
              className="card p-6 border-l-4 border-orange-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 mb-1">Diary Entries</p>
                  <h3 className="text-2xl font-bold">{diaryEntries.length}</h3>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Last entry: {diaryEntries.length > 0 ? format(new Date(diaryEntries[0].date), 'MMM do, yyyy') : 'No entries yet'}
              </p>
            </motion.div>
            
            <motion.div 
              className="card p-6 border-l-4 border-green-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 mb-1">Streak</p>
                  <h3 className="text-2xl font-bold">7 days</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">Keep it up! You're on a roll.</p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tasks Section */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Today's Tasks</h2>
                  <a href="/todos" className="text-indigo-500 hover:text-indigo-600 text-sm font-medium">
                    View All
                  </a>
                </div>
                
                <form onSubmit={addTask} className="mb-6">
                  <div className="flex">
                    <input
                      type="text"
                      className="input flex-grow"
                      placeholder="Add a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="ml-2 bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <Plus className="h-6 w-6" />
                    </button>
                  </div>
                </form>
                
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div 
                      key={task.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <button 
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="mr-3 text-gray-400 hover:text-indigo-500 transition-colors"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>
                        <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-4">
                          {format(new Date(task.dueDate), 'MMM d')}
                        </span>
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {tasks.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      No tasks for today. Add a new task to get started!
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Diary Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Recent Diary Entries</h2>
                  <a href="/diary" className="text-indigo-500 hover:text-indigo-600 text-sm font-medium">
                    View All
                  </a>
                </div>
                
                <div className="space-y-4">
                  {diaryEntries.map(entry => (
                    <div key={entry.id} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{entry.title}</h3>
                        <span className="text-xs text-gray-500">
                          {format(new Date(entry.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{entry.content}</p>
                      <a 
                        href={`/diary/${entry.id}`} 
                        className="text-indigo-500 text-sm font-medium mt-2 inline-block hover:text-indigo-600"
                      >
                        Read more
                      </a>
                    </div>
                  ))}
                  
                  {diaryEntries.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      No diary entries yet. Start writing today!
                    </div>
                  )}
                </div>
                
                <a 
                  href="/diary/new" 
                  className="btn btn-outline w-full mt-6 flex items-center justify-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Write New Entry
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;