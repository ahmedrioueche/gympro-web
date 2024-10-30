import React, { useState, useRef, useEffect } from 'react';
import { X, Crown, CheckCircle } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const PlansDropDown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const plans: Plan[] = [
    {
      id: 1,
      name: "Starter",
      price: "$9/mo",
      features: [
        "Up to 1,000 messages",
        "Basic support",
        "1 team member"
      ]
    },
    {
      id: 2,
      name: "Pro",
      price: "$29/mo",
      features: [
        "Up to 10,000 messages",
        "Priority support",
        "5 team members",
        "Advanced analytics"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$99/mo",
      features: [
        "Unlimited messages",
        "24/7 support",
        "Unlimited team members",
        "Custom features"
      ]
    }
  ];

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
      className={`absolute left-0 top-16 md:w-96 w-80 bg-light-surface dark:bg-dark-surface rounded-lg shadow-xl transform transition-all duration-300 ease-out origin-top ${
        isOpen 
          ? 'opacity-100 scale-y-100 translate-y-0' 
          : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Crown className="w-5 h-5 text-light-primary dark:text-dark-primary" />
          <h2 className="text-base font-semibold dark:text-white">Manage Plans</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Plans Container */}
      <div className=" scrollbar-hide overflow-auto max-h-96 p-3 space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative border dark:border-gray-700 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer ${
              selectedPlan === plan.id 
                ? 'border-blue-500 dark:border-blue-400 shadow-md' 
                : 'hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-2 right-2">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Popular
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold dark:text-white">{plan.name}</h3>
              <span className="text-lg font-bold text-blue-500">{plan.price}</span>
            </div>
            <ul className="space-y-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t dark:border-gray-700 p-3">
        <button
          className={`w-full py-2 px-4 rounded-lg transition-colors ${
            selectedPlan
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
          disabled={!selectedPlan}
        >
          {selectedPlan ? 'Confirm Selection' : 'Select a Plan'}
        </button>
      </div>
    </div>
  );
};

export default PlansDropDown;