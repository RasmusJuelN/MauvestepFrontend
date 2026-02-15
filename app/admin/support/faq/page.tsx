'use client';

import { useState, useEffect } from 'react';
import { FAQService } from '@/lib/services/faqService';
import { FAQ } from '@/lib/types';
import AdminButton from '@/components/admin/AdminButton';

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '', category: '' });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const FAQData = await FAQService.getAll();
      setFaqs(FAQData);
    } catch  {
      setError('Failed to fetch FAQs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await FAQService.delete(id);
      setFaqs(faqs.filter(f => f.id !== id));
    } catch  {
      alert('Failed to delete FAQ');
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData({ question: faq.question, answer: faq.answer, category: faq.category });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const updated = await FAQService.update(editingId, formData);
        setFaqs(faqs.map(f => f.id === editingId ? updated : f));
        setEditingId(null);
      } else {
        const created = await FAQService.create(formData);
        setFaqs([...faqs, created]);
        setIsCreating(false);
      }
      setFormData({ question: '', answer: '', category: '' });
    } catch  {
      alert('Failed to save FAQ');
    }
  };

  const categories = [...new Set(faqs.map(f => f.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage FAQ</h1>
        <AdminButton label="+ New FAQ" variant="create" onClick={() => setIsCreating(true)} />
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-600/50 text-red-200 rounded">
          {error}
        </div>
      )}

      {isCreating && (
        <div className="bg-indigo-900/30 p-6 rounded border border-indigo-700 space-y-4">
          <h2 className="text-xl font-bold">Create New FAQ Entry</h2>
          <div>
            <label className="block text-sm mb-2">Question</label>
            <input 
              type="text" 
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Answer</label>
            <textarea 
              value={formData.answer}
              onChange={(e) => setFormData({...formData, answer: e.target.value})}
              className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200 h-32"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Category</label>
            <input 
              type="text" 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              placeholder="e.g. Account, Technical, Gameplay"
              className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200"
            />
          </div>
          <div className="flex gap-2">
            <AdminButton label="Save" variant="save" onClick={handleSave} />
            <AdminButton label="Cancel" variant="cancel" onClick={() => { setIsCreating(false); setFormData({question: '', answer: '', category: ''}); }} />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8 text-indigo-300">Loading FAQs...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8 text-indigo-400">No FAQs available. Create one to get started!</div>
      ) : (
        categories.map(category => (
        <div key={category} className="space-y-3">
          <h2 className="text-xl font-bold text-indigo-300">{category}</h2>
          <div className="space-y-2">
            {faqs.filter(f => f.category === category).map(faq => (
              <div key={faq.id} className="bg-indigo-900/30 p-4 rounded border border-indigo-700">
                {editingId === faq.id ? (
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      value={formData.question}
                      onChange={(e) => setFormData({...formData, question: e.target.value})}
                      className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200"
                    />
                    <textarea 
                      value={formData.answer}
                      onChange={(e) => setFormData({...formData, answer: e.target.value})}
                      className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200 h-24"
                    />
                    <input 
                      type="text" 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-indigo-950 border border-indigo-700 rounded p-2 text-indigo-200"
                    />
                    <div className="flex gap-2">
                      <AdminButton label="Save" variant="save" onClick={handleSave} />
                      <AdminButton label="Cancel" variant="cancel" onClick={() => setEditingId(null)} />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-lg">{faq.question}</h3>
                    <p className="text-sm text-indigo-300 mt-2">{faq.answer}</p>
                    <div className="flex gap-2 mt-3">
                      <AdminButton label="Edit" variant="edit" onClick={() => handleEdit(faq)} />
                      <AdminButton label="Delete" variant="delete" onClick={() => handleDelete(faq.id)} />
                    </div>
                  </>
        
              )}
              </div>
            ))}
          </div>
        </div>
      ))
      )}
    </div>
  );
}
