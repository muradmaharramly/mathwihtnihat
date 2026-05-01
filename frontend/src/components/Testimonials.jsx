import React, { useEffect, useState } from 'react';
import api from '../api';
import { FiStar } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonials.scss';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/public/testimonials');
        setTestimonials(res.data);
      } catch (error) {
        console.error('Error fetching testimonials', error);
      }
    };
    fetchTestimonials();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'S';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      const adjustedValue = Math.max(value, 80);
      color += ('00' + adjustedValue.toString(16)).substr(-2);
    }
    return color;
  };

  const renderCard = (t) => (
    <div className="testim-card">
      <div className="card-top">
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className={i < t.rating ? 'filled' : ''} />
          ))}
        </div>
        <div className="quote-icon">
          <FaQuoteRight />
        </div>
      </div>
      <p className="review-text">{t.review}</p>
      <div className="divider"></div>
      <div className="student-info">
        <div className="avatar" style={{ backgroundColor: stringToColor(t.student_name) }}>
          {getInitials(t.student_name)}
        </div>
        <div className="name-role">
          <h4>{t.student_name}</h4>
          <span>{t.role || 'Tələbə'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">Tələbələrimiz Nə Deyir?</h2>
        
        {testimonials.length > 4 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map(t => (
              <SwiperSlide key={t.id}>
                {renderCard(t)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <React.Fragment key={t.id}>
                {renderCard(t)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
