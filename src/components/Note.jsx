import React from 'react';
import { ListIcon, ListItem } from '@chakra-ui/layout';
import { MdCheckCircle } from 'react-icons/md';
import { Button } from '@chakra-ui/button';
import { StackDivider } from '@chakra-ui/react';

const Note = ({note, toggleImportance}) => {  
  const label = note.important
  ? 'make not important' : 'make important'

const colorButton = label === 'make important' ? "whatsapp" : "red";

  return (
    <>
    <ListItem divider={<StackDivider borderColor="gray.200" />}>
      <ListIcon as={MdCheckCircle} color="green.500" />
        {note.content}
    </ListItem>
    <Button size="sm" colorScheme={colorButton} onClick={toggleImportance}>{label}</Button>
    </>
  )
}

export default Note