import React, { useEffect, useState } from 'react';
import api from '../api';
import * as FiIcons from 'react-icons/fi';
import './Advantages.scss';

const Advantages = () => {
  const [advantages, setAdvantages] = useState([]);

  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        const res = await api.get('/public/advantages');
        setAdvantages(res.data);
      } catch (error) {
        console.error('Error fetching advantages', error);
      }
    };
    fetchAdvantages();
  }, []);

  const renderIcon = (iconName) => {
    const IconComponent = FiIcons[iconName];
    return IconComponent ? <IconComponent size={32} /> : <FiIcons.FiCheckCircle size={32} />;
  };

  return (
    <section className="advantages" id="advantages">
      <div className="container">
        <h2 className="section-title">Niyə Bizi Seçməlisiniz?</h2>
        <div className="advantages-grid">
          {advantages.map(adv => (
            <div key={adv.id} className="adv-card">
              <div className="adv-header">
                <div className="adv-icon">
                  {renderIcon(adv.icon)}
                </div>
                <h3>{adv.title}</h3>
              </div>
              <p>{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
