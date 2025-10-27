import React from 'react';
import GuestCard from './GuestCard';
import './GuestList.css'; 

function GuestList({ guests }) {
  return (
    <div className="guest-list-container">
      {guests.length === 0 ? (
        <p className="empty-list-message">Nenhum convidado cadastrado ainda.</p>
      ) : (
        <div className="guest-cards-grid">
          
          {guests.map(guest => (
            <GuestCard key={guest.id} guest={guest} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GuestList;