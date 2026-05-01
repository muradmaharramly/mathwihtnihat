import React, { useEffect, useState } from 'react';
import api from '../api';
import { FiBookOpen } from 'react-icons/fi';
import './Services.scss';

const Services = () => {
  const [services, setServices] = useState([]);
  const [prices, setPrices] = useState([]);
  const [openPricesId, setOpenPricesId] = useState(null);

  const togglePrices = (id) => {
    setOpenPricesId(openPricesId === id ? null : id);
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
      }
    };
    fetchData();
  }, []);

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Xidmətlər və Qiymətlər</h2>
        
        <div className="services-grid">
          {services.length === 0 ? (
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
                  {openPricesId === service.id ? 'Qiymətləri Gizlət' : 'Qiymətlərə Bax'}
                </button>

                {openPricesId === service.id && (
                  <div className="pricing-list">
                    {prices.filter(p => p.service_id === service.id).length === 0 ? (
                      <div className="price-item"><span className="class-name">Qiymət təyin edilməyib</span></div>
                    ) : (
                      prices.filter(p => p.service_id === service.id).map(price => (
                        <div key={price.id} className="price-item">
                          <span className="class-name">{price.class_name} ({price.type})</span>
                          <span className="price-val">{price.price} AZN</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
