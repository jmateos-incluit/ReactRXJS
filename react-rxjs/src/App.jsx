import { useState, useEffect } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr'
import Componente1 from './components/Componente1'
import Componente2 from './components/Componente2'
import './App.css'
import Chat1 from './components/Chat1'
import Chat2 from './components/Chat2'
import { useRef } from 'react'

function App() {
  const [conn, setConn] = useState(null)
  const [mensajeChat1, setMensajeChat1] = useState([])
  const [mensajeChat2, setMensajeChat2] = useState([])

  const chat1Actualizado = useRef(null)
  const chat2Actualizado = useRef(null)
  chat1Actualizado.current = mensajeChat1
  chat2Actualizado.current = mensajeChat2

  useEffect(() => {
    const newConn = new HubConnectionBuilder()
      .withUrl('http://localhost:5155/mesage')
      .withAutomaticReconnect()
      .build()

    setConn(newConn)
  }, [])

  useEffect(() => {
    if (conn) {
      conn
        .start()
        .then(() => {
          console.log('Conectados')
          conn.on('chat2', (value) => {
            const newChat2 = [...chat2Actualizado.current]
            newChat2.push(value)
            setMensajeChat2(newChat2)
          })
          conn.on('chat1', (value) => {
            const newChat1 = [...chat1Actualizado.current]
            newChat1.push(value)
            setMensajeChat1(newChat1)
          })
        })
        .catch((e) => console.error('Conexion fallida: ', e))
    }
  }, [conn])

  return (
    <>
      <hr />
      <h3>RxJS en React</h3>
      <Componente1 />
      <Componente2 />
      <hr />
      <h3>Chat 1</h3>
      <Chat1 />
      {mensajeChat1.map((m) => (
        <p>{m}</p>
      ))}
      <hr />
      <h3>Chat 2</h3>
      <Chat2 />
      {mensajeChat2.map((m) => (
        <p>{m}</p>
      ))}
      <hr />
    </>
  )
}

export default App
