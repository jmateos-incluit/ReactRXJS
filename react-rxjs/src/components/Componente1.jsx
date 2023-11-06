import { useEffect, useState } from 'react'
import { subjectManagerSerices } from '../services/subject-manager.service'

function Componente1() {
  const [mensaje, setMensaje] = useState('')
  const subscription$ = subjectManagerSerices.getSubject()

  useEffect(() => {
    subscription$.subscribe((value) => {
      setMensaje(value)
    })
  })

  return <div>Mensaje: {mensaje}</div>
}

export default Componente1
