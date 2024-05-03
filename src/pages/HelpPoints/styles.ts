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
    gap: 2rem;
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
  color: ${theme.colors.black};
`

export const Description = styled.p`
  text-align: center;
  color: ${theme.colors.black};
  line-height: 1.5;
`

export const Info = styled.p`
  padding: 10px;
  text-align: center;
  color: ${theme.colors.green800};
`

export const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
    max-height: 260px;
    padding: 13px;

    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;

    border: 1px solid ${theme.colors.gray};
    border-radius: 12px;
    resize: vertical;
    margin-bottom: 15px;
  }
`

