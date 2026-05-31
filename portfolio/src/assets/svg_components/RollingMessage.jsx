import React, { useState, useEffect } from 'react';
import './RollingMessage.css'

function RollingMessage({ setSending, setMessageSent, formData, setFormData }) {

  // useState per contenere il testo della email diviso in cinque righe
  const [messageRows, setMessageRows] = useState({
    firstRowMsg: '',
    secondRowMsg: '',
    thirdRowMsg: '',
    fourthRowMsg: '',
    fifthRowMsg: ''
  });

  function splitStringIntoRows(inputString) {
    // Divido la stringa in un array di parole
    const words = inputString.trim().split(/\s+/);
    
    // Inizializzo le variabili per ogni riga
    let firstRowMsg = '';
    let secondRowMsg = '';
    let thirdRowMsg = '';
    let fourthRowMsg = '';
    let fifthRowMsg = '';
    
    // Funzione di supporto per estrarre 5 parole da un indice specifico
    const extractFiveWords = (startIndex) => {
        const selectedWords = [];
        for (let i = 0; i < 5; i++) {
            if (startIndex + i < words.length) {
                selectedWords.push(words[startIndex + i]);
            } else {
                selectedWords.push(''); // Riempie con stringhe vuote se non ci sono abbastanza parole
            }
        }
        return selectedWords.join(' ').trim();
    };
    
    // Assegno le parole alle rispettive righe
    firstRowMsg = extractFiveWords(0);
    secondRowMsg = extractFiveWords(5);
    thirdRowMsg = extractFiveWords(10);
    fourthRowMsg = extractFiveWords(15);
    fifthRowMsg = extractFiveWords(20);
    
    return {
        firstRowMsg,
        secondRowMsg,
        thirdRowMsg,
        fourthRowMsg,
        fifthRowMsg,
        totalWords: words.length
    };
  }

  useEffect(() => {
    // Chiama la funzione per dividere il messaggio in righe
    const result = splitStringIntoRows(formData.message);
    // Aggiorna lo useState con le righe del messaggio
    setMessageRows(result);
    
    /*
    Imposta un timeout
    dopo 6 secondi finisce l'animazione 
    useState sending diventa 'false' (non viene più visualizzato <RollingMessage> ma il form)
    useState messageSent diventa 'true' (viene visualizzato <Alert>)
    i dati del form vengono resettati
    */ 
    const timer = setTimeout(() => {
      setMessageSent(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSending(false);
    }, 6000);

    return () => clearTimeout(timer);
  },[]);

  return (
    <div className='relative h-full w-2/3'>
      <svg
        viewBox="0 0 20 32"
        fill="none"
        className='w-full h-full'
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(90)"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.63637 6.09534H0V25.9049C0.75 27.0046 3.325 27.1043 3.64 26.204V6.09534Z"
            fill="#FED783"
          ></path>
          <path
            d="M1.81818 7.08175C2.82233 7.08175 3.63637 6.62692 3.63637 6.06587C3.63637 5.50482 2.82233 5.05 1.81818 5.05C0.81403 5.05 0 5.50482 0 6.06587C0 6.62692 0.81403 7.08175 1.81818 7.08175Z"
            fill="#FCF1D6"
          ></path>
          <path
            d="M1.81813 6.31986C2.15285 6.31986 2.42420 6.14930 2.42420 5.93891C2.42420 5.72851 2.15285 5.55796 1.81813 5.55796C1.48342 5.55796 1.21208 5.72851 1.21208 5.93891C1.21208 6.14930 1.48342 6.31986 1.81813 6.31986Z"
            fill="url(#paint_linear)"
          ></path>
          <defs>
            <linearGradient
              id="paint_linear"
              x1="1.81813"
              y1="5.55796"
              x2="1.81813"
              y2="6.31986"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#424240"></stop>
              <stop offset="1" stopColor="#FA8E27"></stop>
            </linearGradient>
          </defs>
        </g>
      </svg>
      <div className='paper-container'>
        <div className='paper'>
        </div>
        <div className='content-container'>
          <address className='content-sender text-left line-clamp-1 ml-4 my-4'>From: {formData.name}</address>
          <div className='text-center ml-4'>
            <h2 className='content-subject text-left line-clamp-1 mb-2'>Subject: {formData.subject}</h2>
            <p className='row-one line-clamp-1'>
              {messageRows.firstRowMsg}
            </p>
            <p className='row-two line-clamp-1'>
              {messageRows.secondRowMsg}
            </p>
            <p className='row-three line-clamp-1'>
              {messageRows.thirdRowMsg}
            </p>
            <p className='row-four line-clamp-1'>
              {messageRows.fourthRowMsg}
            </p>
            <p className='row-five line-clamp-1'>
              {(messageRows.totalWords > 25) ? messageRows.fifthRowMsg + '...' : messageRows.fifthRowMsg}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RollingMessage