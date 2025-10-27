import React, { useState, useRef } from 'react'; 

function ContactForm({ onAddGuest }) {
  
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: '',
    paid: '',   
    imageUrl: ''
  });
  
  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (!file) {
      setFormData(prev => ({ ...prev, imageUrl: '' }));
      return;
    }

   
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem.');
      if(fileInputRef.current) fileInputRef.current.value = null;
      return;
    }

    
    const reader = new FileReader();
    reader.onloadend = () => {
    
      setFormData(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

 
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório.";
    if (!formData.status) newErrors.status = "Status é obrigatório.";
    if (!formData.paid) newErrors.paid = "Campo 'Pago' é obrigatório.";
    
    
    if (!formData.imageUrl) {
      newErrors.imageUrl = "A foto é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddGuest(formData); 

      
      setFormData({
        name: '',
        phone: '',
        status: '',
        paid: '',
        imageUrl: ''
      });
      setErrors({});

      
      if(fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      alert("Convidado adicionado com sucesso!");
    } else {
      alert("Por favor, corrija os erros no formulário.");
    }
  };

  return (
    <div className="contact-form-container">
      <h3>Cadastro de Convidado</h3>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'invalid-input' : ''} />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? 'invalid-input' : ''} />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Status:</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="status" value="convidado" checked={formData.status === "convidado"} onChange={handleChange} /> Convidado
            </label>
            <label>
              <input type="radio" name="status" value="egresso" checked={formData.status === "egresso"} onChange={handleChange} /> Egresso
            </label>
            <label>
              <input type="radio" name="status" value="estudante" checked={formData.status === "estudante"} onChange={handleChange} /> Estudante
            </label>
          </div>
          {errors.status && <span className="error-message">{errors.status}</span>}
        </div>

        <div className="form-group">
          <label>Pago:</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="paid" value="sim" checked={formData.paid === "sim"} onChange={handleChange} /> Sim
            </label>
            <label>
              <input type="radio" name="paid" value="nao" checked={formData.paid === "nao"} onChange={handleChange} /> Não
            </label>
          </div>
          {errors.paid && <span className="error-message">{errors.paid}</span>}
        </div>
        

        <div className="form-group">
          <label htmlFor="imageUrl">Foto:</label>
          <input
            type="file" 
            id="imageUrl"
            name="imageUrl"
            accept="image/*" 
            onChange={handleFileChange} 
            ref={fileInputRef} 
            className={errors.imageUrl ? 'invalid-input' : ''}
          />
          {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
        </div>

        <button type="submit" className="submit-button">Cadastrar</button>
      </form>
    </div>
  );
}

export default ContactForm;