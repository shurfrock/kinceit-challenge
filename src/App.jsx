import { useEffect, useState } from 'react'
import './App.css'
import { getAllCharacters } from './api'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function App() {
  // characters state to store request response
  const [characters, setCharacters] = useState([])
  // store user search query
  const [searchValue, setSearchValue] = useState(null)

  // do characters fetch here
  useEffect(() => {
    // make async function that fetches characters and store them in state
    const fetchCharacters = async () => {
      const characters = await getAllCharacters()
      setCharacters(characters.results)
    }

    fetchCharacters().catch(error => console.error(error))
  }, [])

  // filter characters using search query
  const filteredCharacters = searchValue
    ? characters.filter(character => character.name.toLowerCase().includes(searchValue.toLowerCase()))
    : characters 

  return (
    <div>
      <Card sx={{ minWidth: 800 }}>
        <CardContent>   
        <Stack spacing={2} sx={{ width: 300 }}>
          <TextField
            label="Busqueda de Personaje"
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
        </Stack>
          
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold'}}> Nombre </TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}> Estado </TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}> Especie </TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}> Género </TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}> Origen </TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}> Imagen </TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}> Link </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCharacters.map(character => (
                <TableRow key={character.id} sx={{ '&:hover': {
                  background: "#a1a1a1",
               }}}>
                  
                  <TableCell>
                    {character.name}
                  </TableCell>
                  <TableCell>
                    {character.status}
                  </TableCell>
                  <TableCell>
                    {character.species}
                  </TableCell>
                  <TableCell>
                    {character.gender}
                  </TableCell>
                  <TableCell>
                    {character.origin.name}
                  </TableCell>
                  <TableCell>
                      <img src={character.image}  style={{ width: '100px', height: '100px' }}/>
                  </TableCell>
                  <TableCell>
                    <a href={character.image} target='_blank'>{character.episode}</a> 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </CardContent>
      </Card>

    </div>
  )
}

export default App
