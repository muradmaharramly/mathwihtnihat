import { FiCheckCircle } from 'react-icons/fi';
import api from '../api';
import './Registration.scss';
import { useEffect, useState } from 'react';
import CustomDropdown from './common/CustomDropdown';
import Loader from './common/Loader';

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
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/public/services');
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services', err);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (val) => {
    setFormData({ ...formData, service_id: val });
  };

  const serviceOptions = services.map(s => ({ value: s.id, label: s.title }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service_id) {
      setError('Zəhmət olmasa bir xidmət seçin.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await api.post('/public/register', formData);
      setIsSubmitted(true);
      setFormData({ full_name: '', phone: '', email: '', service_id: '', notes: '' });
    } catch (err) {
      setError('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registration" id="register">
      <div className="container">
        <div className="registration-card">
          {fetchLoading ? (
            <Loader />
          ) : (
          <div className="registration-content">
            {isSubmitted ? (
              <div className="registration-success">
                <div className="success-icon">
                  <FiCheckCircle />
                </div>
                <h3>Uğurlu Müraciət!</h3>
                <p>Qeydiyyatınız uğurla qəbul edildi! Sizinlə tezliklə əlaqə saxlayacağıq.</p>
                <button className="btn-back" onClick={() => setIsSubmitted(false)}>
                  Yeni Müraciət
                </button>
              </div>
            ) : (
              <>
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
                      <CustomDropdown
                        options={serviceOptions}
                        value={formData.service_id}
                        onChange={handleDropdownChange}
                        placeholder="Xidmət seçin..."
                        className="registration-dropdown"
                      />
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

                  {error && (
                    <div className="form-message error">
                      {error}
                    </div>
                  )}

                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Göndərilir...' : 'Qeydiyyatı Tamamla'}
                  </button>
                </form>
              </>
            )}
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Registration;
