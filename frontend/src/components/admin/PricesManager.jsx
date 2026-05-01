import React, { useState, useEffect } from 'react';
import api from '../../api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import CustomDropdown from './CustomDropdown';
import CustomModal from './CustomModal';

const PricesManager = () => {
  const [prices, setPrices] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ service_id: '', class_name: '', type: 'Fərdi', price: '' });
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const [pricesRes, servicesRes] = await Promise.all([
        api.get('/public/prices'),
        api.get('/public/services')
      ]);
      setPrices(pricesRes.data);
      setServices(servicesRes.data);
      if (servicesRes.data.length > 0) {
        setFormData(prev => ({ ...prev, service_id: servicesRes.data[0].id }));
      }
    } catch (err) {
      toast.error('Məlumatlar yüklənmədi');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/prices/${editingId}`, formData);
        toast.success('Qiymət yeniləndi');
      } else {
        await api.post('/admin/prices', formData);
        toast.success('Qiymət əlavə edildi');
      }
      setFormData({ ...formData, class_name: '', price: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ service_id: item.service_id, class_name: item.class_name, type: item.type, price: item.price });
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/prices/${deleteModal.id}`);
      toast.success('Qiymət silindi');
      fetchData();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  const serviceOptions = services.map(s => ({ value: s.id, label: `${s.title} (${s.category})` }));
  const typeOptions = [
    { value: 'Fərdi', label: 'Fərdi' },
    { value: 'Qrup', label: 'Qrup' }
  ];

  const filteredPrices = prices.filter(p => 
    p.service_title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manager-container">
      <h2>Qiymətləri İdarə Et</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Xidmət (Hansı dərslər üçün?)</label>
          <CustomDropdown 
            options={serviceOptions}
            value={formData.service_id}
            onChange={(val) => setFormData({...formData, service_id: val})}
            placeholder="Xidmət seçin"
          />
        </div>
        <div className="form-group">
          <label>Sinif / Kateqoriya (Məs: 9-cu sinif)</label>
          <input 
            type="text" 
            value={formData.class_name} 
            onChange={(e) => setFormData({...formData, class_name: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Dərs Növü (Fərdi yoxsa Qrup?)</label>
          <CustomDropdown 
            options={typeOptions}
            value={formData.type}
            onChange={(val) => setFormData({...formData, type: val})}
            placeholder="Dərs növü seçin"
          />
        </div>
        <div className="form-group">
          <label>Qiymət (AZN)</label>
          <input 
            type="number" 
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
            required 
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">{editingId ? 'Yenilə' : 'Əlavə Et'}</button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={() => {
              setEditingId(null);
              setFormData({ ...formData, class_name: '', price: '' });
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
        {filteredPrices.map(p => (
          <div key={p.id} className="data-item">
            <div>
              <strong>{p.service_title}</strong> - {p.class_name} ({p.type})
              <h3 style={{color: '#2B3537', marginTop: '5px'}}>{p.price} AZN</h3>
            </div>
            <div className="actions">
              <button className="btn-edit" onClick={() => handleEdit(p)}><FiEdit2 /></button>
              <button className="btn-delete" onClick={() => handleDeleteClick(p.id)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      <CustomModal 
        isOpen={deleteModal.isOpen} 
        title="Silmək İstədiyinizə Əminsiniz?" 
        message="Bu qiymət qalıcı olaraq silinəcək." 
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteModal({ isOpen: false, id: null })} 
      />
    </div>
  );
};

export default PricesManager;
