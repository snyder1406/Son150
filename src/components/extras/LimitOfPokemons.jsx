import React from 'react'
import styled from 'styled-components'

const LimitOfPokemons = ({ setLimitPokemons }) => {

    const handleChange = e => {
        setLimitPokemons(e.target.value)
    }
    
    return (
        <SelectedContainer>
            <SelectedLimit onChange={handleChange}>
                <OptionStyles value="5">5</OptionStyles>
                <OptionStyles value="10" selected>10</OptionStyles>
                <OptionStyles value="20">20</OptionStyles>
                <OptionStyles value="30">30</OptionStyles>
            </SelectedLimit>
        </SelectedContainer>
    )
}

const SelectedContainer = styled.div`
    width: 60px;
`

const SelectedLimit = styled.select`
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
`
export default LimitOfPokemons