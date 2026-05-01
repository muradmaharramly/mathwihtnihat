import React, { useState, useEffect } from 'react';
import api from '../../api';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import CustomModal from './CustomModal';

const FaqManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFaqs = async () => {
    try {
      const res = await api.get('/public/faqs');
      setFaqs(res.data);
    } catch (err) {
      toast.error('Sual-cavablar yüklənmədi');
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/faqs/${editingId}`, formData);
        toast.success('Sual yeniləndi');
      } else {
        await api.post('/admin/faqs', formData);
        toast.success('Sual əlavə edildi');
      }
      setFormData({ question: '', answer: '' });
      setEditingId(null);
      fetchFaqs();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ question: item.question, answer: item.answer });
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/faqs/${deleteModal.id}`);
      toast.success('Sual silindi');
      fetchFaqs();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manager-container">
      <h2>Sual-Cavab İdarəetməsi (FAQ)</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Sual</label>
          <input 
            type="text" 
            value={formData.question} 
            onChange={(e) => setFormData({...formData, question: e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Cavab</label>
          <textarea 
            value={formData.answer} 
            onChange={(e) => setFormData({...formData, answer: e.target.value})} 
            required 
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">{editingId ? 'Yenilə' : 'Əlavə Et'}</button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={() => {
              setEditingId(null);
              setFormData({ question: '', answer: '' });
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
        {filteredFaqs.map(f => (
          <div key={f.id} className="data-item">
            <div>
              <strong>{f.question}</strong>
              <p>{f.answer}</p>
            </div>
            <div className="actions">
              <button className="btn-edit" onClick={() => handleEdit(f)}><FiEdit2 /></button>
              <button className="btn-delete" onClick={() => handleDeleteClick(f.id)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      <CustomModal 
        isOpen={deleteModal.isOpen} 
        title="Silmək İstədiyinizə Əminsiniz?" 
        message="Bu sual qalıcı olaraq silinəcək." 
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteModal({ isOpen: false, id: null })} 
      />
    </div>
  );
};

export default FaqManager;
