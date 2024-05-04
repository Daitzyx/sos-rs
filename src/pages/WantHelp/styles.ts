import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    width: 80%;
    align-self: center;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 20px 0;
  }

  @media (min-width: 768px) {
    main {
      width: 50%;
      align-self: center;

      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
`

export const Title = styled.h2`
  text-align: center;
  color: ${theme.colors.red};
`

export const Description = styled.p`
  text-align: center;
  color: ${theme.colors.black}; 
`

export const OBS = styled.p`  
  text-align: center;
  font-style: italic;
  color: ${theme.colors.red};
  font-weight: ${theme.fontWeight.bold}; 
  font-size: 14px;
`


export const Info = styled.p`
  padding: 10px;
  text-align: center;
  color: ${theme.colors.green800};
`

export const Form = styled.form`
  width: 100%;

  textarea {
    width: 100%;
    max-height: 260px;
    padding: 8px;

    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;

    border: 1px solid ${theme.colors.gray};
    border-radius: 12px;
    resize: vertical;
    margin-bottom: 10px;
  }
`
