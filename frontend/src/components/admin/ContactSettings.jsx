import React, { useState, useEffect } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import CustomModal from './CustomModal';

const ContactSettings = () => {
  // Contact Info State
  const [contactData, setContactData] = useState({
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    contact_map_url: ''
  });

  // Social Media State
  const [socialMedia, setSocialMedia] = useState([]);
  const [smFormData, setSmFormData] = useState({ platform: '', icon: 'FiInstagram', url: '' });
  const [editingSmId, setEditingSmId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Data
  const fetchData = async () => {
    try {
      const [settingsRes, smRes] = await Promise.all([
        api.get('/public/settings'),
        api.get('/public/social_media')
      ]);
      setContactData({
        contact_phone: settingsRes.data.contact_phone || '',
        contact_email: settingsRes.data.contact_email || '',
        contact_address: settingsRes.data.contact_address || '',
        contact_map_url: settingsRes.data.contact_map_url || ''
      });
      setSocialMedia(smRes.data);
    } catch (err) {
      toast.error('Məlumatlar yüklənmədi');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Contact Info Update
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = Object.keys(contactData).map(key => 
        api.put(`/admin/settings/${key}`, { value: contactData[key] })
      );
      await Promise.all(updates);
      toast.success('Əlaqə məlumatları yeniləndi');
    } catch (err) {
      toast.error('Əlaqə məlumatları yenilənərkən xəta baş verdi');
    }
  };

  // Handle Social Media CRUD
  const handleSmSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSmId) {
        await api.put(`/admin/social_media/${editingSmId}`, smFormData);
        toast.success('Sosial media yeniləndi');
      } else {
        await api.post('/admin/social_media', smFormData);
        toast.success('Sosial media əlavə edildi');
      }
      setSmFormData({ platform: '', icon: 'FiInstagram', url: '' });
      setEditingSmId(null);
      fetchData();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
  };

  const handleSmEdit = (item) => {
    setEditingSmId(item.id);
    setSmFormData({ platform: item.platform, icon: item.icon, url: item.url });
  };

  const handleSmDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmSmDelete = async () => {
    try {
      await api.delete(`/admin/social_media/${deleteModal.id}`);
      toast.success('Sosial media silindi');
      fetchData();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  const filteredSM = socialMedia.filter(sm => 
    sm.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manager-container">
      <h2>Əlaqə Məlumatları</h2>
      <form onSubmit={handleContactSubmit} style={{ marginBottom: '3rem', borderBottom: '1px solid #ccc', paddingBottom: '2rem' }}>
        <div className="form-group">
          <label>Telefon Nömrəsi</label>
          <input 
            type="text" 
            value={contactData.contact_phone} 
            onChange={(e) => setContactData({...contactData, contact_phone: e.target.value})} 
            placeholder="+994 50 000 00 00"
          />
        </div>
        <div className="form-group">
          <label>E-poçt ünvanı</label>
          <input 
            type="email" 
            value={contactData.contact_email} 
            onChange={(e) => setContactData({...contactData, contact_email: e.target.value})} 
            placeholder="info@mathwithnihat.az"
          />
        </div>
        <div className="form-group">
          <label>Ünvan</label>
          <input 
            type="text" 
            value={contactData.contact_address} 
            onChange={(e) => setContactData({...contactData, contact_address: e.target.value})} 
            placeholder="Bakı, Azərbaycan"
          />
        </div>
        <div className="form-group">
          <label>Google Maps Iframe URL (Xəritə linki src="...")</label>
          <textarea 
            value={contactData.contact_map_url} 
            onChange={(e) => setContactData({...contactData, contact_map_url: e.target.value})} 
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
        </div>
        <button type="submit" className="btn btn-primary">Yadda Saxla</button>
      </form>

      <h2>Sosial Şəbəkələr</h2>
      <form onSubmit={handleSmSubmit}>
        <div className="form-group">
          <label>Platforma Adı (Məs: Instagram, LinkedIn)</label>
          <input 
            type="text" 
            value={smFormData.platform} 
            onChange={(e) => setSmFormData({...smFormData, platform: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>İkon (Feather icon adı, məs: FiInstagram, FiLinkedin, FiFacebook, FiYoutube)</label>
          <input 
            type="text" 
            value={smFormData.icon} 
            onChange={(e) => setSmFormData({...smFormData, icon: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Hesab URL-i (Profilinizin tam linki)</label>
          <input 
            type="url" 
            value={smFormData.url} 
            onChange={(e) => setSmFormData({...smFormData, url: e.target.value})} 
            placeholder="https://instagram.com/..."
            required 
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">{editingSmId ? 'Yenilə' : 'Əlavə Et'}</button>
          {editingSmId && (
            <button type="button" className="btn btn-secondary" onClick={() => {
              setEditingSmId(null);
              setSmFormData({ platform: '', icon: 'FiInstagram', url: '' });
            }}>
              Ləğv et
            </button>
          )}
        </div>
      </form>

      <div className="search-bar" style={{ margin: '2rem 0 1rem' }}>
        <input 
          type="text" 
          placeholder="Platforma axtar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-group"
          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="data-list">
        {filteredSM.map(sm => (
          <div key={sm.id} className="data-item">
            <div>
              <strong>{sm.platform}</strong> ({sm.icon})
              <p style={{wordBreak: 'break-all'}}>{sm.url}</p>
            </div>
            <div className="actions">
              <button className="btn-edit" onClick={() => handleSmEdit(sm)}><FiEdit2 /></button>
              <button className="btn-delete" onClick={() => handleSmDeleteClick(sm.id)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      <CustomModal 
        isOpen={deleteModal.isOpen} 
        title="Silmək İstədiyinizə Əminsiniz?" 
        message="Bu sosial şəbəkə qalıcı olaraq silinəcək." 
        onConfirm={confirmSmDelete} 
        onCancel={() => setDeleteModal({ isOpen: false, id: null })} 
      />
    </div>
  );
};

export default ContactSettings;
