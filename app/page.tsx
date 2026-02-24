'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import Typewriter from '@/components/Typewriter';
import Starfield from '@/components/Starfield';

const Interactive3DScene = dynamic(() => import('@/components/Interactive3DScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-b from-primary/10 to-transparent animate-pulse" />,
});

const stats = [
  { icon: Zap, label: 'Neural Processing', value: 'Real-time' },
  { icon: Shield, label: 'Security Grade', value: 'Military' },
  { icon: Cpu, label: 'AI Models', value: 'Advanced' },
];

const features = [
  {
    title: 'Deep Neural Analysis',
    description: 'Advanced AI algorithms analyze personality patterns with unprecedented accuracy',
  },
  {
    title: 'Quantum Personas',
    description: 'Create multi-dimensional AI personalities with complex behavioral matrices',
  },
  {
    title: 'Cognitive Synthesis',
    description: 'Real-time conversation engine powered by next-generation language models',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Starfield background */}
      <Starfield />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section - Asymmetric layout */}
        <section className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="space-y-8"
              >
                {/* System badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-primary font-medium">SYSTEM ONLINE</span>
                </motion.div>

                {/* Main heading with typewriter */}
                <div>
                  <Typewriter
                    text="PersonaX"
                    className="text-7xl lg:text-8xl font-bold heading-font text-white mb-4"
                    speed={120}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <h2 className="text-3xl lg:text-4xl font-light text-gray-300 mb-2">
                      AI Command Interface
                    </h2>
                    <div className="w-32 h-[2px] bg-gradient-to-r from-primary to-transparent" />
                  </motion.div>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className="text-xl text-gray-400 leading-relaxed max-w-lg"
                >
                  Advanced neural architecture for personality simulation, behavioral analysis,
                  and cognitive pattern recognition. Powered by next-generation AI systems.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.1 }}
                  className="flex flex-wrap gap-4"
                >
                  <MagneticButton href="/analyzer" variant="primary">
                    <span>Initialize Analysis</span>
                    <ArrowRight className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton href="/builder" variant="secondary">
                    <span>Build Persona</span>
                  </MagneticButton>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 }}
                  className="grid grid-cols-3 gap-4 pt-8"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="relative group"
                      whileHover={{ y: -5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-black/40 backdrop-blur-sm border border-primary/20 rounded-lg p-4">
                        <stat.icon className="w-6 h-6 text-primary mb-2" />
                        <div className="text-sm text-gray-400">{stat.label}</div>
                        <div className="text-lg font-bold text-white heading-font">{stat.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right side - 3D visualization */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative h-[600px] lg:h-[700px]"
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
                  <div className="absolute inset-0 border border-primary/20 rounded-full animate-pulse" />
                  <div className="absolute inset-8 border border-primary/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute inset-16 border border-primary/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* 3D Scene */}
                <div className="relative z-10 w-full h-full">
                  <Interactive3DScene />
                </div>

                {/* Corner brackets */}
                {[
                  { top: 0, left: 0, rotate: 0 },
                  { top: 0, right: 0, rotate: 90 },
                  { bottom: 0, right: 0, rotate: 180 },
                  { bottom: 0, left: 0, rotate: 270 },
                ].map((corner, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12"
                    style={{
                      ...corner,
                      transform: `rotate(${corner.rotate}deg)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent" />
                    <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-primary to-transparent" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold heading-font text-white mb-4">
                System Capabilities
              </h2>
              <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </motion.div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="relative h-full">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Card */}
                    <div className="relative bg-black/40 backdrop-blur-sm border border-primary/20 rounded-lg p-8 h-full">
                      {/* Number */}
                      <div className="text-6xl font-bold heading-font text-primary/20 mb-4">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 heading-font">
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Hover line */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-transparent"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-lg blur-3xl" />
              
              {/* Content */}
              <div className="relative bg-black/40 backdrop-blur-sm border border-primary/30 rounded-lg p-12">
                <h2 className="text-4xl font-bold heading-font text-white mb-6">
                  Ready to Initialize?
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Access the most advanced AI personality simulation platform.
                  Begin your neural analysis journey now.
                </p>
                <MagneticButton href="/analyzer" variant="primary">
                  <span>Launch System</span>
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
