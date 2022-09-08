import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styled, { keyframes, css } from 'styled-components'

const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState(null)
    const [color, setColor] = useState(null)
    const { name } = useParams()

    const navigate = useNavigate()
    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`
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

    const handleClick = () => {
        navigate(`/pokedex/${pokemon.name}/encounters`)
    }

    const typesOfPokemons = pokemon?.types.map(item => (item.type.name))
    const abilitiesOfPokemons = pokemon?.abilities.map(item => (item.ability.name))
    const MovesPokemons = pokemon?.moves.map(item => (item.move.name))
    const StatsPokemon = pokemon?.stats

    return (
        <PokemonDetailsContainer color={color}>
            <MainSection>
                <HeaderCard>
                    <ImageDiv>
                        <DivColorGradient color={color}></DivColorGradient>
                        <img src={pokemon?.sprites.other['official-artwork']["front_default"]} alt='Pokemon not yet caught on camera' />
                    </ImageDiv>
                    <SizeContainer>
                        <SizeInformation>
                            <H2styles color={color}>Weight</H2styles>
                            <H3styles color={color}>{pokemon?.weight}</H3styles>
                        </SizeInformation>
                        <SizeInformation>
                            <H2styles color={color}>Height</H2styles>
                            <H3styles color={color}>{pokemon?.height}</H3styles>
                        </SizeInformation>
                    </SizeContainer>
                    <h1>{pokemon?.name}</h1>
                    <h2>#{pokemon?.id}</h2>
                </HeaderCard>
                <TypeInformation>
                    <TypeDiv>
                        <h1>Type</h1>
                        <TypeContainer>
                            {
                                typesOfPokemons?.map(item => (
                                    <TypeDivItem key={item} color={item}>
                                        <h2>{item}</h2>
                                    </TypeDivItem>
                                ))
                            }
                        </TypeContainer>
                    </TypeDiv>
                    <AbilitiesDiv>
                        <h1>Abilities</h1>
                        <AbilitiesContainer>
                            {
                                abilitiesOfPokemons?.map(item => (
                                    <div key={item}>
                                        <AbilitiesH2>{item}</AbilitiesH2>
                                    </div>
                                ))
                            }
                        </AbilitiesContainer>
                    </AbilitiesDiv>
                </TypeInformation>
                <StatsInformation>
                    <h2>Pokémon Stats</h2>
                    {
                        StatsPokemon?.map(stat => (
                            <StatDetail key={stat.stat.name}>
                                <h2>{stat.stat.name}</h2>
                                <Progresbar AnimationProgres>
                                    <ContainerProgres size={stat.base_stat}>{stat.base_stat}/150</ContainerProgres>
                                    <ContainerProgresAnimated size={stat.base_stat}></ContainerProgresAnimated>
                                </Progresbar>
                            </StatDetail>
                        ))
                    }
                </StatsInformation>
            </MainSection>
            <AsideSection>
                <button onClick={handleClick}>Go to locations</button>
                <MovementsSection>
                    <h2>Movements</h2>
                    <MovementsContainer>
                        {
                            MovesPokemons?.map(movement => (
                                <MovementDetails key={movement}>
                                    <p>{movement}</p>
                                </MovementDetails>
                            ))
                        }
                    </MovementsContainer>
                </MovementsSection>
            </AsideSection>

        </PokemonDetailsContainer>
    )
}
const PokemonDetailsContainer = styled.section`
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: center;

    background: ${props =>
        props.color === 'black' ? 'linear-gradient(180deg, rgba(75, 83, 89, 1), white 75%)' :
            props.color === 'blue' ? 'linear-gradient(180deg, rgba(114, 149, 194, 1), white 75%)' :
                props.color === 'brown' ? 'linear-gradient(180deg, rgba(180, 144, 87, 1), white 75%)' :
                    props.color === 'gray' ? 'linear-gradient(180deg, rgba(201, 201, 201, 1), white 75%)' :
                        props.color === 'green' ? 'linear-gradient(180deg, rgba(148, 202, 173, 1), white 75%)' :
                            props.color === 'pink' ? 'linear-gradient(180deg, rgba(252, 216, 214, 1), white 75%)' :
                                props.color === 'purple' ? 'linear-gradient(180deg, rgba(141, 119, 177, 1), white 75%)' :
                                    props.color === 'red' ? 'linear-gradient(180deg, rgba(222, 125, 109, 1), white 75%)' :
                                        props.color === 'yellow' ? 'linear-gradient(180deg, rgba(235, 205, 91, 1), white 75%)' :
                                            'linear-gradient(180deg, rgba(182, 190, 210, 1), white 75%)'
    };

    @media (max-width: 768px){
        flex-direction: column;
    }
