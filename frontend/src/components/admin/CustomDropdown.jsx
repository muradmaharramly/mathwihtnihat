import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './CustomDropdown.scss';

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div 
        className={`dropdown-header ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <FiChevronDown className={`icon ${isOpen ? 'open' : ''}`} />
      </div>
      
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li 
              key={option.value}
              className={option.value === value ? 'selected' : ''}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
