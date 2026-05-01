import React from 'react';
import './CustomModal.scss';

const CustomModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>Ləğv et</button>
          <button type="button" className="btn-confirm" onClick={onConfirm}>Bəli, Sil</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
