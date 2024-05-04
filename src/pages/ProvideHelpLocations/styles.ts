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
    justify-content: space-around;
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

export const Title = styled.p`
  text-align: center;
  color: ${theme.colors.black};
`

export const LocationsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  padding: 10px;
  `

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  gap: 30px;
  padding: 10px;

  h3,
  h4 {
    text-align: center;
  }

  p {
    text-align: center;
    color: ${theme.colors.red};
    font-weight: ${theme.fontWeight.bold};
  }

  button {
    padding: 5px 20px;
    background: black;
    color: white;
    border-radius: 20px;
    font-size: ${theme.fontSize.xl};
  }
`
