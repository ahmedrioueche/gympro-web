import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Cards';
import { MessageSquare, Star, Send } from 'lucide-react';
import CustomDropdown from '../ui/SelectDropDown';
import gym_1 from "../../assets/images/gym_1.svg";

const categoryOptions = [
  { value: 'general', label: 'General Feedback' },
  { value: 'facilities', label: 'Facilities' },
  { value: 'staff', label: 'Staff & Service' },
  { value: 'classes', label: 'Classes & Programs' },
  { value: 'equipment', label: 'Equipment & Maintenance' }
];

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, feedback, category });
  };

  return (
    <div className="relative w-full bg-light-background dark:bg-dark-background flex items-center justify-center p-6">
      {/* Background image with smooth opacity */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src={gym_1} 
          alt="Gym Background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Main Content Card */}
      <div className="relative z-0 w-full max-w-3xl opacity-90">
        <Card className="bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-10 h-10 text-light-primary dark:text-dark-primary" />
              <div>
                <CardTitle className="text-2xl text-start font-bold text-light-text-primary dark:text-dark-text-primary">
                  We Value Your Feedback
                </CardTitle>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                  Let us know how we can make your experience better.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Rating Section */}
              <div className="space-y-3">
                <label className="block text-start text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                  Rate Your Experience
                </label>
                <div className="flex gap-2 items-center bg-light-background/60 dark:bg-dark-background/60 rounded-lg p-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none transform hover:scale-105 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors duration-200 ${
                          (hoveredRating || rating) >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 hover:text-yellow-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <label className="block text-start text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                  Feedback Category
                </label>
                <CustomDropdown
                  options={categoryOptions}
                  value={category}
                  onChange={setCategory}
                  placeholder="Select a category"
                  className="w-full opacity-100"
                  bgColor="bg-light-background dark:bg-dark-background"
                />
              </div>

              {/* Feedback Text Area */}
              <div className="space-y-3">
                <label className="block text-start text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                  Detailed Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                  className="w-full rounded-lg bg-light-background/60 dark:bg-dark-background/60 px-4 py-3 text-light-text-primary dark:text-dark-text-primary border-none focus:ring-2 focus:ring-dark-primary outline-none resize-none"
                  placeholder="We're all ears! Share your thoughts..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-light-primary dark:bg-dark-primary text-white py-3 px-6 rounded-lg hover:bg-light-secondary hover:dark:bg-dark-secondary transition duration-300 shadow-lg"
              >
                <Send className="w-5 h-5" />
                Submit Feedback
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackPage;