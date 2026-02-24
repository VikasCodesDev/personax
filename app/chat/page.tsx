'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';
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

export default function ChatPage() {
  const [personas, setPersonas] = useState<any[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPersonas();
  }, []);

  useEffect(() => {
    if (selectedPersona) {
      loadChat();
    }
  }, [selectedPersona]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchPersonas = async () => {
    try {
      const response = await authFetch('/api/personas');
      const data = await response.json();
      setPersonas(data.personas || []);
    } catch (error) {
      console.error('Failed to fetch personas:', error);
    }
  };

  const loadChat = async () => {
    try {
      const response = await authFetch(`/api/chat?personaId=${selectedPersona._id}`);
      const data = await response.json();
      if (data.chat) {
        setMessages(data.chat.messages || []);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Failed to load chat:', error);
      setMessages([]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedPersona || loading) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await authFetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          personaId: selectedPersona._id,
          message: input,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response, timestamp: new Date() },
        ]);
      }
    } catch (error) {
      console.error('Chat failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Chat with Persona"
          subtitle="Engage in intelligent conversations with AI personalities"
        />

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
          {/* Persona Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 glass-panel p-6 overflow-y-auto scrollbar-thin"
          >
            <h2 className="text-xl font-bold text-white mb-4">Select Persona</h2>
            {personas.length === 0 ? (
              <p className="text-gray-400 text-sm">No personas yet. Create one in the Builder!</p>
            ) : (
              <div className="space-y-3">
                {personas.map((persona) => (
                  <motion.button
                    key={persona._id}
                    onClick={() => setSelectedPersona(persona)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedPersona?._id === persona._id
                        ? 'border-primary bg-primary/20'
                        : 'border-primary/30 bg-dark-100 hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{persona.name}</div>
                        <div className="text-xs text-gray-400">{persona.role}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 glass-panel flex flex-col"
          >
            {!selectedPersona ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-xl text-gray-400">Select a persona to start chatting</p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{selectedPersona.name}</h3>
                      <p className="text-sm text-gray-400">{selectedPersona.role}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-400 mt-8">
                      <p>Start a conversation with {selectedPersona.name}</p>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-3 max-w-2xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-gray-700' : 'bg-gradient-to-br from-primary to-orange-600'}`}>
                            {message.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                          </div>
                          <div className={`px-4 py-3 rounded-lg ${message.role === 'user' ? 'bg-primary/20 border border-primary/40' : 'bg-dark-100 border border-primary/20'}`}>
                            <p className="text-white whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="px-4 py-3 rounded-lg bg-dark-100 border border-primary/20">
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-6 border-t border-primary/20">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg focus:outline-none focus:border-primary text-white"
                      disabled={loading}
                    />
                    <motion.button
                      onClick={handleSend}
                      disabled={loading || !input.trim()}
                      className="px-6 py-3 bg-primary text-white rounded-lg font-semibold flex items-center space-x-2 shadow-glow disabled:opacity-50"
                      whileHover={{ scale: loading ? 1 : 1.05 }}
                      whileTap={{ scale: loading ? 1 : 0.95 }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
