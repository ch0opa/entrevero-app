import React from 'react';
import './GuestCard.css'; 

function GuestCard({ guest }) {
  
  const capitalize = (s) => {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  
  
  const statusText = capitalize(guest.status); 
  const confirmationText = guest.paid === 'sim' ? 'Confirmado' : 'Não confirmado';

  return (
    <div className="guest-card">
      
      <img 
        src={guest.imageUrl || 'https://i.pravatar.cc/150'} 
        alt={guest.name} 
        className="guest-image" 
      />
      
      
      <p className="guest-name">{guest.name}</p>
      <p className="guest-status">{statusText}</p>
      <p className="guest-confirmation">{confirmationText}</p>
    </div>
  );
}

export default GuestCard;