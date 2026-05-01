import React, { useState, useEffect } from 'react';
import api from '../../api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import CustomModal from './CustomModal';
import CustomDropdown from './CustomDropdown';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({ student_name: '', review: '', rating: 5, role: 'Tələbə' });
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/public/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      toast.error('Rəylər yüklənmədi');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/testimonials/${editingId}`, formData);
        toast.success('Rəy yeniləndi');
      } else {
        await api.post('/admin/testimonials', formData);
        toast.success('Rəy əlavə edildi');
      }
      setFormData({ student_name: '', review: '', rating: 5, role: 'Tələbə' });
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ student_name: item.student_name, review: item.review, rating: item.rating, role: item.role || 'Tələbə' });
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/testimonials/${deleteModal.id}`);
      toast.success('Rəy silindi');
      fetchTestimonials();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.student_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manager-container">
      <h2>Tələbə Rəylərini İdarə Et</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ad və Soyad</label>
          <input 
            type="text" 
            value={formData.student_name} 
            onChange={(e) => setFormData({...formData, student_name: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Rol (Tələbə və ya Valideyn)</label>
          <CustomDropdown 
            options={[
              { value: 'Tələbə', label: 'Tələbə' },
              { value: 'Valideyn', label: 'Valideyn' }
            ]}
            value={formData.role}
            onChange={(val) => setFormData({...formData, role: val})}
            placeholder="Rol seçin"
          />
        </div>
        <div className="form-group">
          <label>Rəy</label>
          <textarea 
            value={formData.review} 
            onChange={(e) => setFormData({...formData, review: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Ulduz Reytinqi (1-5)</label>
          <input 
            type="number" 
            min="1" 
            max="5" 
            value={formData.rating} 
            onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} 
            required 
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">{editingId ? 'Yenilə' : 'Əlavə Et'}</button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={() => {
              setEditingId(null);
              setFormData({ student_name: '', review: '', rating: 5, role: 'Tələbə' });
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
        {filteredTestimonials.map(t => (
          <div key={t.id} className="data-item">
            <div>
              <strong>{t.student_name}</strong> - {t.role || 'Tələbə'} ({t.rating} ulduz)
              <p>"{t.review}"</p>
            </div>
            <div className="actions">
              <button className="btn-edit" onClick={() => handleEdit(t)}><FiEdit2 /></button>
              <button className="btn-delete" onClick={() => handleDeleteClick(t.id)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      <CustomModal 
        isOpen={deleteModal.isOpen} 
        title="Silmək İstədiyinizə Əminsiniz?" 
        message="Bu rəy qalıcı olaraq silinəcək." 
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteModal({ isOpen: false, id: null })} 
      />
    </div>
  );
};

export default TestimonialsManager;
