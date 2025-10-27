import React, { useState, useEffect } from 'react';
import './App.css';
import LocationForm from './components/LocationForm';
import GuestList from './components/GuestList';
import ContactForm from './components/ContactForm';
import axios from 'axios';


const GUESTS_STORAGE_KEY = 'entrevero-app-guests';

function App() {

  
  const [locationData, setLocationData] = useState({
    cep: '95560000',
    cidade: 'Torres',
    bairro: 'Parque do Balonismo',
    avRua: 'R. Universitária, 1900',
  });
  


  
  const [guests, setGuests] = useState(() => {
    const savedGuests = localStorage.getItem(GUESTS_STORAGE_KEY);
    if (savedGuests) {
      return JSON.parse(savedGuests);
    } else {
      return [];
    }
  }); 
  
  const [pageTitle, setPageTitle] = useState("Seja bem vindo, (props.name)");

  
  useEffect(() => {
    localStorage.setItem(GUESTS_STORAGE_KEY, JSON.stringify(guests));
  }, [guests]); 

  
  useEffect(() => {
    const userName = "Usuário";
    setPageTitle(`Seja bem vindo, ${userName}`);
  }, []);

  
  
  const fetchLocationData = async (cep) => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        if (!data.erro) {
          setLocationData({
            cep: cep,
            cidade: data.localidade,
            bairro: data.bairro,
            avRua: data.logradouro,
          });
        } else {
          alert("CEP não encontrado.");
          setLocationData(prev => ({ ...prev, cidade: '', bairro: '', avRua: '' }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        alert("Erro ao buscar dados do CEP.");
      }
    }
  };

  
  const handleAddGuest = (newGuestData) => {
    setGuests(prevGuests => {
      const newGuest = {
        ...newGuestData, 
        id: prevGuests.length ? Math.max(...prevGuests.map(g => g.id)) + 1 : 1,
      };
      const updatedGuests = [...prevGuests, newGuest];
      return updatedGuests.sort((a, b) => a.name.localeCompare(b.name));
    });
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <span role="img" aria-label="logo">🏠</span>
        </div>
        <h1>{pageTitle}</h1>
      </header>

      <main className="App-main">
        <section className="main-content">
          <div className="location-section">
            <LocationForm
              locationData={locationData}
              onCepChange={(e) => {
                const cep = e.target.value.replace(/\D/g, '');
                setLocationData(prev => ({ ...prev, cep }));
                if (cep.length === 8) fetchLocationData(cep);
              }}
              onLocationDataChange={(field, value) => {
                setLocationData(prev => ({ ...prev, [field]: value }));
              }}
            />
          </div>

          <div className="guest-section">
            <GuestList guests={guests} />
          </div>

          <div className="contact-section">
            <ContactForm onAddGuest={handleAddGuest} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;