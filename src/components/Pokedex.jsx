import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PokemonCard from './pokedex/PokemonCard'
import Pikachu2 from './../assets/Pikachu_2.gif'
import { useSelector } from 'react-redux'
import SearchInput from './pokedex/SearchInput'
import SelectType from './pokedex/SelectType'
import Pagination from './extras/Pagination'
import LimitOfPokemons from './extras/LimitOfPokemons'

const Pokedex = () => {

    const [pokemons, setPokemons] = useState(null)
    const [pokeSearch, setPokeSearch] = useState(null)
    const [typeSelect, setTypeSelect] = useState('All')
    const [indexOfFirstPokemon, setIndexOfFirstPokemon] = useState(0)
    const [limitPokemons, setLimitPokemons] = useState(10)

    const nameTrainer = useSelector(state => state.nameTrainer)

    useEffect(() => {
        if (typeSelect !== 'All') {
            const URL = `https://pokeapi.co/api/v2/type/${typeSelect}/`
            axios.get(URL)
                .then(res => {
                    const arr = res.data.pokemon.map(e => e.pokemon)
                    setPokemons({ results: arr });
                })
                .catch(err => console.log(err))
        } else if (pokeSearch) {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}/`
            const obj = {
                results: [
                    {
                        url
                    }
                ]
            }
            setPokemons(obj)
        } else {
            const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${indexOfFirstPokemon}&limit=${limitPokemons}`
            axios.get(URL)
                .then(res => setPokemons(res.data))
                .catch((err) => console.log(err))
        }
    }, [pokeSearch, typeSelect, indexOfFirstPokemon, limitPokemons])


    const paginate = (pageNumber) => {
        const indexOfLastPokemon = pageNumber * limitPokemons
        setIndexOfFirstPokemon(indexOfLastPokemon - limitPokemons)
    }

    return (
        <PokedexContainer>
            <HeaderSection>
                <TitleStyles><span>Poké</span>dex</TitleStyles>
                <img src={Pikachu2} alt="" />
            </HeaderSection>
            <h2>Welcome {nameTrainer}, here you can find your favorite pokemon</h2>
            <SearchBar>
                <SelectType typeSelect={typeSelect} setTypeSelect={setTypeSelect} setPokeSearch={setPokeSearch} />
                <SearchInput setPokeSearch={setPokeSearch} setTypeSelect={setTypeSelect} />
                <LimitOfPokemons setLimitPokemons={setLimitPokemons} />
            </SearchBar>
            <PokemonsContainer>
                {
                    pokemons?.results.map(item => (
                        <PokemonCard key={item.url} url={item.url} />
                    ))
                }
            </PokemonsContainer>
            <Pagination pokemonsPerPage={limitPokemons} totalPokemons={pokemons?.count} paginate={paginate} />
        </PokedexContainer>
    )
}
const PokedexContainer = styled.section`
    max-width: 1200px;
    width: 100%;

    &>h2{
        margin: 30px 0;
        font-size: 1rem;
        font-style: bold;
        font-weight: 500;
    }
`

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    flex-wrap: wrap;
`

const PokemonsContainer = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px auto;
`

const HeaderSection = styled.header`
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    &>img{
        width: 150px;
    }
`

const TitleStyles = styled.h1`
    font-size: 3rem;
    color: #DFE1E1;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
    border: 3px solid black;
    border-radius: 30px;
    background-color: #B5331C;
    text-align: center;
    
    &>span{
        color: #B5331C;
        background-color: #DFE1E1;
        border-radius: 27px;
    }
    
    @media (max-width: 768px){
        border-radius: 20px;
        font-size: 2.3rem;
        &>span{
            border-radius: 17px;
        }
    }
`
export default Pokedex