import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    padding: 5rem;
    align-self: center;
  }
`
export const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`
export const Info = styled.p`
  text-align: justify;
  font-style: italic;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.black50Light};

  line-height: 1.3;
`

