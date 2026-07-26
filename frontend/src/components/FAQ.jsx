import React, { useEffect, useState } from 'react';
import api from '../api';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import Loader from './common/Loader';
import './FAQ.scss';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await api.get('/public/faqs');
        setFaqs(res.data);
      } catch (error) {
        console.error('Error fetching FAQs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFaq = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <h2 className="section-title">Tez-tez Verilən Suallar</h2>
        
        <div className="faq-layout">
          <div className="faq-left">
            <div className="question-box">
              <div className="q-icon q-icon-1"><FiHelpCircle /></div>
              <div className="q-icon q-icon-2"><FiHelpCircle /></div>
              <div className="q-icon q-icon-3"><FiHelpCircle /></div>
              <div className="q-icon q-icon-4"><FiHelpCircle /></div>
              
              <div className="box-content">
                <h3>Sualınız qaldı?</h3>
                <p>Bizimlə əlaqə bölməsindən dərhal suallarınızı ünvanlaya bilərsiniz.</p>
              </div>
            </div>
          </div>
          
          <div className="faq-right">
            <div className="faq-list">
              {loading ? (
                <Loader />
              ) : faqs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question">
                    {faq.question}
                    <FiChevronDown className="icon" />
                  </div>
                  {activeIndex === index && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
