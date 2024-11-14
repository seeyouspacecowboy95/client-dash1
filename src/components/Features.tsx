import React from 'react';
import { Shield, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-8 h-8 text-orange-600" />,
    title: 'Secure by Design',
    description: 'Enterprise-grade security built into every layer of our platform.',
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-600" />,
    title: 'Lightning Fast',
    description: 'Optimized performance ensuring the fastest possible experience.',
  },
  {
    icon: <Globe className="w-8 h-8 text-orange-600" />,
    title: 'Global Scale',
    description: 'Built to scale globally with reliable infrastructure.',
  },
];

export default function Features() {
  return (
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the tools and features you need to succeed in today's digital landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}