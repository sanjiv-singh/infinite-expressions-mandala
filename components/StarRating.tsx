
import React, { useState } from 'react';
import { StarIcon } from './IconComponents';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: string;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = 'w-5 h-5',
  onRatingChange,
  readOnly = true,
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (index: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        const currentRating = hoverRating || rating;
        
        let starColor = 'text-gray-600'; // Empty star
        if (currentRating >= starValue) {
          starColor = 'text-primary-accent'; // Filled star
        }

        return (
          <div
            key={starValue}
            className={`cursor-${readOnly ? 'default' : 'pointer'}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            <StarIcon className={`${size} ${starColor}`} />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
