import React from 'react'
import styled from 'styled-components'

const SearchInput = ({ setPokeSearch, setTypeSelect }) => {

    const handleSubmit = e => {
        e.preventDefault()
        setPokeSearch(e.target.search.value.trim().toLowerCase())
        e.target.search.value = ''
        setTypeSelect('All')
    }
    
    return (
        <FormContainer onSubmit={handleSubmit}>
            <input id='search' type="text" />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </FormContainer>
    )
}

const FormContainer = styled.form`
    display: flex;
    align-items: center;

    &>input{
        width: 250px;
        height: 39px;
        border: none;
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        border-left:  2px solid black;
        text-align: center;
        box-shadow: 5px 3px 6px 0 rgba(0, 0, 0, .6);
    }

    &>button {
        background-color:  rgba(181, 51, 28, 1);
        color: rgba(223, 225, 225);
        font-size: 1.2rem;
        padding: 5px 10px;
        border-radius: 0 6px 6px 0 ;
        border: none;
        border-top: 2px solid black;
        border-right: 2px solid black;
        border-bottom: 2px solid black;
        box-shadow: 5px 3px 6px 0 rgba(0, 0, 0, .6);
        transition: all .3s ease;

        &:hover {
            transform: scale(1.2);
            background-color:  rgba(223, 225, 225, 1);
            color: rgba(181, 51, 28, 1);
            transition: all .3s ease;
        }
    }
`

export default SearchInput