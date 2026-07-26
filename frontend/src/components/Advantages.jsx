import React, { useEffect, useState } from 'react';
import api from '../api';
import DynamicIcon from './common/DynamicIcon';
import Loader from './common/Loader';
import './Advantages.scss';

const Advantages = () => {
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        const res = await api.get('/public/advantages');
        setAdvantages(res.data);
      } catch (error) {
        console.error('Error fetching advantages', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvantages();
  }, []);

  const renderIcon = (iconName) => {
    return <DynamicIcon name={iconName} size={32} />;
  };

  return (
    <section className="advantages" id="advantages">
      <div className="container">
        <h2 className="section-title">Niyə Bizi Seçməlisiniz?</h2>
        {loading ? (
          <Loader />
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default Advantages;
