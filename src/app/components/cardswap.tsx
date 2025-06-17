'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CardProps {
  children: React.ReactNode;
  customClass?: string;
}

export const Card: React.FC<CardProps> = ({ children, customClass = '' }) => {
  return (
    <div className={`card w-full h-full absolute top-0 left-0 ${customClass}`}>
      {children}
    </div>
  );
};

interface CardSwapProps {
  children: React.ReactNode;
  cardDistance: number;
  verticalDistance: number;
  delay?: number;
  pauseOnHover?: boolean;
}

const CardSwap: React.FC<CardSwapProps> = ({
  children,
  cardDistance,
  verticalDistance,
  delay = 3000,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paused, setPaused] = useState(false);

  const swap = () => {
    if (cardRefs.current.length < 2) return;

    const elFront = cardRefs.current[0];
    const elBack = cardRefs.current[1];
    const rest = cardRefs.current.slice(2);

    const frontSlot = { scale: 1, y: 0, zIndex: 2 };
    const backSlot = {
      scale: 1 - cardDistance / 1000,
      y: verticalDistance,
      zIndex: 1,
    };
    const restSlot = {
      scale: 1 - 2 * cardDistance / 1000,
      y: 2 * verticalDistance,
      zIndex: 0,
    };

    const tl = gsap.timeline();

    if (elFront) {
      tl.to(elFront, {
        scale: restSlot.scale,
        y: restSlot.y,
        zIndex: restSlot.zIndex,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }

    if (elBack) {
      tl.to(
        elBack,
        {
          scale: frontSlot.scale,
          y: frontSlot.y,
          zIndex: frontSlot.zIndex,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        '<'
      );
    }

    rest.forEach((card, i) => {
      if (card) {
        tl.to(
          card,
          {
            scale: backSlot.scale,
            y: backSlot.y,
            zIndex: backSlot.zIndex,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          '<'
        );
      }
    });

    tl.call(() => {
      if (elFront) gsap.set(elFront, { zIndex: backSlot.zIndex });
    }, undefined, '+=0');

    cardRefs.current = [...cardRefs.current.slice(1), cardRefs.current[0]];
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!paused) {
      interval = setInterval(() => {
        swap();
      }, delay);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paused, delay]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setPaused(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.Children.map(children, (child, index) => (
        <div
            ref={(el) => {
            cardRefs.current[index] = el;
            }}
            className="absolute top-0 left-0 w-full h-full"
            style={{
            transform: `scale(${1 - index * cardDistance / 1000}) translateY(${index * verticalDistance}px)`,
            zIndex: `${2 - index}`,
            }}
        >
            {child}
        </div>
        ))}

    </div>
  );
};

export default CardSwap;
