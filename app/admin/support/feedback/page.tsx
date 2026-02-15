'use client';
import { useState, useEffect } from 'react';
import { FeedbackService } from '@/lib/services/feedbackService';
import { Feedback } from '@/lib/types';
import AdminButton from '@/components/admin/AdminButton';
import { BiSolidStar } from 'react-icons/bi';
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler';

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterByCategory, setFilterByCategory] = useState<string>('all');

  useEffect(() => {
    fetchFeedback();
  }, [filterByCategory]);

  const fetchFeedback = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data: Feedback[];
      if(filterByCategory === 'all')
         data = await FeedbackService.getAll();
      else
         data = await FeedbackService.getByCategory(filterByCategory);
      setFeedbacks(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to fetch feedback. Please try again.'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    
    try {
      await FeedbackService.delete(id);
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    } catch (err) {
      const errorMessage = getErrorMessage(err, 'Failed to delete feedback. Please try again.');
      alert(errorMessage);
      console.error(err);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-400';
    if (rating >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredFeedbacks = filterByCategory === 'all' 
    ? feedbacks 
    : feedbacks.filter(f => f.category === filterByCategory);

    // Calculate average of ratings and total feedbacks
  const stats = {
    total: feedbacks.length,
    avgRating: feedbacks.length > 0 
      ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)
      : '0',
    byCategory: feedbacks.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Feedback</h1>
        
        <select
          value={filterByCategory}
          onChange={(e) => setFilterByCategory(e.target.value)}
          className="px-4 py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 rounded text-sm text-indigo-200 cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="general">General</option>
          <option value="gameplay">Gameplay</option>
          <option value="graphics">Graphics & UI</option>
          <option value="audio">Audio & Music</option>
          <option value="community">Community & Forum</option>
          <option value="feature">Feature Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-600/50 text-red-200 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-900/30 p-4 rounded border border-indigo-700 text-center">
          <p className="text-sm text-indigo-400">Total Feedback</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-indigo-900/30 p-4 rounded border border-indigo-700 text-center">
          <p className="text-sm text-indigo-400">Average Rating</p>
          <p className={`text-2xl font-bold ${getRatingColor(parseFloat(stats.avgRating))}`}>{stats.avgRating}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-indigo-300">Loading feedback...</div>
      ) : filteredFeedbacks.length === 0 ? (
        <div className="text-center py-8 text-indigo-400">No feedback found.</div>
      ) : (
        <div className="space-y-3">
          {filteredFeedbacks.map(feedback => (
            <div key={feedback.id} className="bg-indigo-900/30 p-4 rounded border border-indigo-700">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-indigo-100">{feedback.title}</h3>
                  <p className="text-sm text-indigo-400 mt-1">
                    {feedback.username} • {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className={`flex items-center gap-1 text-lg font-bold ${getRatingColor(feedback.rating)}`}>
                    <BiSolidStar /> {feedback.rating}
                  </span>
                  <span className="px-2 py-1 bg-indigo-600/30 rounded text-xs font-bold text-indigo-300">
                    {feedback.category.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-indigo-300 mb-3">{feedback.content}</p>
              
              <div className="flex gap-2">
                <AdminButton label="Delete" variant="delete" onClick={() => handleDelete(feedback.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
