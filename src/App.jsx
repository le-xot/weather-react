import React, { useState, useEffect, useRef } from 'react'
import {
  Center,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Progress,
  Heading
} from '@chakra-ui/react'

export const App = () => {
  const [weather, setWeather] = useState()
  const [{ lat, lon }, setCoords] = useState({
    lat: 0,
    long: 0
  })

  useEffect(() => {
    getCurrentPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (lat && lon) {
      getWeatherByCoords()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon])

  const inputRef = useRef()


  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoords({
        lat: coords.latitude,
        lon: coords.longitude
      })
    })
  }

  const getWeatherByCoords = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric&lat=${lat}&lon=${lon}`
    )

    const data = await response.json()
    setWeather(data)
    console.log(lat, lon);
  }

  const getWeatherByName = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current?.value}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    )

    const data = await response.json()

    if (data.code === '404') {
      alert(data.message)
    } else {
      setWeather(data)
    }
  }

  if (!weather) {
    return (
      <Flex justify="center" align="center" h="full" >
        <Progress pos="absolute" w="full" top={0} size="xs" isIndeterminate />
        <Heading>Loading...</Heading>
      </Flex>
    )
  }

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <Center w={"80%"}>
      <Flex justify="center" align="center" h="full" >
        <Box

          borderRadius={'20px'}
          backgroundColor='#333333'
          margin={'10px'}
          paddingLeft={'100px'}
          paddingRight={'100px'}
          paddingBottom={'50px'}
          paddingTop={'50px'}>

          <Heading > {weather.name}</Heading>
          <Heading>{Math.round(weather.main.temp)}°</Heading>
          <InputGroup
            marginTop={'40px'}>
            <Input
              placeholder={weather.name}
              ref={inputRef}
              onKeyDown={event => { if (event.key === 'Enter') { getWeatherByName() } }}
            >
            </Input>
            <InputRightElement>
              <Button onClick={getWeatherByName}>Set</Button>
            </InputRightElement>
          </InputGroup>

        </Box>
      </Flex >
    </Center>
  )
}