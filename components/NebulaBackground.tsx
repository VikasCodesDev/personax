'use client';

import { useEffect, useRef } from 'react';

export default function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create gradient blobs
    class NebulaBlob {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 200 + 150;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        
        const orangeShades = [
          'rgba(255, 106, 0, 0.03)',
          'rgba(255, 138, 0, 0.025)',
          'rgba(255, 80, 0, 0.035)',
        ];
        this.color = orangeShades[Math.floor(Math.random() * orangeShades.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
      }

      draw() {
        const gradient = ctx!.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(255, 106, 0, 0)');

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const blobs: NebulaBlob[] = [];
    for (let i = 0; i < 5; i++) {
      blobs.push(new NebulaBlob());
    }

    const animate = () => {
      time += 0.005;

      // Fade effect instead of clear
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update blobs
      blobs.forEach((blob) => {
        blob.update();
        blob.draw();
      });

      // Add subtle light rays
      ctx.globalAlpha = 0.02;
      for (let i = 0; i < 3; i++) {
        const x = canvas.width / 2 + Math.sin(time + i) * 300;
        const y = canvas.height / 2 + Math.cos(time + i) * 300;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 400);
        gradient.addColorStop(0, 'rgba(255, 106, 0, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 106, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.7 }}
    />
  );
}
