import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from "./services/api";
import './styles.css';

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState({});

  async function handleSubmit() {
    if(input === ''){
      alert('Digite um CEP');
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert("Erro ao buscar o cep!!");
      setInput("");
    }
  }

  return (
    <div className="App">
      <h1 className="title">Buscador de CEP</h1>
      <div className='input'>
        <input 
          type="text" 
          placeholder="Digite seu CEP" 
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={handleSubmit}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>
      
      {Object.keys(cep).length > 0 && (
        <main className="content">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;