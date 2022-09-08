import React from 'react'
import styled from 'styled-components'

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {

        pageNumbers.push(i)
    }

    return (
        <NavPagination>
            <ul>
                {
                    pageNumbers?.map(number => ((
                        <li key={number}>
                            <OptionPagination href="!#" onClick={(e) => {
                                e.preventDefault()
                                paginate(number)
                            }}>{number}</OptionPagination>
                        </li>
                    )))
                }
            </ul>
        </NavPagination>
    )
}

const NavPagination = styled.nav`
    &>ul{
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
        margin: 30px auto;
        list-style: none;
    }
`

const OptionPagination = styled.a`
    display: block;
    width: 30px;
    height: 30px;
    text-decoration: none;
    border: 1px solid rgba(181, 51, 28, 1);
    text-align: center;
    font-size: .9rem;
    font-style: bold;
    font-weight: 600;
    background-color: rgba(223, 225, 225, 1);
    line-height: 200%;
    border-radius: 6px;
    color: rgba(181, 51, 28, 1);
    cursor: pointer;

    &:hover,
    &:focus{
        color: rgba(223, 225, 225, 1);
        background-color: rgba(181, 51, 28, 1);
        border: 1px solid rgba(223, 225, 225, 1);
    }
`

export default Pagination