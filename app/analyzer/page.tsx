'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, TrendingUp, Target, Heart, Users } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import PageHeader from '@/components/PageHeader';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

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

export default function AnalyzerPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sampleText: '',
  });
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authFetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setAnalysis(data.analysis);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = analysis?.scores
    ? [
        { trait: 'Openness', value: analysis.scores.openness },
        { trait: 'Conscientiousness', value: analysis.scores.conscientiousness },
        { trait: 'Extraversion', value: analysis.scores.extraversion },
        { trait: 'Agreeableness', value: analysis.scores.agreeableness },
        { trait: 'Neuroticism', value: 100 - analysis.scores.neuroticism },
      ]
    : [];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Personality Analyzer"
          subtitle="Deep AI-powered analysis of personality traits and communication patterns"
        />

        {!analysis ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white"
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white"
                    placeholder="Brief description of the person"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sample Text / Communication
                  </label>
                  <textarea
                    value={formData.sampleText}
                    onChange={(e) => setFormData({ ...formData, sampleText: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white h-32 resize-none"
                    placeholder="Paste sample text, emails, or communication examples..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-glow disabled:opacity-50"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Analyze Personality</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Analysis Results: {analysis.name}</h2>
              <button
                onClick={() => setAnalysis(null)}
                className="px-6 py-2 bg-dark-100 text-white rounded-lg border border-primary/30 hover:border-primary/60 transition-colors"
              >
                New Analysis
              </button>
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <Brain className="w-6 h-6 mr-2" /> Summary
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">{analysis.summary}</p>
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2" /> Personality Profile
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData}>
                    <PolarGrid stroke="#FF6A00" strokeOpacity={0.3} />
                    <PolarAngleAxis dataKey="trait" stroke="#fff" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#fff" />
                    <Radar name="Score" dataKey="value" stroke="#FF6A00" fill="#FF6A00" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" /> Key Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.traits.map((trait: string, index: number) => (
                    <span key={index} className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-sm text-white">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" /> Communication Style
                </h3>
                <p className="text-gray-300">{analysis.communicationStyle}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-green-500 mb-4">Strengths</h3>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <span className="text-green-500 mr-2">●</span>{strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-orange-500 mb-4">Areas for Growth</h3>
                <ul className="space-y-2">
                  {analysis.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <span className="text-orange-500 mr-2">●</span>{weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-primary mb-4">Emotional Profile</h3>
                <p className="text-gray-300">{analysis.emotionalProfile}</p>
              </div>
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-primary mb-4">Leadership Type</h3>
                <p className="text-gray-300">{analysis.leadershipType}</p>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" /> Compatibility Insights
              </h3>
              <p className="text-gray-300">{analysis.compatibilityInsights}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
