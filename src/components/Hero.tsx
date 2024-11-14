import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-orange-50 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome To The Mokohare Client Portal
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empower your journey with cutting-edge solutions designed to elevate
            your digital presence and drive success.
          </p>
          <button className="bg-orange-600 text-white px-8 py-3 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors mx-auto">
            <span>Get Started</span>
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="mt-16">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
            alt="Hero"
            className="rounded-xl shadow-2xl w-full object-cover max-h-[600px]"
          />
        </div>
      </div>
    </div>
  );
}
