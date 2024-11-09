import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot } from 'lucide-react';
import { dict } from '../../utils/dict';
import { useLanguage } from '../../context/LanguageContext';
import { getGeminiCBReply } from '../../utils/gemini';
import { FaTrash } from 'react-icons/fa';

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
    const storedConversation = localStorage.getItem('conversationHistory');
    if (storedConversation) {
      let conversation = JSON.parse(storedConversation);
      // Ensure the welcome message is always at the top
      if (conversation[0]?.text !== dict[selectedLanguage].assistantGreeting) {
        conversation = [
          { id: Date.now(), text: dict[selectedLanguage].assistantGreeting, isBot: true },
          ...conversation,
        ];
      }
      setMessages(conversation);
    } else {
      // If no conversation history, set the welcome message as the first message
      setMessages([{ id: Date.now(), text: dict[selectedLanguage].assistantGreeting, isBot: true }]);
    }
    scrollToBottom();
  }, [selectedLanguage]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get chatbot replies based on the selected language
    const replies = dict[selectedLanguage].chatbotReplies;

    // Don't proceed if the input message is empty
    if (!inputMessage.trim()) return;

    // Add user's message to the conversation
    const userMessage = { id: Date.now(), text: inputMessage, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    // Clear the input field after submitting
    setInputMessage('');

    // Get chatbot reply handler
    const getCBReply = async () => {
      const response = await getGeminiCBReply(inputMessage);
      console.log('getCBReply response:', response);
      return response; // Ensure you return the response here
    };

    // Retrieve the current conversation history from localStorage
    let conversationHistory = JSON.parse(localStorage.getItem('conversationHistory') || '[]');

    // Add user's message to the conversation history
    conversationHistory.push(userMessage);

    // Get bot's reply (if any)
    let chatBotReply = (await getCBReply()) || '';

    // If no response, fallback to a random reply
    if (!chatBotReply?.trim()) {
      const randomKey = Object.keys(replies)[Math.floor(Math.random() * Object.keys(replies).length)];
      chatBotReply = replies[randomKey];
    }

    // Add chatbot's reply to the conversation
    const botMessage = {
      id: Date.now() + 1,
      text: chatBotReply,
      isBot: true,
    };
    conversationHistory.push(botMessage);

    // Update the conversation history in localStorage
    localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));

    // Update the state to render the new conversation
    setMessages(conversationHistory);
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

  const clearConvo = () => {
    localStorage.removeItem('conversationHistory');
    setMessages([]);
  };

  return (
    <div
      ref={dropdownRef}
      className={`light-scrollbar dark:dark-scrollbar z-100 absolute right-0 top-16 w-80 origin-top transform rounded-lg bg-light-surface shadow-xl transition-all duration-300 ease-out dark:bg-dark-surface md:right-12 md:w-96 ${
        isOpen ? 'translate-y-0 scale-y-100 opacity-100' : 'pointer-events-none -translate-y-4 scale-y-0 opacity-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b p-3 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-500" />
          <h2 className="text-base font-semibold dark:text-white">{dict[selectedLanguage].botTitle}</h2>
        </div>
        <div className="flex flex-row space-x-2">
          {messages.length > 0 && (
            <button
              onClick={clearConvo}
              className="rounded-full p-1 text-gray-500 transition-colors duration-200 hover:cursor-pointer hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600"
            >
              <FaTrash />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 space-y-3 overflow-y-auto p-3">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`w-fit min-w-[60px] max-w-[80%] rounded-lg p-2 text-start text-sm ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
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
      <form onSubmit={handleSubmit} className="border-t p-3 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
            placeholder={dict[selectedLanguage].botPlaceholder}
            className="flex-1 rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotDropdown;
