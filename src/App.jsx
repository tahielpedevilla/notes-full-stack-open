import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Heading, List, Stack, StackDivider } from '@chakra-ui/layout'
import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import NavBar from './components/NavBar'

const App = (props) => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  
  useEffect(hook, [])
  
  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(), 
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
      console.log(response.data)
    })

      setNotes(notes.concat(noteObject))
      setNewNote('')
      console.log(noteObject.id)
    }

    const handleNoteChange = (event) => {
    /*console.log(event.target.value)*/
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }
  
  const buttonBg = showAll === true ? "red" : "blue"
  
  
  return (
    <>
      <Box justifyContent="center">
      <NavBar />
      <Stack m={16} boxShadow="2xl" p={12} borderRadius={10}>
        <Heading>Notes</Heading>
        <Stack>
        <Button m={3} colorScheme={buttonBg} onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All' } </Button>
        </Stack>
        <List spacing={3}>
          {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
        </List>
        <FormControl as="form" onSubmit={addNote}>
          <FormLabel>Escribe una nota</FormLabel>
          <Input type="text" value={newNote} onChange={handleNoteChange} />
          <Stack direction="row" justifyContent="center" spacing={4} mt={4}>
            <Button type="submit" size="lg" colorScheme="teal">Add</Button>
          </Stack>
        </FormControl>
      </Stack>
      </Box>
    </>
  )
}

export default App
