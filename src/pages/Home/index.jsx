import React, { useState } from 'react';
import './style.css';
import { Card } from '../../components/Card';

export function Home() {
  const [clientName, setClientName] = useState('valor inicia do useState');
  // clientName = nome do estado, SetClientName = função que atualiza o estado
  const [namesOnList,setNamesOnList] = useState([])

  // toda vez que handleAddNameOnList for chamada, irá criar um novo objeto com 2 propriedades, 
  // o nome que é pego do estado que armazena o conteudo atual do input e o time que pega do horario atual
  // depois que monta o objeto adiciona ele no estado setNameOnList
  function handleAddNameOnList(){
    const newNameOnList = {
      name: clientName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    // prevState para recuperar o estado anterior, precisa ser passado com o operador spread para que ele recebe o anterior 
    setNamesOnList(prevState => [...prevState, newNameOnList]);
  }

  return (
    <div className="container">
      <h1>Lista de presença</h1>
      <h5>Esta sendo digitado: {clientName}</h5>
      <input 
        type="text" 
        placeholder="Digite um nome"
        // pega o valor digitado no input
        onChange={e => setClientName(e.target.value)}
      />
      <button type="button" onClick={handleAddNameOnList}>
        Adicionar
      </button>

      {
        // passa um map no vetor buscando as propriedades solicitadas
        namesOnList.map(nameOnList => <Card name={nameOnList.name} time={nameOnList.time}/>)
      }
    </div>
  )
}

