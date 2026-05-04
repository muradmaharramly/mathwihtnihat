import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiBookOpen, FiGrid, FiStar, FiHelpCircle, FiLogOut, FiDollarSign } from 'react-icons/fi';
import ServicesManager from '../components/admin/ServicesManager';
import PricesManager from '../components/admin/PricesManager';
import AdvantagesManager from '../components/admin/AdvantagesManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import FaqManager from '../components/admin/FaqManager';
import ContactSettings from '../components/admin/ContactSettings';
import RegistrationsManager from '../components/admin/RegistrationsManager';
import './AdminDashboard.scss';
import { FiUserPlus } from 'react-icons/fi';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'services': return <ServicesManager />;
      case 'prices': return <PricesManager />;
      case 'advantages': return <AdvantagesManager />;
      case 'testimonials': return <TestimonialsManager />;
      case 'faqs': return <FaqManager />;
      case 'registrations': return <RegistrationsManager />;
      case 'contact': return <ContactSettings />;
      default: return <ServicesManager />;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'registrations' ? 'active' : ''} onClick={() => setActiveTab('registrations')}>
            <FiUserPlus size={20} /> Qeydiyyatlar
          </li>
          <li className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>
            <FiBookOpen size={20} /> Xidmətlər
          </li>
          <li className={activeTab === 'prices' ? 'active' : ''} onClick={() => setActiveTab('prices')}>
            <FiDollarSign size={20} /> Qiymətlər
          </li>
          <li className={activeTab === 'advantages' ? 'active' : ''} onClick={() => setActiveTab('advantages')}>
            <FiGrid size={20} /> Üstünlüklər
          </li>
          <li className={activeTab === 'testimonials' ? 'active' : ''} onClick={() => setActiveTab('testimonials')}>
            <FiStar size={20} /> Rəylər
          </li>
          <li className={activeTab === 'faqs' ? 'active' : ''} onClick={() => setActiveTab('faqs')}>
            <FiHelpCircle size={20} /> Suallar (FAQ)
          </li>
          <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>
            <FiGrid size={20} /> Əlaqə və Sosial Media
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            <FiLogOut size={20} /> Çıxış
          </button>
        </div>
      </aside>
      <main className="admin-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
