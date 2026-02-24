'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';

const authFetch = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('personax_token');
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
};

const toneOptions = ['Professional', 'Casual', 'Friendly', 'Academic', 'Creative', 'Authoritative'];
const traitOptions = [
  'Analytical', 'Empathetic', 'Innovative', 'Strategic', 'Detail-oriented',
  'Visionary', 'Pragmatic', 'Enthusiastic', 'Methodical', 'Charismatic',
];

export default function BuilderPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    tone: '',
    traits: [] as string[],
    expertise: '',
    backstory: '',
    communicationStyle: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleTrait = (trait: string) => {
    setFormData((prev) => ({
      ...prev,
      traits: prev.traits.includes(trait)
        ? prev.traits.filter((t) => t !== trait)
        : [...prev.traits, trait],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authFetch('/api/personas', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/library');
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to create persona:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Persona Created!</h2>
          <p className="text-gray-400">Redirecting to library...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Persona Builder"
          subtitle="Create a custom AI personality with unique traits and characteristics"
        />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Persona Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white"
                placeholder="e.g., Dr. Sarah Chen"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role / Profession *</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white"
                placeholder="e.g., AI Research Scientist"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Communication Tone *</label>
            <div className="grid grid-cols-3 gap-3">
              {toneOptions.map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setFormData({ ...formData, tone })}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.tone === tone
                      ? 'border-primary bg-primary/20 text-white'
                      : 'border-primary/30 bg-dark-100 text-gray-400 hover:border-primary/50'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Personality Traits (Select multiple) *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {traitOptions.map((trait) => (
                <button
                  key={trait}
                  type="button"
                  onClick={() => toggleTrait(trait)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.traits.includes(trait)
                      ? 'border-primary bg-primary/20 text-white'
                      : 'border-primary/30 bg-dark-100 text-gray-400 hover:border-primary/50'
                  }`}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Area of Expertise *</label>
            <input
              type="text"
              value={formData.expertise}
              onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              className="w-full px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white"
              placeholder="e.g., Machine Learning, Neural Networks, AI Ethics"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Backstory *</label>
            <textarea
              value={formData.backstory}
              onChange={(e) => setFormData({ ...formData, backstory: e.target.value })}
              className="w-full px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white h-32 resize-none"
              placeholder="Provide a brief backstory for this persona..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Communication Style *</label>
            <textarea
              value={formData.communicationStyle}
              onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value })}
              className="w-full px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white h-32 resize-none"
              placeholder="Describe how this persona communicates..."
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading || formData.traits.length === 0}
            className="w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-glow disabled:opacity-50"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            <Brain className="w-5 h-5" />
            <span>{loading ? 'Creating Persona...' : 'Create Persona'}</span>
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
