import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const AreaLocationCard = ({ url }) => {
    const [location, setLocation] = useState(null)

    useEffect(() => {
        axios.get(url)
            .then(res => setLocation(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <LocationContainer>
            <label>Location: </label>
            <h2>{location?.location.name}</h2>
        </LocationContainer>
    )
}

const LocationContainer = styled.div`
    border: 1px solid rgba(0, 0, 0, .3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 275px;
    padding: 15px 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .1);

    &>label {
        font-size: 1rem;
        font-weight: bold;
        color: rgba(0, 0, 0, .3);
    }

    &>h2{
        font-size: 1rem;
        color: rgba(0, 0, 0, .6);
        
        &::first-letter{
            text-transform: uppercase;
        }
    }

`

export default AreaLocationCard