'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import clsx from 'clsx';
import { testimonials } from '../../lib/data';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, role, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentCardRef = cardRef.current; // Store the current ref value

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={clsx(
        'flex flex-col p-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-800 dark:via-blue-900 dark:to-gray-800 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out',
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      )}
    >
      <div className="flex items-start text-white mb-6">
        <FaQuoteLeft className="text-3xl text-blue-200 dark:text-blue-400" />
        <p className="ml-3 text-lg font-light text-blue-100 dark:text-blue-300">{quote}</p>
        <FaQuoteRight className="text-3xl ml-2 text-blue-200 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mt-6 text-blue-100 dark:text-blue-300">{author}</h3>
      <p className="text-blue-300 dark:text-blue-400">{role}</p>
    </div>
  );
};

const Testimonial: React.FC = () => {
  return (
    <section className="py-16 bg-light-background dark:bg-dark-background mb-0">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-700 dark:text-blue-400">
          What Our Members Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
