'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, LogOut, Settings, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('personax_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('personax_user');
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold heading-font text-white mb-4">
            User Profile
          </h1>
          <p className="text-xl text-gray-400">Manage your PersonaX account</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 glass-panel p-6"
          >
            <div className="text-center">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-orange-600 mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-black" />
              </div>

              {/* User info */}
              <h2 className="text-2xl font-bold text-white mb-2 heading-font">
                {user.name}
              </h2>
              <p className="text-sm text-gray-400 mb-6">{user.email}</p>

              {/* Status badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-primary font-medium">Active</span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-dark-100 border border-primary/30 rounded-lg text-white hover:border-primary/50 transition-colors flex items-center justify-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-500 hover:bg-red-500/30 transition-colors flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Details & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Account Details */}
            <div className="glass-panel p-6">
              <h3 className="text-2xl font-bold heading-font text-white mb-6">
                Account Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-dark-100 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-white">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-dark-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-400">Member Since</div>
                    <div className="text-white">{new Date().toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-dark-100 rounded-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-400">Account Type</div>
                    <div className="text-white">Premium</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="glass-panel p-6">
              <h3 className="text-2xl font-bold heading-font text-white mb-6">
                Usage Statistics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-dark-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary heading-font mb-2">12</div>
                  <div className="text-sm text-gray-400">Analyses</div>
                </div>
                <div className="bg-dark-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary heading-font mb-2">8</div>
                  <div className="text-sm text-gray-400">Personas</div>
                </div>
                <div className="bg-dark-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary heading-font mb-2">156</div>
                  <div className="text-sm text-gray-400">Messages</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-panel p-6">
              <h3 className="text-2xl font-bold heading-font text-white mb-6">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Created persona', name: 'Dr. Sarah Chen', time: '2 hours ago' },
                  { action: 'Analyzed personality', name: 'John Developer', time: '5 hours ago' },
                  { action: 'Chat session', name: 'AI Mentor', time: '1 day ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                    <div>
                      <div className="text-white">{activity.action}: {activity.name}</div>
                      <div className="text-sm text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
