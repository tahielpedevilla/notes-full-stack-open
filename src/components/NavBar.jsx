import React from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/button';
import {useColorMode} from '@chakra-ui/react'


const NavBar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Box>
      <Flex p={4} justify="flex-end">
        <IconButton m={2} boxShadow="lg" icon={colorMode === "light" ? <MoonIcon/> : <SunIcon/>} onClick={toggleColorMode} />
      </Flex>
    </Box>
  )
}

export default NavBar;
