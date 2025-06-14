import React from 'react';
import { XCircleIcon, LightBulbIcon, CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import './Alert.css'

// Definizione dei tipi di avviso con le relative icone e stili
const ALERT_TYPES = {
  success: {
    icon: CheckBadgeIcon,
    className: 'h-6 w-6 text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900'
  },
  warning: {
    icon: ExclamationTriangleIcon,
    className: 'h-6 w-6 text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900'
  },
  info: {
    icon: LightBulbIcon,
    iconStyle: 'flash-icon h-6 w-6',
    bgColor: 'bg-blue-100 dark:bg-[#a0e7c2]'
  }
};

export default function Alert({ label, type }) {

  // Funzione per gestire il click sull'icona di chiusura
  const handleClick = (e) => {
    const parentDiv = e.target.closest('.show-alert');
    parentDiv.classList.add('hidden');
  }

  // Selezione dell'icona e delle classi in base al tipo di avviso
  const AlertIcon = ALERT_TYPES[type]?.icon || ALERT_TYPES.info.icon;
  const alertIconClass = ALERT_TYPES[type]?.className || ALERT_TYPES.info.iconStyle;
  const bgClass = ALERT_TYPES[type]?.bgColor || ALERT_TYPES.info.bgColor;

  return (
    <div 
      role="alert" 
      className={`show-alert ${bgClass}`}
    >
      <div className='flex items-center gap-2'>
        <AlertIcon className={alertIconClass} />
        <span className='flex-grow text-md text-black'>{label}</span>
        <XCircleIcon 
          className='h-6 w-6 text-black hover:scale-125 cursor-pointer transition-transform'
          onClick={handleClick}
        /> 
      </div>
    </div>
  )
}