`

const shimmer = keyframes`
    to{
        background-position: -100% 0;
    }
`

const MainSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const HeaderCard = styled.header`
    border: 1px solid blue;
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 500px;
    padding-bottom: 15px;
    border-radius: 0 0 30px 30px;
    box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, .6);

    &>h1{
        font-size: 1.5rem;
        font-weight: 700;
        font-style: oblique;
        &::first-letter{
            text-transform: uppercase;
        }
    }

    &>h2{
        font-size: 1rem;
        width: 50px;
        height: 30px;
        color: rgba(0, 0, 0, .6);
        text-align: center;
        line-height: 200%;
        border: 1px solid rgba(0, 0, 0, .3);
        border-radius: 5px;
    }
    
    @media (max-width: 768px){
        width: 350px;
    }
`

const ImageDiv = styled.div`
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
    position: relative;
    border-bottom: solid rgba(201, 201, 201, 1);
    border-bottom-width: medium;

    &>img{
        width: 400px;
        position: absolute;
    }

    @media (max-width: 768px){
        width: 350px;
        height: 350px;
        
        &>img{
            width: 300px;
        }
    }
`

const DivColorGradient = styled.div`
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

const SizeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin-top: 15px;
`

const SizeInformation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const H2styles = styled.h2`
    font-size: 1.2rem;

    color:${props =>
        props.color === 'black' ? 'rgba(0, 0, 0, .9)' :
            props.color === 'blue' ? 'rgba(0, 0, 255, .9)' :
                props.color === 'brown' ? 'rgba(165, 42, 42, .9)' :
                    props.color === 'gray' ? 'rgba(119, 136, 153, .9)' :
                        props.color === 'green' ? 'rgba(0, 128, 0, .9)' :
                            props.color === 'pink' ? 'rgba(255, 20, 147, .9)' :
                                props.color === 'purple' ? 'rgba(128, 0, 128, .9)' :
                                    props.color === 'red' ? 'rgba(255, 0, 0, .9)' :
                                        props.color === 'yellow' ? 'rgba(255, 223, 0, .9)' :
                                            'rgba(0, 0, 0, .6)'};
    
`

const H3styles = styled.h3`
    font-size: 1rem;

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
                                            'rgba(0, 0, 0, .4)'};
`

const TypeInformation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;

    @media (max-width: 768px){
        gap: 15px;
        flex-direction: column;
    }
`

const TypeDiv = styled.div`
    border: 1.5px solid rgba(201, 201, 201, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(237, 238, 238, 1);
    border-radius: 5px;
    width: 300px;
    height: 175px;

    &>h1{
        font-size: 1.5rem;
        font-weight: bold;
        text-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
        margin: 5px 0 24px 0;
    }
`

const TypeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
`

const TypeDivItem = styled.div`
    border: 1px solid rgba(201, 201, 201, 1);
    padding: 15px;
    border-radius: 5px;

    background: ${props =>
        props.color === 'normal' ? 'rgb(192, 192, 192)' :
            props.color === 'fighting' ? 'rgb(174, 158, 141)' :
                props.color === 'flying' ? 'rgb(181, 189, 208)' :
                    props.color === 'poison' ? 'rgb(91, 45, 134)' :
                        props.color === 'ground' ? 'rgb(115, 78, 36)' :
                            props.color === 'rock' ? 'rgb(149, 161, 169)' :
                                props.color === 'bug' ? 'rgb(112, 197, 235)' :
                                    props.color === 'ghost' ? 'rgb(54, 89, 115)' :
                                        props.color === 'steel' ? 'rgb(199, 209, 235)' :
                                            props.color === 'fire' ? 'rgb(227, 119, 64)' :
                                                props.color === 'water' ? 'rgb(128, 207, 234)' :
                                                    props.color === 'grass' ? 'rgb(72, 208, 176)' :
                                                        props.color === 'electric' ? 'rgb(246, 232, 148)' :
                                                            props.color === 'psychic' ? 'rgb(146, 115, 143)' :
                                                                props.color === 'ice' ? 'rgb(238, 244, 247)' :
                                                                    props.color === 'dragon' ? 'rgb(199, 108, 115)' :
                                                                        props.color === 'dark' ? 'rgb(85, 92, 104)' :
                                                                            props.color === 'fairy' ? 'rgb(181, 102, 114)' :
                                                                                props.color === 'unknown' ? 'rgb(153, 153, 153)' :
                                                                                    'rgb(153, 153, 153)'
    };

    &>h2{
        color: rgba(0, 0, 0, 1);
        font-size: 1rem;
        font-weight: 100;

        &::first-letter{
            text-transform: uppercase;
        }
    }
