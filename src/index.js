import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }
})

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)