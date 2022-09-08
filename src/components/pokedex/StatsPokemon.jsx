import React from 'react'
import styled from 'styled-components'

const StatsPokemon = ({infoStat, color}) => {
    return (
        <LiContainer>
            <H4styles color={color}>{infoStat.stat.name}</H4styles>
            <H5styles color={color}>{infoStat['base_stat']}</H5styles>
        </LiContainer>
    )
}

const LiContainer = styled.li`
    font-size: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
`

const H4styles = styled.h4`
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
const H5styles = styled.h5`
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
export default StatsPokemon