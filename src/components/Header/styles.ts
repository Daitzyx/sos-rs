import styled from 'styled-components'

export const Container = styled.header`
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem;
`

export const Title = styled.h1`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  margin-top: 15px;
  font-size: 2.2rem;

  span {
    font-size: 2.7rem;
    display: inline-block;
    color: #e31e24;
  }
`
