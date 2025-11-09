'use client';

import { useEffect, useMemo, useState } from 'react';

type Phase = 'dawn' | 'day' | 'dusk' | 'night';

function phaseFromHour(h: number): Phase {
  if (h >= 5 && h < 9) return 'dawn';
  if (h >= 9 && h < 17) return 'day';
  if (h >= 17 && h < 21) return 'dusk';
  return 'night';
}

export default function SkyBackground({ className = '' }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>('day');
  useEffect(() => setPhase(phaseFromHour(new Date().getHours())), []);

  const bg = useMemo(() => {
    switch (phase) {
      case 'dawn':
        return 'linear-gradient(135deg,#fde68a,#fca5a5,#93c5fd)';
      case 'day':
        return 'linear-gradient(135deg,#dff1ff,#eef6ff,#ffffff)';
      case 'dusk':
        return 'linear-gradient(135deg,#a78bfa,#fb7185,#f59e0b)';
      default:
        return 'linear-gradient(135deg,#060816,#0a0d1c,#060816)';
    }
  }, [phase]);

  return (
    <div
      aria-hidden
      data-sky-phase={phase}
      className={`absolute inset-0 -z-20 ${className}`}
      style={{
        background: bg,
        backgroundSize: '400% 400%',
        animation: 'gradientShift 40s ease infinite',
      }}
    />
  );
}
