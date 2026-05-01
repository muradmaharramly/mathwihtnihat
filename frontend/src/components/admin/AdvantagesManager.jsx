import React, { useState, useEffect } from 'react';
import api from '../../api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import CustomModal from './CustomModal';

const AdvantagesManager = () => {
  const [advantages, setAdvantages] = useState([]);
  const [formData, setFormData] = useState({ icon: 'FiCheckCircle', title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdvantages = async () => {
    try {
      const res = await api.get('/public/advantages');
      setAdvantages(res.data);
    } catch (err) {
      toast.error('Üstünlüklər yüklənmədi');
    }
  };

  useEffect(() => {
    fetchAdvantages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/advantages/${editingId}`, formData);
        toast.success('Üstünlük yeniləndi');
      } else {
        await api.post('/admin/advantages', formData);
        toast.success('Üstünlük əlavə edildi');
      }
      setFormData({ icon: 'FiCheckCircle', title: '', description: '' });
      setEditingId(null);
      fetchAdvantages();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ icon: item.icon, title: item.title, description: item.description });
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/advantages/${deleteModal.id}`);
      toast.success('Üstünlük silindi');
      fetchAdvantages();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  const filteredAdvantages = advantages.filter(adv => 
    adv.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    adv.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manager-container">
      <h2>Üstünlükləri İdarə Et</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>İkon (Feather icon adı, məs: FiCheckCircle, FiStar, FiBook)</label>
          <input 
            type="text" 
            value={formData.icon} 
            onChange={(e) => setFormData({...formData, icon: e.target.value})} 
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
              setFormData({ icon: 'FiCheckCircle', title: '', description: '' });
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
        {filteredAdvantages.map(a => (
          <div key={a.id} className="data-item">
            <div>
              <strong>{a.title}</strong> ({a.icon})
              <p>{a.description}</p>
            </div>
            <div className="actions">
              <button className="btn-edit" onClick={() => handleEdit(a)}><FiEdit2 /></button>
              <button className="btn-delete" onClick={() => handleDeleteClick(a.id)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      <CustomModal 
        isOpen={deleteModal.isOpen} 
        title="Silmək İstədiyinizə Əminsiniz?" 
        message="Bu üstünlük qalıcı olaraq silinəcək." 
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteModal({ isOpen: false, id: null })} 
      />
    </div>
  );
};

export default AdvantagesManager;
