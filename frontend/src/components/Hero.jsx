import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Hero.scss';

const Counter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Extract number from target (e.g., "100+" -> 100)
    const targetValue = parseInt(target.replace(/[^0-9]/g, '')) || 0;
    const suffix = target.replace(/[0-9]/g, '');
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * targetValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);

  const suffix = target.replace(/[0-9]/g, '');
  return <>{count}{suffix}</>;
};

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-main">
        <div className="hero-content">
          <h1>Riyaziyyatı bizimlə <span>Kəşf Et!</span></h1>
          <p>Peşəkar yanaşma, fərdi metodika və 100% nəticə zəmanəti ilə riyaziyyatı sadəcə əzbərləməyin, dərk edin.</p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => document.getElementById('register').scrollIntoView({behavior: 'smooth'})}>Dərsə Yazıl</button>
            <a href="https://wa.me/994554735050" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-dynamic-right">
          <div className="text-card stat-2">
            "Riyaziyyat heç vaxt bu qədər asan olmamışdı!"
          </div>
          
          <div className="center-circle">
            <span>Riyaziyyat</span>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-icon"><FiUsers /></div>
          <div className="stat-info">
            <h4><Counter target="100+" /></h4>
            <span>Uğurlu Tələbə</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon"><FiAward /></div>
          <div className="stat-info">
            <h4><Counter target="5 İllik" /></h4>
            <span>Təcrübə</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon"><FiTrendingUp /></div>
          <div className="stat-info">
            <h4><Counter target="99%" /></h4>
            <span>Nəticə Zəmanəti</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
