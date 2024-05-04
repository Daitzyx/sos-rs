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

export const Title = styled.h2`
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
`
