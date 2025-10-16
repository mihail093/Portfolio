import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaLinkedinIn, FaGithubAlt } from "react-icons/fa";
import { BsMailbox2Flag } from "react-icons/bs";
import { Fish } from '../assets/svg';
import { SpeechBubble, Button } from '../components/ui';
import ContactForm from '../components/layout/ContactForm';

export default function Contact() {
  // const ref viene utilizzata per <motion.div> sfruttando useInView per animare gli elementi figli
  const ref = useRef();

  const isInView = useInView(ref, {
    once: false,
    amount: 0.5,
    margin: '200px',
  })

  /*
  clicked viene utilizzato per visualizzare <ContactForm> quando 'true'
  thanksForMail viene utilizzato per cambiare il testo all'interno di <SpeechBubble>, viene impostato a 'true' quando viene inviata la email
  */
  const [clicked, setClicked] = useState(false);
  const [thanksForMail, setThanksForMail] = useState(false);

  /*
  handleClick viene passata come prop a <Button> e <ContactForm>
  handleMessageSent viene passata come prop a <ContactForm>
  */
  const handleClick = () => {
    setClicked(!clicked);
  }
  const handleMessageSent = () => {
    setThanksForMail(true);
  }

  return (
    <div className="w-[65%] md:w-[55%] max-w-[420px] mx-auto space-y-6 py-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 85 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 85 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className='text-center font-lobster text-5xl select-none'>Let's get in touch</h1>
        <div className='p-6 space-y-6 md:space-y-4'>
          <div>
            <BsMailbox2Flag className='inline-block text-4xl me-2'/>
            <span className='font-montserrat text-sm'>rmihajlo800@gmail.com</span>
          </div>
          <div>
            <FaGithubAlt className='inline-block text-4xl me-4' />
            <a 
              href='https://github.com/mihail093' 
              target='_blank' 
              rel="noopener noreferrer"
              className='font-lobster text-xl select-none'
            >
              My Github
            </a>
          </div>
          <div>
            <FaLinkedinIn className='inline-block text-4xl me-4' />
            <a 
              href='https://www.linkedin.com/in/mihajlo-radosavljevic-57a19332b/'
              target='_blank'
              rel="noopener noreferrer"
              className='font-lobster text-xl select-none'
            >
              My LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
      {clicked ? 
      <ContactForm handleClick={handleClick} handleMessageSent={handleMessageSent} />
      :
      <div className='mb-12'>
        <div className='flex justify-center align-center pt-28 me-12'>
          <Fish />
          <div className='relative'>
            {thanksForMail ? 
            <SpeechBubble>
              Hey, thanks for your message! I'll respond to you soon
            </SpeechBubble>
            :
            <SpeechBubble>
              Click the button below if you'd like to contact me through email message 
            </SpeechBubble>
            }
          </div>
        </div>
        <div className='flex justify-center'>
          <Button handleClick={handleClick} label="Contact me" />
        </div>
      </div>
      }
    </div>
  );
};