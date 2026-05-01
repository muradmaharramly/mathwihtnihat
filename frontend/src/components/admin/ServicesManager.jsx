import React, { useState, useEffect } from 'react';
import api from '../../api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import CustomModal from './CustomModal';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ category: '', title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchServices = async () => {
    try {
      const res = await api.get('/public/services');
      setServices(res.data);
    } catch (err) {
      toast.error('Xidmətlər yüklənmədi');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/services/${editingId}`, formData);
        toast.success('Xidmət yeniləndi');
      } else {
        await api.post('/admin/services', formData);
        toast.success('Xidmət əlavə edildi');
      }
      setFormData({ category: '', title: '', description: '' });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ category: item.category, title: item.title, description: item.description });
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/services/${deleteModal.id}`);
      toast.success('Xidmət silindi');
      fetchServices();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manager-container">
      <h2>Xidmətləri İdarə Et</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Kateqoriya</label>
          <input 
            type="text" 
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Başlıq</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Məzmun</label>
          <textarea 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
            required 
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">{editingId ? 'Yenilə' : 'Əlavə Et'}</button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={() => {
              setEditingId(null);
              setFormData({ category: '', title: '', description: '' });
            }}>
              Ləğv et
            </button>
          )}
        </div>
      </form>

      <div className="search-bar" style={{ margin: '2rem 0 1rem' }}>
        <input 
          type="text" 
          placeholder="Axtarış..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-group"
          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="data-list">
        {filteredServices.map(s => (
          <div key={s.id} className="data-item">
            <div>
              <strong>{s.title}</strong> ({s.category})
              <p>{s.description}</p>
            </div>
            <div className="actions">
              <button className="btn-edit" onClick={() => handleEdit(s)}><FiEdit2 /></button>
              <button className="btn-delete" onClick={() => handleDeleteClick(s.id)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      <CustomModal 
        isOpen={deleteModal.isOpen} 
        title="Silmək İstədiyinizə Əminsiniz?" 
        message="Bu xidmət qalıcı olaraq silinəcək." 
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteModal({ isOpen: false, id: null })} 
      />
    </div>
  );
};

export default ServicesManager;
