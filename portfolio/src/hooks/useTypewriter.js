import { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 100) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
        // Se stiamo cancellando, aspettiamo
        if (isDeleting) return;

        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                const currentChar = text[currentIndex];
                
                // Aggiungi il carattere corrente
                setDisplayedText(prev => prev + currentChar);
                
                // Se è un carattere di punteggiatura che termina la frase
                if (currentChar === '.' || currentChar === '?' || currentChar === '!') {
                    setIsDeleting(true);
                    
                    // Aspetta che l'utente legga la frase
                    setTimeout(() => {
                        setDisplayedText('');
                        setIsDeleting(false);
                    }, speed * 5);
                }
                
                setCurrentIndex(prev => prev + 1);
            }, speed);
            
            return () => clearTimeout(timer);
        }
    }, [currentIndex, text, speed, isDeleting]);
    
    return displayedText;
};

export default useTypewriter;