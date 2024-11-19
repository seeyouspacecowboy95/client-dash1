import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ChangeLogEntry {
  version: string;
  date: string;
  changes: {
    type: 'added' | 'fixed' | 'changed' | 'removed';
    description: string;
    emoji?: string;
  }[];
}

const changeLogData: ChangeLogEntry[] = [
  {
    version: '1.2.0',
    date: 'March 15, 2024',
    changes: [
      { type: 'added', description: 'Dark mode support', emoji: '🌙' },
      { type: 'added', description: 'New dashboard analytics', emoji: '📊' },
      { type: 'fixed', description: 'Mobile navigation issues', emoji: '🔧' },
    ]
  },
  {
    version: '1.1.0',
    date: 'March 1, 2024',
    changes: [
      { type: 'added', description: 'Theme color customization', emoji: '🎨' },
      { type: 'changed', description: 'Improved performance', emoji: '⚡' },
      { type: 'fixed', description: 'Data loading issues', emoji: '🐛' },
    ]
  },
  {
    version: '1.0.0',
    date: 'February 15, 2024',
    changes: [
      { type: 'added', description: 'Initial release', emoji: '🚀' },
      { type: 'added', description: 'Basic dashboard features', emoji: '📱' },
      { type: 'added', description: 'User authentication', emoji: '🔒' },
    ]
  }
];

const ChangeLog: React.FC = () => {
  const { isDarkMode, themeColor } = useTheme();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'text-green-500';
      case 'fixed':
        return 'text-blue-500';
      case 'changed':
        return 'text-yellow-500';
      case 'removed':
        return 'text-red-500';
      default:
        return `text-${themeColor}-500`;
    }
  };

  return (
    <div className={`max-w-3xl mx-auto p-6 ${isDarkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-sm`}>
      <h1 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-900'}`}>
        Changelog
      </h1>
      
      <div className="space-y-8">
        {changeLogData.map((release, index) => (
          <div key={index} className="relative">
            {/* Version timeline connector */}
            {index !== changeLogData.length - 1 && (
              <div className={`absolute left-4 top-8 bottom-0 w-px ${isDarkMode ? 'bg-dark-border' : 'bg-gray-200'}`} />
            )}
            
            <div className="flex items-start">
              {/* Version badge */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${isDarkMode ? `bg-${themeColor}-400` : `bg-${themeColor}-500`} flex items-center justify-center`}>
                <span className="text-white text-sm">v{release.version.split('.')[0]}</span>
              </div>
              
              <div className="ml-6">
                {/* Version header */}
                <div className="flex items-baseline">
                  <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-900'}`}>
                    Version {release.version}
                  </h2>
                  <span className={`ml-4 text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-500'}`}>
                    {release.date}
                  </span>
                </div>
                
                {/* Changes list */}
                <ul className="mt-4 space-y-3">
                  {release.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start">
                      <span className="mr-2 text-xl" role="img" aria-label={change.type}>
                        {change.emoji}
                      </span>
                      <div>
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getTypeColor(change.type)} bg-opacity-10 capitalize`}>
                          {change.type}
                        </span>
                        <span className={`ml-2 ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'}`}>
                          {change.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeLog;