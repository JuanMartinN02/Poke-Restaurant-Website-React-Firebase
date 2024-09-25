import React from 'react';
import '../assets/styles/Change_Pass.css';

const Change_Pass = ({ show, handleClose, children, operation }) => {
  return (
    <div className={`popup ${show ? 'show' : ''}`} onClick={handleClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h4 className="popup-title">{operation}</h4>
        </div>
        <div className="popup-body">
          {children}
        </div>
        <div className="popup-footer">
          <button onClick={handleClose} className="popup-close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Change_Pass;


