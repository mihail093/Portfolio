import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button, Alert } from '../ui';
import { RollingMessage } from '../../assets/svg';
import emailjs from '@emailjs/browser';


export default function ContactForm({ handleClick, handleMessageSent }) {

  const { isDark } = useTheme();

  // Definisco la struttura dei dati presenti all'interno dell'email
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Definisco due useState per gestire gli errori (sia della non corretta compilazione del form che errori nell'invio dell'email)
  const [errors, setErrors] = useState({});
  const [sendError, setSendError] = useState(false);
  /*
  Definisco due useState 
    'sending' per visualizzare componente <RollingMessage> 
    'messageSent' per visualizzare componente <Alert>
  */
  const [sending, setSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  // Funzione validateForm per controllare la corretta compilazione del form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message required';
    return newErrors;
  };

  // Funzione sendEmail gestisce l'invio tramite EmailJS
  const sendEmail = async (formData) => {
    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSendError(false);
        setSending(true);
        handleMessageSent();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSendError(true);
    }
  };

  // Funzione handleSubmit per l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setMessageSent(false);
      setSendError(false);
      sendEmail(formData);
    } else {
      setErrors(newErrors);
    }
  };

  // Funzione handleChange per gli <input> e <textarea> presenti nel form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
      ...prev,
      [name]: ''
      }));
    }
  };

  return (
    <div className='relative'>
      {messageSent && <Alert label='Message sent successfully' type='success' />}
      {sendError && <Alert label="I'm sorry, something went wrong" type='warning' />}
      {sending ? <RollingMessage setSending={setSending} setMessageSent={setMessageSent} formData={formData} setFormData={setFormData} /> : (
        <div className='mb-12'>
          <div className='w-full flex justify-end mb-6'>
            <Button handleClick={handleClick} label="Back" />
          </div>
          <form className='space-y-4 me-[36px]' onSubmit={handleSubmit}>
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-3xl text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <div className={`text-center rounded-3xl ${isDark? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}><p className="text-md">{errors.name}</p></div>}
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-3xl text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <div className={`text-center rounded-3xl ${isDark? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}><p className="text-md">{errors.email}</p></div>}
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-3xl text-black"
                />
              </div>

              <div className="space-y-2">
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full p-3 border rounded-lg text-black ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.message && <div className={`text-center rounded-3xl ${isDark? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}><p className="text-md">{errors.message}</p></div>}
              </div>

              <Button type="submit" label="Send Message" />
          </form>
        </div>
      )}
    </div>
  )
}
