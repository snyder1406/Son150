import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slice/nameTrainer.slice'

import PikachuGif from './../assets/Pikachu.gif'
import Pokeball from './../assets/Pokeball.gif'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const inputValue = e.target.name.value.trim()

        if (inputValue.length !== 0) {
            dispatch(setNameTrainer(inputValue))
            navigate('/pokedex')
        } else {
            alert('Para acceder a la pokedex debes ingresar tu nombre')
        }

        e.target.name.value = ''
    }

    return (
        <HomeContainer>
            <h1><span>Poké</span>dex</h1>
            <FirstSection>
                <h1>Hello Trainer!!!</h1>
                <img src={PikachuGif} alt="" />
            </FirstSection>
            <SecondSection>
                <h2>Give me your name to start</h2>
                <FormInput onSubmit={handleSubmit}>
                    <InputContainer id='name' type="text" />
                    <ButtonContainer>
                        <img src={Pokeball} alt="" />
                        <h2><span>G</span>o</h2>
                    </ButtonContainer>
                </FormInput>
            </SecondSection>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #F8F8F8;

    &>h1{
        font-size: 4rem;
        color: #DFE1E1;
        margin-top: 120px;
        margin-bottom: 60px;
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
            font-size: 3.3rem;
        }
    }
`

const FirstSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    &>img{
        width: 300px;
    }

    &>h1{
        font-size: 1.8rem;
    }
    @media (max-width: 768px){
        flex-direction: column;
        &>h1{
            font-size: 1.5rem;
        }
        &>img{
            width: 150px;
        }
    }
`

const SecondSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 60px 0;

    @media (max-width: 768px){
        font-size: .6rem;
    }
`

const FormInput = styled.form`
    margin-top: 15px;
    display: flex;
    align-items: center;
`

const InputContainer = styled.input`
    background: rgba(0, 0, 0, .1);
    border: 1px solid white;
    border-radius: 15px;
    width: 215px;
    height: 30px;
    text-align: center;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, .1);
`

const ButtonContainer = styled.button`
    position: relative;
    width: 45px;
    height: 45px;
    background: transparent;
    border: none;

    &>img{
        width: 40px;
        position: absolute;
        top: 0;
        left: 0;
    }

    &:hover img{
        opacity: 0;
        transition: all .3s ease;
    }

    &>h2{
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid red;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        border-radius: 50%;
        opacity: 0;

        &>span{
            color: red;
        }
    }
    
    &:hover h2{
        opacity: 1;
        transition: all .3s ease;
    }
`
export default Home