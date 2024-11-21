import React from 'react';
import { Shield, Zap, Globe, Users, BarChart, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: <Shield className="w-8 h-8 text-orange-600" />,
    title: 'Secure Services',
    description: 'Protected digital services with state-of-the-art security measures.',
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-600" />,
    title: 'Quick Response',
    description: 'Fast and efficient handling of community requests and services.',
  },
  {
    icon: <Globe className="w-8 h-8 text-orange-600" />,
    title: 'Digital Access',
    description: '24/7 online access to municipal services and information.',
  },
  {
    icon: <Users className="w-8 h-8 text-orange-600" />,
    title: 'Community First',
    description: 'Focused on serving and empowering our local community.',
  },
  {
    icon: <BarChart className="w-8 h-8 text-orange-600" />,
    title: 'Transparent Governance',
    description: 'Clear reporting and accountability in all operations.',
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-orange-600" />,
    title: 'Collaborative Growth',
    description: 'Working together for sustainable community development.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Empowering Our Community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern solutions for a connected and thriving municipality
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4 p-3 bg-orange-50 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}