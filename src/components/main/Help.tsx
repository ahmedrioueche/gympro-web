import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Cards';
import { Search, Book, Star, Dumbbell, Calendar, Users, HelpCircle, ArrowRight } from 'lucide-react';
import gym_2 from "../../assets/images/gym_2.svg";

interface HelpTopic {
  id: number;
  title: string;
  icon: React.JSX.Element;
  content: string;
  tags: string[];
}

const helpTopics: HelpTopic[] = [
  {
    id: 1,
    title: 'Membership & Plans',
    icon: <Users className="w-6 h-6" />,
    content: 'Learn about our membership options, pricing, and exclusive benefits.',
    tags: ['membership', 'pricing', 'plans', 'benefits']
  },
  {
    id: 2,
    title: 'Class Schedules',
    icon: <Calendar className="w-6 h-6" />,
    content: 'Find information about class timings, bookings, and instructor details.',
    tags: ['classes', 'schedule', 'booking', 'timing']
  },
  {
    id: 3,
    title: 'Equipment Usage',
    icon: <Dumbbell className="w-6 h-6" />,
    content: 'Get guidance on proper equipment usage and safety guidelines.',
    tags: ['equipment', 'machines', 'safety', 'workout']
  },
  {
    id: 4,
    title: 'Getting Started',
    icon: <Star className="w-6 h-6" />,
    content: 'New member guide with essential information to begin your fitness journey.',
    tags: ['beginners', 'start', 'guide', 'introduction']
  }
];

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredTopics = helpTopics.filter(topic => {
    const searchLower = searchQuery.toLowerCase();
    return (
      topic.title.toLowerCase().includes(searchLower) ||
      topic.content.toLowerCase().includes(searchLower) ||
      topic.tags.some(tag => tag.includes(searchLower))
    );
  });

  return (
    <div className="relative min-h-screen w-full bg-light-backround dark:bg-dark-backround flex items-center justify-center p-6">
       {/* Background image with smooth opacity */}
       <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src={gym_2} 
          alt="Gym Background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-0 w-full max-w-4xl opacity-90">
        <Card className="bg-light-surface dark:bg-dark-surface backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border-0">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-8 py-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-start font-bold text-gray-800 dark:text-white">
                  How can we help you?
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Search our help center or browse common topics below
                </p>
              </div>
            </div>

            {/* Search Section */}
            <div className={`relative mb-8 transition-all duration-300 ${
              searchFocused ? 'transform -translate-y-2' : ''
            }`}>
              <div className="absolute inset-y-0 left-4 flex items-center">
                <Search className={`w-5 h-5 transition-colors duration-300 ${
                  searchFocused ? 'text-light-secondary dark:text-dark-secondary' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                placeholder="Type your question or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl 
                          border-2 border-transparent focus:border-light-secondary dark:focus:border-dark-secondary
                          outline-none transition-all duration-300
                          text-gray-800 dark:text-gray-200 placeholder-gray-400
                          shadow-sm hover:shadow-md focus:shadow-lg"
              />
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="group p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl
                            hover:bg-white dark:hover:bg-gray-700/50
                            transform hover:-translate-y-1 transition-all duration-300
                            cursor-pointer shadow-sm hover:shadow-md"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg
                                  group-hover:bg-gradient-to-br from-purple-500 to-blue-500
                                  transition-all duration-300">
                      {topic.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {topic.content}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-light-secondary hover:text-light-accentSecondar duration-300
                                    opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Book className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Quick Links
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Getting Started', 'FAQs', 'Contact Support', 'Training Videos', 'Safety Guidelines'].map((link) => (
                  <button
                    key={link}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg
                              text-sm text-gray-600 dark:text-gray-300
                              hover:bg-purple-100 dark:hover:bg-purple-900/30
                              hover:text-light-secondary dark:hover:text-dark-secondary
                              transition-all duration-300"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpPage;