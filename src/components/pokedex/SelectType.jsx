import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'

const SelectType = ({ typeSelect, setTypeSelect, setPokeSearch }) => {
    const [listTypes, setListTypes] = useState(null)

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/type/`
        axios.get(URL)
            .then(res => setListTypes(res.data.results))
            .catch(err => console.log(err))
    }, [])

    const handleChange = e => {
        setTypeSelect(e.target.value)
        setPokeSearch('')
    }

    return (
        <SelectedContainer>
            <SelectTypeContainer value={typeSelect} onChange={handleChange}>
                <OptionStyles value="All">All Pokemons</OptionStyles>
                {
                    listTypes?.map(item => (
                        <OptionStyles key={item.url} value={item.name}>{item.name}</OptionStyles>
                    ))
                }
            </SelectTypeContainer>
        </SelectedContainer>

    )
}

const SelectedContainer = styled.div`
    width: 150px;
`
const SelectTypeContainer = styled.select`
    width: 100%;
    height: 40px;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    background: transparent;

    &:focus{
        outline: none;
    }
`

const OptionStyles = styled.option`
    font-size: 1rem;
    background: rgba(181, 51, 28, .6);

    &::first-letter{
        text-transform: uppercase;
    }
`

export default SelectType