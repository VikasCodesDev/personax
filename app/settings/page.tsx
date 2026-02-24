'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Zap, MousePointer, Sun } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    animationIntensity: 'medium' as 'low' | 'medium' | 'high',
    cursorEffects: true,
    glowLevel: 50,
  });

  useEffect(() => {
    const saved = localStorage.getItem('personax-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const updateSettings = (newSettings: any) => {
    setSettings(newSettings);
    localStorage.setItem('personax-settings', JSON.stringify(newSettings));
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Settings"
          subtitle="Customize your PersonaX experience"
        />

        <div className="space-y-6">
          {/* Animation Intensity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Animation Intensity</h3>
                <p className="text-sm text-gray-400">
                  Control the intensity of UI animations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <motion.button
                  key={level}
                  onClick={() => updateSettings({ ...settings, animationIntensity: level })}
                  className={`px-6 py-3 rounded-lg border-2 capitalize transition-all ${
                    settings.animationIntensity === level
                      ? 'border-primary bg-primary/20 text-white'
                      : 'border-primary/30 bg-dark-100 text-gray-400 hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Cursor Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Custom Cursor</h3>
                  <p className="text-sm text-gray-400">
                    Enable the glowing custom cursor effect
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => updateSettings({ ...settings, cursorEffects: !settings.cursorEffects })}
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  settings.cursorEffects ? 'bg-primary' : 'bg-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ left: settings.cursorEffects ? '36px' : '4px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Glow Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Glow Intensity</h3>
                <p className="text-sm text-gray-400">
                  Adjust the intensity of glow effects
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.glowLevel}
                onChange={(e) => updateSettings({ ...settings, glowLevel: parseInt(e.target.value) })}
                className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(to right, #FF6A00 0%, #FF6A00 ${settings.glowLevel}%, #1A1A1A ${settings.glowLevel}%, #1A1A1A 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>Off</span>
                <span className="text-primary font-semibold">{settings.glowLevel}%</span>
                <span>Maximum</span>
              </div>
            </div>

            {/* Preview */}
            <div className="mt-6 p-4 bg-dark-100 rounded-lg">
              <p className="text-sm text-gray-400 mb-3">Preview:</p>
              <motion.div
                className="w-full h-20 bg-gradient-to-r from-primary to-orange-600 rounded-lg"
                style={{
                  boxShadow: `0 0 ${settings.glowLevel}px rgba(255, 106, 0, ${settings.glowLevel / 100})`,
                }}
                animate={{
                  boxShadow: `0 0 ${settings.glowLevel}px rgba(255, 106, 0, ${settings.glowLevel / 100})`,
                }}
              />
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">About PersonaX</h3>
              </div>
            </div>

            <div className="text-gray-400 space-y-2">
              <p>Version: 1.0.0</p>
              <p>AI-powered personality simulation and analysis platform</p>
              <p className="text-sm pt-4 border-t border-primary/20">
                Built with Next.js, TypeScript, Three.js, and Groq AI
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
