import React, { useEffect, useState } from 'react';
import api from '../api';
import * as FiIcons from 'react-icons/fi';
import './Contact.scss';

const Contact = () => {
  const [settings, setSettings] = useState({});
  const [socialMedia, setSocialMedia] = useState([]);

  const renderIcon = (iconName) => {
    const IconComponent = FiIcons[iconName];
    return IconComponent ? <IconComponent /> : <FiIcons.FiLink />;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, smRes] = await Promise.all([
          api.get('/public/settings'),
          api.get('/public/social_media')
        ]);
        setSettings(settingsRes.data);
        setSocialMedia(smRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Bizimlə Əlaqə</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <FiIcons.FiPhone className="icon" />
              <span>{settings.contact_phone || '+994 50 000 00 00'}</span>
            </div>
            <div className="info-item">
              <FiIcons.FiMail className="icon" />
              <span>{settings.contact_email || 'info@mathwithnihat.az'}</span>
            </div>
            <div className="info-item">
              <FiIcons.FiMapPin className="icon" />
              <span>{settings.contact_address || 'Bakı, Azərbaycan'}</span>
            </div>
            <div className="social-links">
              {socialMedia.map(sm => (
                <a key={sm.id} href={sm.url} target="_blank" rel="noreferrer" title={sm.platform}>
                  {renderIcon(sm.icon)}
                </a>
              ))}
            </div>
          </div>
          <div className="contact-map">
             <iframe 
               src={settings.contact_map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.4299596001!2d49.71487440474776!3d40.3945081079313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"} 
               width="100%" 
               height="100%" 
               style={{border: 0}} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
