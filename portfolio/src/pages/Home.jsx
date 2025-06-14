import React, { useState, useEffect } from 'react';
import Hero from '../components/layout/Hero';
import TerminalQuest from '../components/layout/TerminalQuest';

export default function Home() {
  /*
    I seguenti useState e funzioni servono per la visualizzazioni di elementi diversi (card progetti, nuvoletta di dialogo)
    quando useState backClicked diventa 'true' cambia il testo della nuvoletta di dialogo <SpeechBubble>
    */
    const [clicked, setClicked] = useState(false);
    const [backClicked, setBackClicked] = useState(false);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <Hero 
        clicked={clicked} 
        setClicked={setClicked} 
        backClicked={backClicked} 
        setBackClicked={setBackClicked} 
      />
      {!clicked && <TerminalQuest />}
    </>
  )
}