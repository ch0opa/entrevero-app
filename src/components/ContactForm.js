import React, { useState, useRef } from 'react'; // 1. Importamos o 'useRef'

function ContactForm({ onAddGuest }) {
  // 2. Criamos uma 'ref' para o input de arquivo
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: '', // 'egresso', 'convidado' ou 'estudante'
    paid: '',   // 'sim' ou 'nao'
    imageUrl: '' // Vai guardar o texto Base64 da imagem
  });
  
  const [errors, setErrors] = useState({});

  // Esta função continua igual, para os inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- MUDANÇA 3: Nova função para lidar com o UPLOAD ---
  // Esta função é chamada QUANDO o usuário seleciona um arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Pega o arquivo
    if (!file) {
      setFormData(prev => ({ ...prev, imageUrl: '' }));
      return;
    }

    // Checa se é uma imagem
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem.');
      if(fileInputRef.current) fileInputRef.current.value = null; // Limpa o input
      return;
    }

    // Converte o arquivo de imagem para um texto Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      // Quando a conversão termina, salva o texto no estado
      setFormData(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // --- MUDANÇA 4: Validação atualizada ---
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório.";
    if (!formData.status) newErrors.status = "Status é obrigatório.";
    if (!formData.paid) newErrors.paid = "Campo 'Pago' é obrigatório.";
    
    // Agora só checa se o campo imageUrl está preenchido (com o texto Base64)
    if (!formData.imageUrl) {
      newErrors.imageUrl = "A foto é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- MUDANÇA 5: Limpar o input de arquivo ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddGuest(formData); 

      // Limpa o formulário
      setFormData({
        name: '',
        phone: '',
        status: '',
        paid: '',
        imageUrl: ''
      });
      setErrors({});

      // Limpa o campo de "Escolher arquivo" visualmente
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
        
        {/* ... Os campos Nome, Telefone, Status e Pago continuam iguais ... */}
        
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
        
        {/* --- MUDANÇA 6: O HTML do Input --- */}
        <div className="form-group">
          <label htmlFor="imageUrl">Foto:</label>
          <input
            type="file" // 1. Mudou de 'text' para 'file'
            id="imageUrl"
            name="imageUrl"
            accept="image/*" // 2. Filtra para aceitar só imagens
            onChange={handleFileChange} // 3. Usa a nova função
            ref={fileInputRef} // 4. Conecta a 'ref'
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