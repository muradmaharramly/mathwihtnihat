import React, { useState, useEffect } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import { FiUpload, FiTrash2 } from 'react-icons/fi';

const HeroManager = () => {
  const [heroData, setHeroData] = useState({
    hero_title: '',
    hero_description: '',
    hero_slogan: '',
    hero_circle_image: ''
  });
  const [uploading, setUploading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/public/settings');
        setHeroData({
          hero_title: res.data.hero_title || '',
          hero_description: res.data.hero_description || '',
          hero_slogan: res.data.hero_slogan || '',
          hero_circle_image: res.data.hero_circle_image || ''
        });
      } catch (err) {
        toast.error('Məlumatlar yüklənmədi');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = Object.keys(heroData).map(key => 
        api.put(`/admin/settings/${key}`, { value: heroData[key] }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        })
      );
      await Promise.all(updates);
      toast.success('Giriş ekranı məlumatları yeniləndi');
    } catch (err) {
      toast.error('Yenilənərkən xəta baş verdi');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await api.post('/admin/upload', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setHeroData({ ...heroData, hero_circle_image: res.data.imageUrl });
      toast.success('Şəkil yükləndi');
    } catch (err) {
      toast.error('Şəkil yüklənərkən xəta baş verdi');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setHeroData({ ...heroData, hero_circle_image: '' });
  };

  return (
    <div className="manager-container">
      <h2>Giriş Ekranı Ayarları</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Əsas Başlıq (HTML istifadə oluna bilər: &lt;span&gt;text&lt;/span&gt;)</label>
          <input 
            type="text" 
            value={heroData.hero_title} 
            onChange={(e) => setHeroData({...heroData, hero_title: e.target.value})} 
            placeholder="Gələcəyi bizimlə <span>Kəşf Et!</span>"
            required
          />
        </div>
        <div className="form-group">
          <label>Açıqlama Mətni</label>
          <textarea 
            value={heroData.hero_description} 
            onChange={(e) => setHeroData({...heroData, hero_description: e.target.value})} 
            placeholder="Peşəkar yanaşma, fərdi metodika..."
            required
          />
        </div>
        <div className="form-group">
          <label>Slogan (Sağdakı hərəkət edən mətn)</label>
          <input 
            type="text" 
            value={heroData.hero_slogan} 
            onChange={(e) => setHeroData({...heroData, hero_slogan: e.target.value})} 
            placeholder="Gələcəyin mərkəzində olun!"
            required
          />
        </div>

        <div className="form-group">
          <label>Sağdakı Dairə Üçün Şəkil</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
            {heroData.hero_circle_image && (
              <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <img 
                  src={`${API_URL}${heroData.hero_circle_image}`} 
                  alt="Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                />
                <button 
                  type="button" 
                  onClick={removeImage}
                  style={{ 
                    position: 'absolute', 
                    top: '-5px', 
                    right: '-5px', 
                    background: '#ef4444', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '50%', 
                    width: '24px', 
                    height: '24px', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            )}
            <label className="btn btn-secondary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiUpload /> {uploading ? 'Yüklənir...' : 'Şəkil Yüklə'}
              <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Yadda Saxla</button>
      </form>
    </div>
  );
};

export default HeroManager;
