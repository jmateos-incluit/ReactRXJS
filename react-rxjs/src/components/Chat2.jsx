import { useState } from 'react'

function Chat2() {
  const [message, setMessage] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (message && message !== '') {
      await fetch(
        'http://localhost:5155/api/Message/?destino=chat1&message=' + message
      )
      setMessage('')
    }
  }

  const handleChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <input
        type="text"
        id="message"
        value={message}
        onChange={handleChangeMessage}
      />
      <br />
      <button>Enviar Mensaje</button>
    </form>
  )
}

export default Chat2
