
import React from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/context/LanguageContext';

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

interface RatingSummary {
  average: number;
  total: number;
  distribution: number[];
}

interface ProductReviewsProps {
  summary: RatingSummary;
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ summary, reviews }) => {
  const { t, direction } = useLanguage();
  
  return (
    <div className="space-y-8" dir={direction}>
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="text-center md:text-left md:pr-8 md:border-r md:border-gray-200">
          <div className="text-4xl font-bold">{summary.average.toFixed(1)}</div>
          <div className="flex justify-center md:justify-start">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-5 w-5 ${i < Math.floor(summary.average) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {/* Fix: Using a template string to format the message instead of passing multiple arguments to t() */}
            {t('product.basedOnReviews').replace('{}', summary.total.toString())}
          </div>
        </div>
        
        <div className="flex-grow">
          {/* Rating Distribution */}
          {summary.distribution.map((count, index) => {
            const starCount = 5 - index;
            const percentage = summary.total > 0 
              ? Math.round((count / summary.total) * 100) 
              : 0;
            
            return (
              <div key={starCount} className="flex items-center mb-1">
                <span className="w-10 text-sm text-right">{starCount} ★</span>
                <div className="flex-grow mx-3">
                  <Progress value={percentage} className="h-2" />
                </div>
                <span className="w-10 text-sm">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Review List */}
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={review.author.avatar} alt={review.author.name} />
                  <AvatarFallback>{review.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.author.name}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            
            {review.verified && (
              <div className="text-xs text-green-600 font-medium mb-2">
                ✓ {t('product.verifiedPurchase')}
              </div>
            )}
            
            <h4 className="font-medium mb-1">{review.title}</h4>
            <p className="text-gray-700 mb-3">{review.content}</p>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{t('product.helpful')} ({review.helpful})</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Flag className="h-4 w-4 mr-1" />
                <span>{t('product.report')}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Write Review */}
      <div className="text-center mt-6">
        <Button>
          {t('product.writeReview')}
        </Button>
      </div>
    </div>
  );
};

export default ProductReviews;
