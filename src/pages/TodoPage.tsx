import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Calendar, 
  Clock, 
  Filter, 
  Trash2, 
  Edit,
  X,
  Save
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data
const initialTasks = [
  { id: 1, title: 'Complete project proposal', completed: true, dueDate: '2025-06-15', priority: 'high', category: 'work' },
  { id: 2, title: 'Review client feedback', completed: false, dueDate: '2025-06-16', priority: 'medium', category: 'work' },
  { id: 3, title: 'Prepare presentation slides', completed: false, dueDate: '2025-06-17', priority: 'high', category: 'work' },
  { id: 4, title: 'Schedule team meeting', completed: true, dueDate: '2025-06-15', priority: 'low', category: 'work' },
  { id: 5, title: 'Buy groceries', completed: false, dueDate: '2025-06-15', priority: 'medium', category: 'personal' },
  { id: 6, title: 'Go for a run', completed: false, dueDate: '2025-06-15', priority: 'low', category: 'health' },
  { id: 7, title: 'Read 30 pages', completed: false, dueDate: '2025-06-16', priority: 'medium', category: 'personal' },
  { id: 8, title: 'Call mom', completed: false, dueDate: '2025-06-17', priority: 'high', category: 'personal' },
];

type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: string;
  category: string;
};

type EditingTask = Task | null;

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskCategory, setNewTaskCategory] = useState('personal');
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingTask, setEditingTask] = useState<EditingTask>(null);
  
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
      dueDate: newTaskDueDate,
      priority: newTaskPriority,
      category: newTaskCategory
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };
  
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const startEditingTask = (task: Task) => {
    setEditingTask(task);
  };
  
  const cancelEditing = () => {
    setEditingTask(null);
  };
  
  const saveEditedTask = () => {
    if (!editingTask) return;
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    
    setEditingTask(null);
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  }).filter(task => {
    if (categoryFilter === 'all') return true;
    return task.category === categoryFilter;
  });
  
  const categories = [...new Set(tasks.map(task => task.category))];
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">To-Do List</h1>
            <p className="text-gray-600">Organize and manage your tasks efficiently</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div 
                className="card p-6 sticky top-24"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-lg font-bold mb-4">Filters</h2>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                  <div className="space-y-2">
                    <button 
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
                      onClick={() => setFilter('all')}
                    >
                      All Tasks
                    </button>
                    <button 
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'active' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
                      onClick={() => setFilter('active')}
                    >
                      Active
                    </button>
                    <button 
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'completed' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
                      onClick={() => setFilter('completed')}
                    >
                      Completed
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Categories</h3>
                  <div className="space-y-2">
                    <button 
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${categoryFilter === 'all' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
                      onClick={() => setCategoryFilter('all')}
                    >
                      All Categories
                    </button>
                    {categories.map(category => (
                      <button 
                        key={category}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${categoryFilter === category ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-100'}`}
                        onClick={() => setCategoryFilter(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div 
                className="card p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-lg font-bold mb-4">Add New Task</h2>
                
                <form onSubmit={addTask}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
                        Task Title
                      </label>
                      <input
                        id="task-title"
                        type="text"
                        className="input"
                        placeholder="Enter task title..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                      </label>
                      <input
                        id="due-date"
                        type="date"
                        className="input"
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        id="priority"
                        className="input"
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        className="input"
                        value={newTaskCategory}
                        onChange={(e) => setNewTaskCategory(e.target.value)}
                      >
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-full">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Task
                  </button>
                </form>
              </motion.div>
              
              <motion.div 
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Tasks ({filteredTasks.length})</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Filter className="h-4 w-4 mr-1" />
                    <span>
                      {filter === 'all' ? 'All Tasks' : filter === 'completed' ? 'Completed' : 'Active'}
                      {categoryFilter !== 'all' && ` • ${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}`}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredTasks.map(task => (
                    <div 
                      key={task.id} 
                      className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors"
                    >
                      {editingTask && editingTask.id === task.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            className="input"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                          />
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Due Date</label>
                              <input
                                type="date"
                                className="input"
                                value={editingTask.dueDate}
                                onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Priority</label>
                              <select
                                className="input"
                                value={editingTask.priority}
                                onChange={(e) => setEditingTask({...editingTask, priority: e.target.value})}
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Category</label>
                            <select
                              className="input"
                              value={editingTask.category}
                              onChange={(e) => setEditingTask({...editingTask, category: e.target.value})}
                            >
                              <option value="personal">Personal</option>
                              <option value="work">Work</option>
                              <option value="health">Health</option>
                              <option value="education">Education</option>
                            </select>
                          </div>
                          
                          <div className="flex space-x-2 mt-3">
                            <button 
                              onClick={saveEditedTask}
                              className="btn btn-primary py-1 px-3 text-sm"
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </button>
                            <button 
                              onClick={cancelEditing}
                              className="btn btn-outline py-1 px-3 text-sm"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
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
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => startEditingTask(task)}
                                className="text-gray-400 hover:text-indigo-500 transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => deleteTask(task.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                              <span className="text-gray-500">
                                {format(new Date(task.dueDate), 'MMM d, yyyy')}
                              </span>
                            </div>
                            
                            <div className={`px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </div>
                            
                            <div className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {filteredTasks.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                      <div className="mb-3">
                        <CheckCircle2 className="h-12 w-12 mx-auto text-gray-300" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No tasks found</h3>
                      <p className="text-sm">
                        {filter === 'all' 
                          ? 'Add a new task to get started!' 
                          : filter === 'completed' 
                            ? 'You have no completed tasks yet.' 
                            : 'You have no active tasks.'}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TodoPage;