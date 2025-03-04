import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, Calendar, Clock, ArrowRight, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Organize Your Life, <span className="text-indigo-500">One Day</span> at a Time
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Memento helps you manage your tasks and capture your thoughts in a beautiful, intuitive interface.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/dashboard" className="btn btn-primary text-center">
                  Get Started
                </Link>
                <a href="#features" className="btn btn-outline text-center">
                  Learn More
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Organized desk with notebook and coffee" 
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay organized and capture your thoughts in one beautiful application.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="card p-6"
              variants={fadeIn}
            >
              <div className="bg-indigo-100 p-3 rounded-full w-fit mb-4">
                <CheckCircle className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart To-Do Lists</h3>
              <p className="text-gray-600">
                Create, organize, and prioritize your tasks with our intuitive to-do list manager.
              </p>
            </motion.div>
            
            <motion.div 
              className="card p-6"
              variants={fadeIn}
            >
              <div className="bg-indigo-100 p-3 rounded-full w-fit mb-4">
                <BookOpen className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Beautiful Diary</h3>
              <p className="text-gray-600">
                Capture your thoughts, memories, and reflections in our elegant digital diary.
              </p>
            </motion.div>
            
            <motion.div 
              className="card p-6"
              variants={fadeIn}
            >
              <div className="bg-indigo-100 p-3 rounded-full w-fit mb-4">
                <Calendar className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Calendar Integration</h3>
              <p className="text-gray-600">
                View your tasks and diary entries in a beautiful calendar interface.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with Memento is easy. Follow these simple steps to organize your life.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center"
              variants={fadeIn}
            >
              <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-indigo-500">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Create an Account</h3>
              <p className="text-gray-600">
                Sign up for a free account to get started with Memento.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              variants={fadeIn}
            >
              <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-indigo-500">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Add Your Tasks</h3>
              <p className="text-gray-600">
                Create and organize your to-do lists with our intuitive interface.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              variants={fadeIn}
            >
              <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-2xl font-bold text-indigo-500">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Write Your Diary</h3>
              <p className="text-gray-600">
                Capture your thoughts and memories in our beautiful diary interface.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our users have to say about Memento.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="card p-6"
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "Memento has completely transformed how I organize my day. The interface is beautiful and intuitive."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-indigo-500">SL</span>
                </div>
                <div>
                  <p className="font-medium">Sarah L.</p>
                  <p className="text-sm text-gray-500">Product Designer</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="card p-6"
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "I've tried many to-do apps, but Memento is by far the best. The diary feature is a game-changer."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-indigo-500">MJ</span>
                </div>
                <div>
                  <p className="font-medium">Michael J.</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="card p-6"
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "As a student, Memento helps me stay organized and focused. I love the clean design and ease of use."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-indigo-500">AT</span>
                </div>
                <div>
                  <p className="font-medium">Aisha T.</p>
                  <p className="text-sm text-gray-500">Graduate Student</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Organized?</h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Join thousands of users who are already using Memento to organize their lives and capture their thoughts.
            </p>
            <Link to="/dashboard" className="btn bg-white text-indigo-600 hover:bg-indigo-50 inline-flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;