import React, { useState } from 'react';
import './style.css';
import { Card } from '../../components/Card';

export function Home() {
  const [clientName, setClientName] = useState('valor inicia do useState');
  
  return (
    <div className="container">
      <h1>Lista de presença</h1>
      <h5>Esta sendo digitado: {clientName}</h5>
      <input 
        type="text" 
        placeholder="Digite um nome"
        onChange={e => setClientName(e.target.value)}
      />
      <button type="button">Adicionar</button>

      <Card name="Lucas" time="18:05"/>
      <Card name="Julia" time="15:35"/>

    </div>
  )
}

