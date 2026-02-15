'use client';

import { useState, useEffect } from 'react';
import { NewsArticle } from '@/lib/types';
import { NewsArticleService } from '@/lib/services/NewsArticleService';
import AdminButton from '@/components/admin/AdminButton';
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler';

export default function AdminNews() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingNewsArticleId, setEditingNewsArticleId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all articles on mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await NewsArticleService.getAll();
        setNewsArticles(data);
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to fetch articles. Please try again.'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Handle creating new article
  const handleCreate = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setIsSubmitting(true);
      const newArticle = await NewsArticleService.create({
        title: formData.title,
        content: formData.content,
        imageUrl: formData.imageUrl || undefined,
      });
      setNewsArticles([newArticle, ...newsArticles]);
      setFormData({ title: '', content: '', imageUrl: '' });
      setIsCreating(false);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create article. Please try again.'));
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle updating article
  const handleUpdate = async () => {
    if (!editingNewsArticleId || !formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setIsSubmitting(true);
      const updated = await NewsArticleService.update(editingNewsArticleId, {
        title: formData.title,
        content: formData.content,
        imageUrl: formData.imageUrl || undefined,
      });
      setNewsArticles(newsArticles.map(a => a.id === editingNewsArticleId ? updated : a));
      setEditingNewsArticleId(null);
      setFormData({ title: '', content: '', imageUrl: '' });
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to update article. Please try again.'));
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deleting article
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      setIsSubmitting(true);
      await NewsArticleService.delete(id);
      setNewsArticles(newsArticles.filter(a => a.id !== id));
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to delete article. Please try again.'));
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEditClick = (newsArticle: NewsArticle) => {
    setEditingNewsArticleId(newsArticle.id);
    setFormData({
      title: newsArticle.title,
      content: newsArticle.content,
      imageUrl: newsArticle.imageUrl || '',
    });
    setError(null);
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingNewsArticleId(null);
    setIsCreating(false);
    setFormData({ title: '', content: '', imageUrl: '' });
    setError(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Manage News</h1>
        <p className="text-gray-400">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage News</h1>
        <div onClick={() => setIsCreating(true)}>
          <AdminButton label="+ New Article" variant="create" />
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 p-4 rounded border border-red-700 text-red-200">
          {error}
        </div>
      )}

      {isCreating && (
        <div className="bg-indigo-900/30 p-6 rounded border border-indigo-700 space-y-4">
          <h2 className="text-xl font-bold">Create New Article</h2>
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Content</label>
            <textarea 
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200 h-32"
              disabled={isSubmitting}
            />
          </div>
          <div className="flex gap-2">
            <div onClick={!isSubmitting ? handleCreate : undefined}>
              <AdminButton label={isSubmitting ? "Saving..." : "Save"} variant="save" />
            </div>
            <div onClick={!isSubmitting ? handleCancel : undefined}>
              <AdminButton label="Cancel" variant="cancel" />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {newsArticles.length === 0 ? (
          <p key="no-articles" className="text-gray-400 justify-center text-center p-4 italic">No articles found.</p>
        ) : (
        newsArticles.map(newsArticle => (
          <div key={newsArticle.id} className="bg-indigo-900/30 p-4 rounded border border-indigo-700">
            {editingNewsArticleId === newsArticle.id ? (
              <div className="space-y-3">
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200"
                  disabled={isSubmitting}
                />
                <textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200 h-24"
                  disabled={isSubmitting}
                />
                <input 
                  type="text" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="Image URL"
                  className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200"
                  disabled={isSubmitting}
                />
                <div className="flex gap-2">
                  <div onClick={!isSubmitting ? handleUpdate : undefined}>
                    <AdminButton label={isSubmitting ? "Saving..." : "Save"} variant="save" />
                  </div>
                  <div onClick={!isSubmitting ? handleCancel : undefined}>
                    <AdminButton label="Cancel" variant="cancel" />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-lg">{newsArticle.title}</h3>
                <p className="text-sm text-indigo-300 mt-1">{newsArticle.content}</p>
                <p className="text-xs text-indigo-400 mt-2">
                  By {newsArticle.username} • {new Date(newsArticle.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-3">
                  <div onClick={() => handleEditClick(newsArticle)}>
                    <AdminButton label="Edit" variant="edit" />
                  </div>
                  <div onClick={() => handleDelete(newsArticle.id)}>
                    <AdminButton label="Delete" variant="delete" />
                  </div>
                </div>
              </>
            )}
          </div>
        )))}
      </div>
    </div>
  );
}
