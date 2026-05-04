import React, { useState, useEffect } from 'react';
import api from '../api';
import './Registration.scss';

const Registration = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    service_id: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/public/services');
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services', err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/public/register', formData);
      setMessage({ type: 'success', text: 'Qeydiyyatınız uğurla qəbul edildi! Sizinlə tezliklə əlaqə saxlayacağıq.' });
      setFormData({ full_name: '', phone: '', email: '', service_id: '', notes: '' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registration" id="register">
      <div className="container">
        <div className="registration-card">
          <div className="registration-content">
            <div className="registration-header">
              <h2 className="section-title">Dərsə Yazıl</h2>
              <p>Özünüzə uyğun xidməti seçin və qeydiyyatdan keçin. Peşəkar hazırlıq üçün ilk addımı atın.</p>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="full_name">Ad və Soyad *</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Məs: Nihat Yasinzadə"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefon Nömrəsi *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Məs: +994 55 000 00 00"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-poçt Ünvanı</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Məs: misal@mail.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service_id">Xidmət Seçin *</label>
                  <select
                    id="service_id"
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seçim edin...</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="notes">Əlavə Qeydlər</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Dərslər haqqında xüsusi suallarınız və ya qeydləriniz..."
                    rows="4"
                  ></textarea>
                </div>
              </div>

              {message.text && (
                <div className={`form-message ${message.type}`}>
                  {message.text}
                </div>
              )}

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Göndərilir...' : 'Qeydiyyatı Tamamla'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
