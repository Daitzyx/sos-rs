import styled from 'styled-components'


export const Container = styled.header`
  height: min-content;
  display: flex;  
  justify-content: flex-start;
  align-items: center;

  padding: 25px;
  gap: 5px;
`

export const Title = styled.h1`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  
  font-size: 2rem;

  span {
    font-size: 2rem;
    display: inline-block;
    color: #e31e24;
  }
`
