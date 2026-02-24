'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Sparkles, MessageCircle, Library, Settings, User, LogIn } from 'lucide-react';

const navItems = [
  { name: 'Analyzer', path: '/analyzer', icon: Sparkles },
  { name: 'Builder', path: '/builder', icon: Brain },
  { name: 'Chat', path: '/chat', icon: MessageCircle },
  { name: 'Library', path: '/library', icon: Library },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function NavigationWithAuth() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('personax_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xl" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="relative w-10 h-10"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-orange-600" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-orange-600 blur-lg opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-black relative z-10" />
                </div>
              </motion.div>
              <span className="text-2xl font-bold heading-font bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                PersonaX
              </span>
            </Link>

            {/* Navigation items */}
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <Link key={item.path} href={item.path}>
                    <motion.div
                      className="relative px-4 py-2 rounded-lg transition-colors group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-lg ${
                          isActive
                            ? 'bg-primary/20 border border-primary/50'
                            : 'bg-transparent border border-transparent'
                        }`}
                        whileHover={{
                          backgroundColor: 'rgba(255, 106, 0, 0.1)',
                          borderColor: 'rgba(255, 106, 0, 0.3)',
                        }}
                      />

                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                        style={{
                          boxShadow: '0 0 20px rgba(255, 106, 0, 0.4)',
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <div
                        className={`relative flex items-center space-x-2 ${
                          isActive ? 'text-primary' : 'text-gray-400'
                        } group-hover:text-white transition-colors`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-primary"
                          style={{
                            boxShadow: '0 0 10px rgba(255, 106, 0, 0.8)',
                          }}
                          transition={{ type: 'spring', duration: 0.5 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Auth button */}
              <div className="ml-4 pl-4 border-l border-primary/20">
                {user ? (
                  <Link href="/profile">
                    <motion.div
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-sm text-white font-medium">{user.name}</span>
                    </motion.div>
                  </Link>
                ) : (
                  <Link href="/login">
                    <motion.div
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-black font-semibold"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 106, 0, 0.6)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="text-sm">Login</span>
                    </motion.div>
                  </Link>
                )}
              </div>
            </div>

            {/* Status indicators */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/60"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    boxShadow: '0 0 8px rgba(255, 106, 0, 0.6)',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
