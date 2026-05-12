'use client';

import { memo, useEffect, useRef } from 'react';

const LandingBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Node network configuration
    const nodes: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const nodeCount = 40;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      time += 0.005;

      // Clear with subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#FAFBFC');
      gradient.addColorStop(1, '#F1F5F9');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ambient light spots
      const lightSpots = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 300, color: 'rgba(148, 163, 184, 0.04)' },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 400, color: 'rgba(203, 213, 225, 0.05)' },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 350, color: 'rgba(226, 232, 240, 0.06)' },
      ];

      lightSpots.forEach((spot) => {
        const radialGradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.r);
        radialGradient.addColorStop(0, spot.color);
        radialGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 116, 139, 0.3)';
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 * (1 - distance / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw flowing lines (routing paths)
      const flowLines = 5;
      for (let i = 0; i < flowLines; i++) {
        const startY = canvas.height * 0.3 + (i * canvas.height * 0.15);
        const amplitude = 30 + i * 10;
        const frequency = 0.002 + i * 0.001;
        const speed = time * (0.5 + i * 0.2);

        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 2) {
          const y = startY + Math.sin(x * frequency + speed) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.08 - i * 0.01})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
});

export default LandingBackground;
