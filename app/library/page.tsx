'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bot, Edit2, Trash2, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';

export default function LibraryPage() {
  const router = useRouter();
  const [personas, setPersonas] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/personas');
      const data = await response.json();
      setPersonas(data.personas || []);
    } catch (error) {
      console.error('Failed to fetch personas:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePersona = async (id: string) => {
    if (!confirm('Are you sure you want to delete this persona?')) return;

    try {
      await fetch(`/api/personas?id=${id}`, { method: 'DELETE' });
      setPersonas(personas.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Failed to delete persona:', error);
    }
  };

  const filteredPersonas = personas.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Persona Library"
          subtitle="Manage and interact with your AI personalities"
        />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search personas by name or role..."
              className="w-full pl-12 pr-4 py-4 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white"
            />
          </div>
        </motion.div>

        {/* Personas Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filteredPersonas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400">
              {searchQuery ? 'No personas found' : 'No personas yet'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => router.push('/builder')}
                className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-glow transition-shadow"
              >
                Create Your First Persona
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersonas.map((persona, index) => (
              <motion.div
                key={persona._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-6 group hover:shadow-glow transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                        {persona.name}
                      </h3>
                      <p className="text-sm text-gray-400">{persona.role}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div>
                    <span className="text-xs text-gray-400">Tone:</span>
                    <span className="ml-2 text-sm text-white">{persona.tone}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Traits:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {persona.traits.slice(0, 3).map((trait: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-primary/20 border border-primary/40 rounded-full text-white"
                        >
                          {trait}
                        </span>
                      ))}
                      {persona.traits.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-primary/20 border border-primary/40 rounded-full text-white">
                          +{persona.traits.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Expertise:</span>
                    <p className="text-sm text-white mt-1 line-clamp-2">
                      {persona.expertise}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t border-primary/20">
                  <motion.button
                    onClick={() => router.push(`/chat?persona=${persona._id}`)}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat</span>
                  </motion.button>
                  <motion.button
                    onClick={() => deletePersona(persona._id)}
                    className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg border border-red-500/40 hover:bg-red-500/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
