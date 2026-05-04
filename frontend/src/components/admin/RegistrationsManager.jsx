import React, { useState, useEffect } from 'react';
import api from '../../api';
import { FiTrash2, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import CustomModal from './CustomModal';

const RegistrationsManager = () => {
  const [registrations, setRegistrations] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRegistrations = async () => {
    try {
      const res = await api.get('/admin/registrations');
      setRegistrations(res.data);
    } catch (err) {
      toast.error('Qeydiyyatlar yüklənmədi');
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/admin/registrations/${id}`, { status });
      toast.success('Status yeniləndi');
      fetchRegistrations();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/admin/registrations/${deleteModal.id}`);
      toast.success('Qeydiyyat silindi');
      fetchRegistrations();
    } catch (err) {
      toast.error('Xəta baş verdi');
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  const filteredRegistrations = registrations.filter(r => 
    r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.phone.includes(searchTerm) ||
    (r.service_title && r.service_title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Yeni': return 'badge-new';
      case 'Qəbul edildi': return 'badge-success';
      case 'İmtina edildi': return 'badge-danger';
      default: return '';
    }
  };

  return (
    <div className="manager-container">
      <h2>Müraciətlər (Qeydiyyatlar)</h2>

      <div className="search-bar" style={{ margin: '1rem 0 2rem' }}>
        <input 
          type="text" 
          placeholder="Ad, telefon və ya xidmət üzrə axtar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-group"
          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tarix</th>
              <th>Tələbə</th>
              <th>Əlaqə</th>
              <th>Xidmət</th>
              <th>Qeyd</th>
              <th>Status</th>
              <th>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map(r => (
                <tr key={r.id}>
                  <td>{new Date(r.created_at).toLocaleDateString('az-AZ')}</td>
                  <td><strong>{r.full_name}</strong></td>
                  <td>
                    <div>{r.phone}</div>
                    <small>{r.email}</small>
                  </td>
                  <td>{r.service_title || 'Ümumi'}</td>
                  <td title={r.notes}>{r.notes ? (r.notes.length > 30 ? r.notes.substring(0, 30) + '...' : r.notes) : '-'}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn-action success" title="Qəbul et" onClick={() => handleStatusChange(r.id, 'Qəbul edildi')}>
                        <FiCheckCircle />
                      </button>
                      <button className="btn-action info" title="Yeni" onClick={() => handleStatusChange(r.id, 'Yeni')}>
                        <FiClock />
                      </button>
                      <button className="btn-action warning" title="İmtina et" onClick={() => handleStatusChange(r.id, 'İmtina edildi')}>
                        <FiXCircle />
                      </button>
                      <button className="btn-delete" title="Sil" onClick={() => handleDeleteClick(r.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Müraciət tapılmadı</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CustomModal 
        isOpen={deleteModal.isOpen} 
        title="Müraciəti Silmək İstədiyinizə Əminsiniz?" 
        message="Bu müraciət qalıcı olaraq silinəcək." 
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteModal({ isOpen: false, id: null })} 
      />
    </div>
  );
};

export default RegistrationsManager;
