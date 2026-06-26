import React, { useState, useEffect } from 'react';
import { FiBox } from 'react-icons/fi'; // fallback icon

const DynamicIcon = ({ name, size = 24, className = '' }) => {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    if (!name || typeof name !== 'string') {
      return;
    }

    const loadIcon = async () => {
      try {
        const prefix = name.substring(0, 2).toLowerCase();
        let module;
        
        switch (prefix) {
          case 'fa':
            if (name.startsWith('Fa6')) {
              module = await import('react-icons/fa6');
            } else {
              module = await import('react-icons/fa');
            }
            break;
          case 'fi': module = await import('react-icons/fi'); break;
          case 'ai': module = await import('react-icons/ai'); break;
          case 'bs': module = await import('react-icons/bs'); break;
          case 'bi': module = await import('react-icons/bi'); break;
          case 'ci': module = await import('react-icons/ci'); break;
          case 'cg': module = await import('react-icons/cg'); break;
          case 'di': module = await import('react-icons/di'); break;
          case 'fc': module = await import('react-icons/fc'); break;
          case 'gi': module = await import('react-icons/gi'); break;
          case 'go': module = await import('react-icons/go'); break;
          case 'gr': module = await import('react-icons/gr'); break;
          case 'hi': 
            if (name.startsWith('Hi2')) module = await import('react-icons/hi2');
            else module = await import('react-icons/hi');
            break;
          case 'im': module = await import('react-icons/im'); break;
          case 'io': 
            if (name.startsWith('Io5')) module = await import('react-icons/io5');
            else module = await import('react-icons/io');
            break;
          case 'lu': module = await import('react-icons/lu'); break;
          case 'md': module = await import('react-icons/md'); break;
          case 'pi': module = await import('react-icons/pi'); break;
          case 'ri': module = await import('react-icons/ri'); break;
          case 'rx': module = await import('react-icons/rx'); break;
          case 'si': module = await import('react-icons/si'); break;
          case 'sl': module = await import('react-icons/sl'); break;
          case 'tb': module = await import('react-icons/tb'); break;
          case 'tf': 
            if (name.startsWith('Tfi')) module = await import('react-icons/tfi');
            break;
          case 'ti': module = await import('react-icons/ti'); break;
          case 'vs': 
            if (name.startsWith('Vsc')) module = await import('react-icons/vsc');
            break;
          case 'wi': module = await import('react-icons/wi'); break;
          default:
            break;
        }

        if (module && module[name] && isMounted) {
          setIconComponent(() => module[name]);
        }
      } catch (err) {
        console.warn(`DynamicIcon: Failed to load icon ${name}`);
      }
    };

    loadIcon();

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (!IconComponent) {
    return <FiBox size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;
