import { useEffect, useState } from 'react'
import './App.css'
import { getAllCharacters } from './api'

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await getAllCharacters()
      setCharacters(characters.results)
    }

    fetchCharacters().catch(error => console.error(error))
  }, [])

  return (
    <div>
      {characters.map(character => (
        <div key={character.id}>{character.name}</div>
      ))}


    </div>
  )
}

export default App
