import React, { useState, useRef, useEffect } from 'react';
import { X, Crown, CheckCircle } from 'lucide-react';
import { dict } from '../../../lib/dict';
import { useLanguage } from '../../../context/LanguageContext';

interface Plan {
  id: number;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface TrialDropDownProps {
  isOpen: boolean;
  onClose: () => void;
}


const TrialDropDown: React.FC<TrialDropDownProps> = ({ isOpen, onClose }) => {
  const selectedLanguage = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const plans: Plan[] = [
    {
      id: 1,
      name: dict[selectedLanguage].plans[0].name,
      price: dict[selectedLanguage].plans[0].price,
      features: [
        dict[selectedLanguage].plansFeatures[0],
        dict[selectedLanguage].plansFeatures[1],
        dict[selectedLanguage].plansFeatures[2]
      ]
    },
    {
      id: 2,
      name: dict[selectedLanguage].plans[1].name,
      price: dict[selectedLanguage].plans[1].price,
      features: [
        dict[selectedLanguage].plansFeatures[3],
        dict[selectedLanguage].plansFeatures[4],
        dict[selectedLanguage].plansFeatures[5],
        dict[selectedLanguage].plansFeatures[6]
      ],
      popular: true
    },
    {
      id: 3,
      name: dict[selectedLanguage].plans[2].name,
      price: dict[selectedLanguage].plans[2].price,
      features: [
        dict[selectedLanguage].plansFeatures[7],
        dict[selectedLanguage].plansFeatures[8],
        dict[selectedLanguage].plansFeatures[9],
        dict[selectedLanguage].plansFeatures[10],
        dict[selectedLanguage].plansFeatures[11]
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={dropdownRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold">{dict[selectedLanguage].chooseYourPlan}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                selectedPlan === plan.id ? 'border-blue-500 shadow-md' : 'border-gray-200'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                    {dict[selectedLanguage].popular}
                  </span>
                </div>
              )}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">{plan.price}</p>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-4 py-2 px-4 rounded-lg transition-colors ${
                  selectedPlan === plan.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {selectedPlan === plan.id ? dict[selectedLanguage].selected : dict[selectedLanguage].selectPlan}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {dict[selectedLanguage].cancel}
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedPlan
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedPlan}
          >
            {dict[selectedLanguage].confirmSelection}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialDropDown;
