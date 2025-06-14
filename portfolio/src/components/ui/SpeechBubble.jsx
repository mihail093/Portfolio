import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useTypewriter } from '../../hooks';
import "./SpeechBubble.css";

const SpeechBubble = ({ children, speed }) => {
  // Crea il ref per l'elemento da osservare
  const ref = useRef(null);

  // useInView restituisce true quando almeno il 60% del componente è visibile
  const isInView = useInView(ref, {
    once: false,
    amount: 0.6, // 60% visibile
  });

  // Mostra il testo solo quando il componente è in view
  const displayedText = useTypewriter(isInView ? children : '', speed);

  return (
    <div 
      ref={ref}
      className="
        absolute bottom-[8.8em] left-[-0.6em] 
        w-[110px] max-w-[220px] h-auto min-h-[76px] 
        py-2 bg-gray-200 
        rounded-[25px] rounded-bl-[0] 
        border-2 border-black
      "
    >
      <div className="text-center text-black text-sm font-montserrat px-3">
        {displayedText}
        <span className="fast-pulse select-none">|</span>
      </div>
    </div>
  );
};

export default SpeechBubble;