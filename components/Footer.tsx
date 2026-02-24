'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const footerLinks = [
  { name: 'Analyzer', path: '/analyzer' },
  { name: 'Builder', path: '/builder' },
  { name: 'Chat', path: '/chat' },
  { name: 'Library', path: '/library' },
  { name: 'Settings', path: '/settings' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-primary/20">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand section */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <motion.div
                className="relative w-12 h-12"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-orange-600" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-orange-600 blur-lg opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-7 h-7 text-black relative z-10" />
                </div>
              </motion.div>
              <span className="text-3xl font-bold heading-font bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                PersonaX
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Advanced AI-powered personality simulation and analysis platform.
              Next-generation neural architecture for behavioral intelligence.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary">System Online</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold heading-font text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <motion.span
                      className="text-gray-400 hover:text-primary transition-colors inline-flex items-center group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all duration-300 mr-2" />
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold heading-font text-white mb-4">Connect</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-black/40 border border-primary/20 hover:border-primary/50 transition-colors group"
                  whileHover={{ y: -3 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <social.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} PersonaX. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
    </footer>
  );
}
