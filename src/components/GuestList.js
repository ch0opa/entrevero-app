import React from 'react';
import GuestCard from './GuestCard';
import './GuestList.css'; // Importando o CSS para esta lista

function GuestList({ guests }) {
  return (
    <div className="guest-list-container">
      {guests.length === 0 ? (
        <p className="empty-list-message">Nenhum convidado cadastrado ainda.</p>
      ) : (
        <div className="guest-cards-grid">
          {/* Aqui fazemos um "map" para criar um Card para cada item da lista */}
          {guests.map(guest => (
            <GuestCard key={guest.id} guest={guest} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GuestList;