
import React, { useState } from 'react';
import { Star, X, Send, MessageSquarePlus } from 'lucide-react';
import { dbService } from '../services/db';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, userEmail }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        await dbService.saveFeedback(userEmail, {
            rating,
            comment,
            date: new Date().toISOString()
        });
        alert("Thank you for your feedback!");
    } catch (e) {
        alert("Failed to save feedback. Please try again.");
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 flex justify-between items-start">
          <div className="text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageSquarePlus size={24} /> Course Feedback
            </h2>
            <p className="text-indigo-200 text-sm mt-1">Help us improve the AI Foundations course.</p>
          </div>
          <button onClick={onClose} className="text-indigo-200 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          
          {/* Star Rating */}
          <div className="mb-6 text-center">
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                Rate your experience
            </label>
            <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                    >
                        <Star 
                            size={32} 
                            className={`transition-colors ${
                                star <= (hoverRating || rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-slate-300'
                            }`} 
                        />
                    </button>
                ))}
            </div>
            <p className="text-xs text-slate-400 mt-2 h-4">
                {hoverRating === 1 && "Poor"}
                {hoverRating === 2 && "Fair"}
                {hoverRating === 3 && "Good"}
                {hoverRating === 4 && "Very Good"}
                {hoverRating === 5 && "Excellent!"}
            </p>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
                Comments or Suggestions
            </label>
            <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like? What can we improve?"
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] text-slate-700 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-colors"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                disabled={rating === 0 || isSubmitting}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
            >
                {isSubmitting ? 'Sending...' : <><Send size={16} /> Submit Feedback</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
