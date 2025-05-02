import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaFile, FaSearch, FaPlus } from 'react-icons/fa';
import Button from '../components/ui/Button';

const LandingPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <FaBookOpen className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-xl font-bold text-purple-600">DOCTALK</h1>
          </div>
          <div className="space-x-2">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Your AI Study Assistant for Document-Based Learning
            </h1>
            <p className="text-lg text-gray-600">
              Upload your study documents and get AI-powered answers to your questions. 
              DocTalk helps you organize, search, and learn from your academic materials.
            </p>
            <div className="space-x-4">
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-3 rounded-md transition-all duration-300">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center animate-pulse">
            <img 
              src="https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Student studying with documents" 
              className="rounded-lg shadow-lg max-w-full h-auto object-cover"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Features</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              DocTalk is designed to make your study experience more efficient and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FaFile className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Document Organization</h3>
              <p className="text-gray-600">
                Organize your study documents by subject for easy access and reference.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FaSearch className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Search</h3>
              <p className="text-gray-600">
                Ask questions about your documents and get intelligent answers from the AI.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FaPlus className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple File Formats</h3>
              <p className="text-gray-600">
                Upload and process PDFs, DOCXs, and other document formats with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your study experience?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join DocTalk today and start getting smarter answers from your study materials.
          </p>
          <Link to="/signup">
            <Button className="bg-white hover:bg-gray-100 px-8 py-3 rounded-md transition-all duration-300 text-black ">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <FaBookOpen className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-lg font-semibold text-purple-600">DocTalk</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">
                © {currentYear} DocTalk. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;