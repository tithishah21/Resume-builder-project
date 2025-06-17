import React from 'react';

const shapes = [
{ left: '0%', delay: '1.5s', size: 'w-2 h-2', color: 'bg-cyan-800' },
  { left: '10%', delay: '0s', size: 'w-5 h-5', color: 'bg-cyan-400' },
  { left: '40%', delay: '0.5s', size: 'w-3 h-3', color: 'bg-blue-400' },
  { left: '70%', delay: '1s', size: 'w-6 h-6', color: 'bg-purple-400' },
  { left: '90%', delay: '1.5s', size: 'w-2 h-2', color: 'bg-cyan-800' },
];

export default function FallingShapes() {
  return (
    <div className="relative w-full h-12 overflow-visible block lg:hidden">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={`absolute top-0 ${shape.size} ${shape.color} rounded-full animate-fall`}
          style={{
            left: shape.left,
            animationDelay: shape.delay,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(50px); opacity: 0; }
        }
        .animate-fall {
          animation: fall 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
}