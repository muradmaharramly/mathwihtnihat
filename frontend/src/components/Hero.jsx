import React from 'react';
import { FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';
import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1>Riyaziyyatı bizimlə <span>Kəşf Et!</span></h1>
        <p>Peşəkar yanaşma, fərdi metodika və 100% nəticə zəmanəti ilə riyaziyyatı sadəcə əzbərləməyin, dərk edin.</p>
        <button className="btn btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}>Dərsə Yazıl</button>
      </div>
      <div className="hero-dynamic-right">
        <div className="stat-card stat-1">
          <div className="stat-icon"><FiUsers /></div>
          <div>
            <h4>100+</h4>
            <span>Uğurlu Tələbə</span>
          </div>
        </div>
        
        <div className="text-card stat-2">
          "Riyaziyyat heç vaxt bu qədər asan olmamışdı!"
        </div>
        
        <div className="stat-card stat-3">
          <div className="stat-icon"><FiTrendingUp /></div>
          <div>
            <h4>99%</h4>
            <span>Nəticə Zəmanəti</span>
          </div>
        </div>

        <div className="stat-card stat-4">
          <div className="stat-icon"><FiAward /></div>
          <div>
            <h4>5 İllik</h4>
            <span>Təcrübə</span>
          </div>
        </div>
        
        <div className="center-circle">
          <span>Riyaziyyat</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
