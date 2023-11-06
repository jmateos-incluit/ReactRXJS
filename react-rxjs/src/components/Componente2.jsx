import { subjectManagerSerices } from '../services/subject-manager.service'

function Componente2() {
  const handleClick = () => {
    subjectManagerSerices.setSubject('Hola Mundo')
  }

  return (
    <>
      <button onClick={handleClick}>Enviar Reactividad</button>
    </>
  )
}

export default Componente2
