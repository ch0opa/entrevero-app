import React from 'react';
import './GuestCard.css'; // O CSS deste card também vai mudar

function GuestCard({ guest }) {
  // Função para capitalizar a primeira letra (ex: "egresso" -> "Egresso")
  const capitalize = (s) => {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  
  // Lógica pedida por você:
  const statusText = capitalize(guest.status); // "Egresso", "Convidado", "Estudante"
  const confirmationText = guest.paid === 'sim' ? 'Confirmado' : 'Não confirmado';

  return (
    <div className="guest-card">
      {/* Usamos a URL do formulário, ou uma padrão se não houver */}
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