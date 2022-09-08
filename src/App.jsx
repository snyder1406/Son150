import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Home from './components/Home'
import Pokedex from './components/Pokedex'
import PokemonDetails from './components/PokemonDetails'
import PokemonEncounters from './components/PokemonEncounters'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <AppContainer>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:name" element={<PokemonDetails />} />
          <Route path="/pokedex/:name/encounters" element={<PokemonEncounters />} />
        </Route>

      </Routes>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default App
