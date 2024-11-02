import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot } from 'lucide-react';
import { dict } from '../../lib/dict';
import { useLanguage } from '../../context/LanguageContext';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const ChatbotDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const selectedLanguage = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: dict[selectedLanguage].assistantGreeting, isBot: true },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user's message to the chat
    setMessages(prev => [...prev, { id: Date.now(), text: inputMessage, isBot: false }]);
    setInputMessage('');

    // Simulate bot response with a random message from chatbotReplies
    setTimeout(() => {
      const replies = dict[selectedLanguage].chatbotReplies;
      const randomKey = Object.keys(replies)[Math.floor(Math.random() * Object.keys(replies).length)];
      const randomReply = replies[randomKey];

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: randomReply,
          isBot: true,
        },
      ]);
    }, 1000);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute light-scrollbar dark:dark-scrollbar right-0 top-16 w-80 md:w-96 z-100 bg-light-surface dark:bg-dark-surface rounded-lg shadow-xl transform transition-all duration-300 ease-out origin-top ${
        isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-500" />
          <h2 className="text-base font-semibold dark:text-white">{dict[selectedLanguage].botTitle}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="h-80 overflow-y-auto p-3 space-y-3">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[80%] rounded-lg p-2 text-sm text-start ${
                message.isBot
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t dark:border-gray-700 p-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
            placeholder={dict[selectedLanguage].botPlaceholder}
            className="flex-1 p-2 text-sm border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotDropdown;
