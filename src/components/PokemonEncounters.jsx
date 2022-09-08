import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import AreaLocationCard from './pokedex/AreaLocationCard'

const PokemonEncounters = () => {
  const [locations, setLocations] = useState(null)
  const { name } = useParams()

  useEffect(() => {
    const URL1 = `https://pokeapi.co/api/v2/pokemon/${name}/encounters`
    axios.get(URL1)
      .then(res => {
        setLocations(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <LocationSectionContainer>
      <h1>{name} encounters</h1>
      <CardContainer>
        {
          locations?.map(item => (
            <AreaLocationCard key={item.location_area.url} url={item.location_area.url} />
          ))
        }
      </CardContainer>
    </LocationSectionContainer>
  )
}

const LocationSectionContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  margin: 60px 0;

  &>h1{
    margin-top: 15px;
    font-size: 2.4rem;
    &::first-letter{
      text-transform: uppercase;
    }
  }

  @media (max-width: 768px){
    &>h1{
      font-size: 1.5rem;
    }
  }
`

const CardContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`

export default PokemonEncounters