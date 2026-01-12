'use client';

import { useState, useEffect } from 'react';

interface Review {
  id?: string;
  name: string;
  email: string;
  review: string;
  date: string;
  avatar?: string;
}

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Load reviews from localStorage and add demo reviews
  useEffect(() => {
    // Get all user-specific review storage keys
    const allReviews: Review[] = [];

    // Iterate through localStorage to find all user review collections
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('reviews_')) {
        try {
          const storedUserReviews = JSON.parse(localStorage.getItem(key) || '[]');
          allReviews.push(...storedUserReviews);
        } catch (e) {
          console.error('Error parsing reviews from localStorage:', e);
        }
      }
    }

    // Add some demo reviews if no user reviews exist
    if (allReviews.length === 0) {
      const demoReviews: Review[] = [
        {
          id: 'demo1',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          review: 'This app has completely transformed how I manage my daily tasks. The interface is intuitive and the features are robust. Highly recommend!',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: 'https://via.placeholder.com/100x100/4f46e5/ffffff?text=AJ'
        },
        {
          id: 'demo2',
          name: 'Maria Garcia',
          email: 'maria@example.com',
          review: 'I love how easy it is to organize my tasks by priority and due date. The notification system keeps me on track with deadlines.',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: 'https://via.placeholder.com/100x100/ec4899/ffffff?text=MG'
        },
        {
          id: 'demo3',
          name: 'David Smith',
          email: 'david@example.com',
          review: 'The productivity boost I\'ve experienced since using this app is incredible. My work-life balance has improved significantly.',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: 'https://via.placeholder.com/100x100/0ea5e9/ffffff?text=DS'
        },
        {
          id: 'demo4',
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          review: 'Finally, a task manager that actually makes sense. The clean design and smart features make it a joy to use every day.',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: 'https://via.placeholder.com/100x100/10b981/ffffff?text=SW'
        },
        {
          id: 'demo5',
          name: 'James Brown',
          email: 'james@example.com',
          review: 'I\'ve tried many task management apps, but this one stands out. The collaborative features are perfect for team projects.',
          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          avatar: 'https://via.placeholder.com/100x100/f97316/ffffff?text=JB'
        }
      ];

      allReviews.push(...demoReviews);
    }

    // Remove duplicates by userId/email
    const uniqueReviews = allReviews.filter((review, index, self) =>
      index === self.findIndex(r => r.email === review.email)
    );

    setReviews(uniqueReviews);
  }, []);

  // Auto-rotate the carousel
  useEffect(() => {
    if (reviews.length <= 1 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % reviews.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600">No reviews yet. Be the first to share your experience!</p>
        </div>
      </div>
    );
  }

  // Show 3 reviews at a time
  const visibleReviews = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % reviews.length;
    visibleReviews.push(reviews[index]);
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600">Join thousands of satisfied users who transformed their productivity</p>
        </div>

        <div className="relative">
          {/* Reviews Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {visibleReviews.map((review, index) => (
              <div key={`${review.id}-${index}`} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.review}"</p>
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium mr-3"
                    style={{ backgroundColor: review.avatar ? 'transparent' : '#4F46E5' }}
                  >
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      review.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  Math.abs(currentIndex - index) % reviews.length < 3
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg z-10"
            aria-label="Previous review"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg z-10"
            aria-label="Next review"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}