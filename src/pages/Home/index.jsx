import React, { useState, useEffect } from 'react';
import './style.css';
import { Card } from '../../components/Card';

export function Home() {
  const [clientName, setClientName] = useState('valor inicia do useState');
  // clientName = nome do estado, SetClientName = função que atualiza o estado
  const [namesOnList,setNamesOnList] = useState([])
  const [user, setUser] = useState({ name:'', avatar: '' })

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

  useEffect(() => {
    // corpo do useEffect, ações para ser executada, use effect é executado automaticamente junto a renderização da interface
    // useEffect nao pode ser assincrono

    // ----------------------------------------------
    // forma de fazer assincrona:
      // async function fetchData() {
      //   const response = await fetch('https://api.github.com/users/VitielloL')
      //   const data = await response.json
      //   setUser({
      //     name: data.name,
      //     avatar: data.avatar_url
      //   })
      // }
      // fetchData()
    // -----------------------------------------------
    
    // fetch utilizado para requisições http
    fetch('https://api.github.com/users/VitielloL')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      })
      .catch(error => console.log(error))
  }, [])


  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil"/>
        </div>
      </header>

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
        namesOnList.map(nameOnList => (
          <Card
            // importante a utilização de uma chave unica geralmente é o id porém nao o caso
            key={nameOnList.time} 
            name={nameOnList.name} 
            time={nameOnList.time}
          />
        ))
      }
    </div>
  )
}

