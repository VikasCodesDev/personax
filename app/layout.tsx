import type { Metadata } from 'next';
import './globals.css';
import NavigationWithAuth from '@/components/NavigationWithAuth';
import EnhancedCrosshairCursor from '@/components/EnhancedCrosshairCursor';
import GlobalMagneticEffect from '@/components/GlobalMagneticEffect';
import NebulaBackground from '@/components/NebulaBackground';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PersonaX',
  description: 'Advanced AI-powered personality analysis and simulation platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Global Background Effect */}
        <NebulaBackground />
        
        {/* Global Cursor System */}
        <EnhancedCrosshairCursor enabled={true} />
        
        {/* Global Magnetic Effect */}
        <GlobalMagneticEffect />
        
        {/* Navigation */}
        <NavigationWithAuth />
        
        {/* Main Content */}
        <main className="relative z-10 min-h-screen pt-20">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
