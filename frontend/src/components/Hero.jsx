import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../api';
import Loader from './common/Loader';
import heroImage from '../assets/hero.png';
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
  const [heroData, setHeroData] = useState({
    hero_title: 'Gələcəyi bizimlə <span>Kəşf Et!</span>',
    hero_description: 'Peşəkar yanaşma, fərdi metodika və 99% nəticə zəmanəti ilə riyaziyyat, proqramlaşdırma və İKT-ni sadəcə əzbərləməyin, dərk edin.',
    hero_slogan: 'Gələcəyin mərkəzində olun!',
    hero_circle_image: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await api.get('/public/settings');
        setHeroData({
          hero_title: res.data.hero_title || heroData.hero_title,
          hero_description: res.data.hero_description || heroData.hero_description,
          hero_slogan: res.data.hero_slogan || heroData.hero_slogan
        });
      } catch (error) {
        console.error('Error fetching hero data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';

  return (
    <section className="hero" id="hero">
      {loading ? (
        <Loader />
      ) : (
      <>
        <div className="hero-main">
        <div className="hero-content">
          <h1 dangerouslySetInnerHTML={{ __html: heroData.hero_title }}></h1>
          <p>{heroData.hero_description}</p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => document.getElementById('register').scrollIntoView({behavior: 'smooth'})}>Dərsə Yazıl</button>
            <a href="https://wa.me/994554735050" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-dynamic-right">
          <div className="text-card stat-2">
            &quot;{heroData.hero_slogan}&quot;
          </div>
          
          <div className="center-circle">
            <img src={heroImage} alt="Hero Circle" />
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
      </>
      )}
    </section>
  );
};

export default Hero;
