import React from 'react';

function LocationForm({ locationData, onCepChange, onLocationDataChange }) {
  
  const isCepValid = locationData.cep.length === 0 || locationData.cep.length === 8;

  return (
    <div className="location-form-container">
      <h3>Localização:</h3>
      <div className="form-group">
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          value={locationData.cep}
          onChange={onCepChange}
          maxLength="8"
          placeholder="Ex: 95500000"
          className={!isCepValid ? 'invalid-input' : ''}
        />
        {!isCepValid && <span className="error-message">CEP deve ter 8 dígitos.</span>}
      </div>
      <div className="form-group">
        <label htmlFor="cidade">CIDADE:</label>
        <input
          type="text"
          id="cidade"
          value={locationData.cidade}
          onChange={(e) => onLocationDataChange('cidade', e.target.value)}
          
        />
      </div>
      <div className="form-group">
        <label htmlFor="bairro">BAIRRO:</label>
        <input
          type="text"
          id="bairro"
          value={locationData.bairro}
          onChange={(e) => onLocationDataChange('bairro', e.target.value)}
          
        />
      </div>
      <div className="form-group">
        <label htmlFor="avRua">AV/RUA:</label>
        <input
          type="text"
          id="avRua"
          value={locationData.avRua}
          onChange={(e) => onLocationDataChange('avRua', e.target.value)}
          
        />
      </div>
    </div>
  );
}

export default LocationForm;