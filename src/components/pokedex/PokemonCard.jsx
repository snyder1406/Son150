import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import StatsPokemon from './StatsPokemon';

import Pokeball from './../../assets/Pokeball.gif'

const PokemonCard = ({ url }) => {
    const [pokemon, setPokemon] = useState(null)
    const [color, setColor] = useState(null)

    const id = url.split('/');
    
    const navigate = useNavigate()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id[id.length - 2]}`
        axios.get(URL)
            .then(res => {
                setPokemon(res.data)
                getColorPokemon(res.data.species.url)
            })
            .catch(err => console.log(err))
    }, [])

    const getColorPokemon = (UrlColor) => {
        axios.get(UrlColor)
            .then(res => setColor(res.data.color.name))
            .catch(err => console.log(err))
    }

    const handleClick =()=>{
        navigate(`/pokedex/${pokemon.name}`)
    }

    return (
        <CardContainer color={color} onClick={handleClick}>
            <HeaderCard>
                <DivColorGradient color={color}></DivColorGradient>
                <img src={pokemon?.sprites.other['official-artwork']["front_default"]} alt='Pokemon not yet caught on camera' />
            </HeaderCard>
            <SectionContainer>
                <NamePokemon color={color}>{pokemon?.name}</NamePokemon>
                <UlStyle items={pokemon?.types.length === 2 ? true : false}>
                    {
                        pokemon?.types.map(item => (
                            <LiStyles color={color} key={item.type.url}>{item.type.name}</LiStyles>
                        ))
                    }
                </UlStyle>
            </SectionContainer>
            <FooterContainer>
                <ul>
                    {
                        pokemon?.stats.map(stat => (
                            <StatsPokemon key={stat.stat.url} infoStat={stat} color={color} />
                        ))
                    }
                </ul>
            </FooterContainer>
        </CardContainer>
    )
}

const CardContainer = styled.article`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 3px solid red;
    width: 290px;
    border-radius: 36px;
    transition: all .5s ease;
    cursor: pointer;
    
    border-color:${props =>
        props.color === 'black' ? 'rgba(0, 0, 0, .9)' :
            props.color === 'blue' ? 'rgba(0, 0, 255, .9)' :
                props.color === 'brown' ? 'rgba(165, 42, 42, .9)' :
                    props.color === 'gray' ? 'rgba(119, 136, 153, .9)' :
                        props.color === 'green' ? 'rgba(0, 128, 0, .9)' :
                            props.color === 'pink' ? 'rgba(255, 20, 147, .9)' :
                                props.color === 'purple' ? 'rgba(128, 0, 128, .9)' :
                                    props.color === 'red' ? 'rgba(255, 0, 0, .9)' :
                                        props.color === 'yellow' ? 'rgba(255, 223, 0, .9)' :
                                            'rgba(223, 225, 225, .9)'};


    &:hover{
        transform: translate(-10px, -10px);
        transition: all .5s ease;
        
        box-shadow:${props =>
        props.color === 'black' ? '9px 9px 12px 0px rgba(0, 0, 0, .6)' :
            props.color === 'blue' ? '9px 9px 12px 0px rgba(0, 0, 255, .6)' :
                props.color === 'brown' ? '9px 9px 12px 0px rgba(165, 42, 42, .6)' :
                    props.color === 'gray' ? '9px 9px 12px 0px rgba(119, 136, 153, .6)' :
                        props.color === 'green' ? '9px 9px 12px 0px rgba(0, 128, 0, .6)' :
                            props.color === 'pink' ? '9px 9px 12px 0px rgba(255, 20, 147, .6)' :
                                props.color === 'purple' ? '9px 9px 12px 0px rgba(128, 0, 128, .6)' :
                                    props.color === 'red' ? '9px 9px 12px 0px rgba(255, 0, 0, .6)' :
                                        props.color === 'yellow' ? '9px 9px 12px 0px rgba(255, 223, 0, .6)' :
                                            '9px 9px 12px 0px rgba(0, 0, 0, .3)'};
    }
`

const HeaderCard = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 300px;
    position: relative;

    &>img{
        width: 200px;
        position: absolute;
    }
`

const DivColorGradient = styled.div`
    border-radius: 30px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;

    background: ${props =>
        props.color === 'black' ? 'linear-gradient(180deg, black, white 75%)' :
            props.color === 'blue' ? 'linear-gradient(180deg, blue, white 75%)' :
                props.color === 'brown' ? 'linear-gradient(180deg, brown, white 75%)' :
                    props.color === 'gray' ? 'linear-gradient(180deg, gray, white 75%)' :
                        props.color === 'green' ? 'linear-gradient(180deg, green, white 75%)' :
                            props.color === 'pink' ? 'linear-gradient(180deg, pink, white 75%)' :
                                props.color === 'purple' ? 'linear-gradient(180deg, purple, white 75%)' :
                                    props.color === 'red' ? 'linear-gradient(180deg, red, white 75%)' :
                                        props.color === 'yellow' ? 'linear-gradient(180deg, yellow, white 75%)' :
                                            'linear-gradient(180deg, #DFE1E1, white 75%)'
    };
`


const SectionContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const UlStyle = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    font-size: .9rem;

    ${props => props.items ? `
        &>li:first-child::after {
            content: ' / ';
        }
    `: ``}
`
const LiStyles = styled.li`
    font-weight: 600;
    font-style: bold;

    &::first-letter{
        text-transform: uppercase;
    }
    
    color:${props =>
        props.color === 'black' ? 'rgba(0, 0, 0, .6)' :
            props.color === 'blue' ? 'rgba(0, 0, 255, .6)' :
                props.color === 'brown' ? 'rgba(165, 42, 42, .6)' :
                    props.color === 'gray' ? 'rgba(119, 136, 153, .6)' :
                        props.color === 'green' ? 'rgba(0, 128, 0, .6)' :
                            props.color === 'pink' ? 'rgba(255, 20, 147, .6)' :
                                props.color === 'purple' ? 'rgba(128, 0, 128, .6)' :
                                    props.color === 'red' ? 'rgba(255, 0, 0, .6)' :
                                        props.color === 'yellow' ? 'rgba(255, 223, 0, .6)' :
                                            'rgba(223, 225, 225, .6)'};
`

const NamePokemon = styled.h3`
    font-size: 1.5rem;

    color:${props =>
        props.color === 'black' ? 'black' :
            props.color === 'blue' ? 'blue' :
                props.color === 'brown' ? 'brown' :
                    props.color === 'gray' ? 'gray' :
                        props.color === 'green' ? 'green' :
                            props.color === 'pink' ? 'pink' :
                                props.color === 'purple' ? 'purple' :
                                    props.color === 'red' ? 'red' :
                                        props.color === 'yellow' ? '#ffdf00' :
                                            '#DFE1E1'};
    
    &::first-letter{
        text-transform: uppercase;
    }
`

const FooterContainer = styled.footer`
    width: 80%;
    margin: 15px 0;
    border-top: 1px solid #DFE1E1;

    &>ul{
        border-top: 1px solid #DFE1E1;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, auto));
        justify-content: center;
    }
`

export default PokemonCard