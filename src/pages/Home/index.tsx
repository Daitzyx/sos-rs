import { ButtonsContainer, Container } from './styles'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'

export const Home = () => {
  return (
    <Container>
      <Header />

      <main>
        <ButtonsContainer>
          <Button color="red">PRECISO DE AJUDA</Button>
          <Button color="yellow">QUERO AJUDAR</Button>
        </ButtonsContainer>
      </main>
    </Container>
  )
}
