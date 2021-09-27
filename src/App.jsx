import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Grid,
  Flex,
  Progress,
  Heading
} from '@chakra-ui/react'

export const App = () => {
  const [weather, setWeather] = useState()
  const [{ lat, long }, setCoords] = useState({
    lat: 0,
    long: 0
  })

  useEffect(() => {
    getCurrentPosition()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (lat && long) {
      getWeatherByCoords()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long])

  const inputRef = useRef()


  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      //console.log('getCurrentPosition', coords)

      setCoords({
        lat: coords.latitude,
        long: coords.longitude
      })
    })
  }

  const getWeatherByCoords = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER_KEY}&lang=en&units=metric&lat=${lat}&lon=${long}`
    )

    const data = await response.json()
    //console.log('getWeatherByCoords', data)
    setWeather(data)
  }

  if (!weather) {
    return (
      <Flex justify="center" align="center" h="full" >
        <Progress pos="absolute" w="full" top={0} size="xs" isIndeterminate />
        <Heading>Loading...</Heading>
      </Flex>
    )
  }

  const getWeatherByName = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
      .then(result =>{
        setWeather(result)
      })
    console.log(result);
  
  }


  return (
    <Flex
      h="full"
      align="center"
      justify="center"
    >
      <Heading
      >
        The temperature in {weather.name} is {weather.main.temp} degrees
        <InputGroup
          width={"500px"}>
          <Input
            placeholder={weather.name}
            ref={inputRef}
          >
          </Input>
          <InputRightElement>
            <Button
              onClick={getWeatherByName}
            >
              Set
            </Button>
          </InputRightElement>
        </InputGroup>
      </Heading>
      <Heading>

      </Heading>
    </Flex >
  )
}