`

const AbilitiesDiv = styled.div`
    border: 1.5px solid rgba(201, 201, 201, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(237, 238, 238, 1);
    border-radius: 5px;
    width: 300px;
    padding-bottom: 15px;

    &>h1{
        font-size: 1.5rem;
        font-weight: bold;
        text-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
        margin: 5px 0 24px 0;
    }
`

const AbilitiesContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin: 0 auto;

    &>div{
        border: 1px solid rgba(201, 201, 201, 1);
        padding: 15px;
        border-radius: 5px;
    }
`

const AbilitiesH2 = styled.h2`
    font-size: 1rem;
    font-weight: 100;

    &::first-letter{
        text-transform: uppercase;
    }
`

const StatsInformation = styled.div`
    border: 1px solid #D2D4D3;
    border-radius: 5px;
    width: 80%;
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    background: rgba(237, 238, 238);
    padding-bottom: 15px;

    &>h2{
        font-size: 1.5rem;
        margin: 15px 0;
        width: 90%;
        text-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
    }
`

const StatDetail = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

    &>h2{
        width: 60px;
        padding: 6px 3px 6px 0;
        font-size: .7rem;
        border: none;
        background: rgba(201, 201, 201, 1);
        border-radius: 5px;
        text-align: right;
        color: rgba(0, 0, 0, .6);

        &::first-letter{
            text-transform: uppercase;
        }    
    }
`

const Progresbar = styled.div`
    margin-left: 5px;
    width: 250px;
    height: 25px;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, .1);
    border-radius: 5px;
    position: relative;
`

const AnimationProgres = css`
    position: absolute;
    opacity: .3;
    background-image: linear-gradient(90deg, rgba(204, 204, 204, 1), rgba(229, 229, 229, .9) 40%, rgba(204, 204, 204, 1) 80px);
    background-size: 200%;
    background-position: 100% 0;
    border-radius: inherit;
    animation: ${shimmer} 2.5s infinite;
`

const ContainerProgres = styled.p`
    font-size: .7rem;
    text-align: center;
    line-height: 200%;
    text-align: right;
    line-height: 225%;
    height: 100%;
    width: calc((${(props) => props.size}% * 100) / 150);

    background-color: ${(props) =>
        props.size >= 0 && props.size <= 50 ? 'rgba(104, 107, 225, 1)' :
            props.size >= 50 && props.size <= 100 ? 'rgba(107, 225, 104, 1)' :
                'rgba(225, 117, 104)'

    };

    border-radius: 5px 9px 9px 5px;
    color: #5B2D86;
    padding-right: 3px;
`

const ContainerProgresAnimated = styled(ContainerProgres)`
    ${AnimationProgres};
`

const AsideSection = styled.div`
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;

    &>button{
        color: rgba(181, 51, 28, 1);
        background: rgba(223, 225, 225, 1);
        margin: 15px 0;
        border: 1px solid rgba(181, 51, 28, 1);
        border-radius: 5px;
        padding: 9px;
        cursor: pointer;
    }
`

const MovementsSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    
    &>h2{
        font-size: 1.5rem;
        text-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
        margin: 15px 0;
    }

`
const MovementsContainer = styled.section`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
`

const MovementDetails = styled.div`
    border: 1px solid rgba(208, 209, 209, 1);
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(237, 238, 238, 1);
    border-radius: 5px;

    &>p{
        font-size: 1rem;
        font-weight: 600;
        &::first-letter{
            text-transform: uppercase;
        }
    }
`
export default PokemonDetails