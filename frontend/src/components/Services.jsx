import React, { useEffect, useState } from 'react';
import api from '../api';
import { FiBookOpen, FiX } from 'react-icons/fi';
import Loader from './common/Loader';
import './Services.scss';

const Services = () => {
  const [services, setServices] = useState([]);
  const [prices, setPrices] = useState([]);
  const [openPricesId, setOpenPricesId] = useState(null);
  const [loading, setLoading] = useState(true);

  const togglePrices = (id) => {
    setOpenPricesId(id);
  };

  const closePrices = () => {
    setOpenPricesId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, pricesRes] = await Promise.all([
          api.get('/public/services'),
          api.get('/public/prices')
        ]);
        setServices(servicesRes.data);
        setPrices(pricesRes.data);
      } catch (error) {
        console.error('Error fetching services data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Xidmətlər və Qiymətlər</h2>
        
        <div className="services-grid">
          {loading ? (
            <Loader />
          ) : services.length === 0 ? (
            <p>Heç bir xidmət tapılmadı.</p>
          ) : (
            services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <div className="header-top" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.2rem' }}>
                    <div className="icon-wrapper" style={{ marginBottom: 0 }}>
                      <FiBookOpen />
                    </div>
                    <span className="category-badge" style={{ marginBottom: 0 }}>{service.category}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                
                <button 
                  className="btn-show-prices" 
                  onClick={() => togglePrices(service.id)}
                >
                  Qiymətlərə Bax
                </button>
              </div>

            ))
          )}
        </div>
        
        {openPricesId && (
          <div className="pricing-modal-overlay" onClick={closePrices}>
            <div className="pricing-modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={closePrices}><FiX size={24}/></button>
              <h3>
                {services.find(s => s.id === openPricesId)?.title} - Qiymətlər
              </h3>
              <div className="pricing-list">
                {prices.filter(p => p.service_id === openPricesId).length === 0 ? (
                  <div className="price-item"><span className="class-name">Qiymət təyin edilməyib</span></div>
                ) : (
                  prices.filter(p => p.service_id === openPricesId).map(price => (
                    <div key={price.id} className="price-item">
                      <span className="class-name">{price.class_name} ({price.type})</span>
                      <span className="price-val">{price.price} AZN</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
