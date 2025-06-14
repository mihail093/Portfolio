import React from 'react';
import './RainDrop.css';

export default function RainDrop() {
  return (
    <div className="raindrop" style={{
        left: Math.random() * 90 + '%',
        animationDelay: Math.random() * 2 + 's'
      }}>
    </div>
  )
}
