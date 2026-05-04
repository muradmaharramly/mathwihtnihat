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
            <div className="contact-header">
              <h3>Əlaqə</h3>
            </div>
            
            <div className="info-list">
              <div className="info-item">
                <div className="icon-box">
                  <FiIcons.FiPhone className="icon" />
                </div>
                <div className="info-text">
                  <label>Telefon</label>
                  <span>{settings.contact_phone || '+994 55 473 50 50'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="icon-box">
                  <FiIcons.FiMail className="icon" />
                </div>
                <div className="info-text">
                  <label>E-poçt</label>
                  <span>{settings.contact_email || 'yasinzadenihat56@gmail.com'}</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="icon-box">
                  <FiIcons.FiMapPin className="icon" />
                </div>
                <div className="info-text">
                  <label>Ünvan</label>
                  <span>{settings.contact_address || 'Sumqayıt, Azərbaycan'}</span>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h4>Bizi İzləyin</h4>
              <div className="social-links">
                {socialMedia
                  .filter(sm => !sm.platform.toLowerCase().includes('instagram'))
                  .map(sm => (
                    <a key={sm.id} href={sm.url} target="_blank" rel="noreferrer" title={sm.platform}>
                      {renderIcon(sm.icon)}
                    </a>
                  ))}
              </div>
            </div>
          </div>
          
          <div className="contact-map">
             <iframe 
               src={(settings.contact_map_url && settings.contact_map_url.includes('google.com/maps/embed')) 
                    ? settings.contact_map_url 
                    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48507.03159938833!2d49.6053308!3d40.5854817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403096dcd0923f6b%3A0xdf45461a50a905a!2sSumqayit%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1714853000000!5m2!1sen!2s"} 
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
