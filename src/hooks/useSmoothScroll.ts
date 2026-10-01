import { useState, useEffect, useRef } from 'react';

export interface SmoothScrollState {
  scrollY: number;
  smoothScrollY: number;
  velocity: number;
  direction: 'down' | 'up' | 'idle';
  isMobile: boolean;
}

export function useSmoothScroll(): SmoothScrollState {
  const [state, setState] = useState<SmoothScrollState>({
    scrollY: 0,
    smoothScrollY: 0,
    velocity: 0,
    direction: 'idle',
    isMobile: false,
  });

  const rawY = useRef(0);
  const smoothY = useRef(0);
  const lastY = useRef(0);
  const rafId = useRef<number | null>(null);
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0);

    const initialY = Math.max(0, window.scrollY);
    rawY.current = initialY;
    smoothY.current = initialY;
    lastY.current = initialY;

    const onScroll = () => {
      // Prevent negative values from iOS momentum bounce
      rawY.current = Math.max(0, window.scrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const loop = () => {
      // For mobile/touch screens, use a much tighter factor (0.45) so thumb feel is 1:1 and crisp on 120Hz ProMotion
      const easing = isTouchRef.current ? 0.45 : 0.14;
      const diff = rawY.current - smoothY.current;
      
      // If diff is tiny, snap to avoid micro jitter
      if (Math.abs(diff) < 0.1) {
        smoothY.current = rawY.current;
      } else {
        smoothY.current += diff * easing;
      }

      const velocity = smoothY.current - lastY.current;
      const direction: 'down' | 'up' | 'idle' =
        Math.abs(velocity) < 0.2 ? 'idle' : velocity > 0 ? 'down' : 'up';

      lastY.current = smoothY.current;

      setState({
        scrollY: rawY.current,
        smoothScrollY: smoothY.current,
        velocity: Math.min(40, Math.max(-40, velocity)),
        direction,
        isMobile: isTouchRef.current,
      });

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return state;
}
